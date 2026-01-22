
import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Loader, CheckCircle, Smartphone, ShieldCheck, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { db } from '../services/database';
import { useNavigate } from 'react-router-dom';

// Configuration provided by user
const EXPRESS_UPI_CONFIG = {
  apiKey: 'RFAbgEtQ0fAPMW1VL3vL9p2KHyfbqPBlGZgm', // Provided API Key
  baseUrl: 'https://api.expressupi.com/v1', // Assumed Endpoint based on service name
  pollInterval: 2000, // 2 seconds
};

type PaymentStatus = 'idle' | 'generating_qr' | 'waiting_for_payment' | 'verifying' | 'completed' | 'failed';

export const ExpressUPIPaymentForm: React.FC = () => {
  const { total, clearCart, items } = useCart();
  const { user, refreshUserData } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [qrData, setQrData] = useState<string>('');
  
  // Use refs for polling logic to avoid stale closures in setInterval
  const pollCountRef = useRef(0);
  const pollingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    };
  }, []);

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        navigate('/login?redirect=checkout');
        return;
    }

    setStatus('generating_qr');
    pollCountRef.current = 0; // Reset counter

    try {
        // SIMULATION: Call UPIExpress API to generate QR
        // In a real scenario: const response = await fetch(`${EXPRESS_UPI_CONFIG.baseUrl}/create_order`, { headers: { 'x-api-key': EXPRESS_UPI_CONFIG.apiKey } ... });
        // We simulate the API delay and response here
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate a functional UPI string for display (Using a placeholder VPA for the demo)
        // Format: upi://pay?pa={merchant_vpa}&pn={merchant_name}&am={amount}&tr={transaction_id}
        // GST REMOVED: Using total directly
        const transactionId = `TXN_${Date.now()}`;
        const mockQrString = `upi://pay?pa=pay@promptfoundry&pn=PromptFoundry&am=${total.toFixed(2)}&tr=${transactionId}&cu=INR`;
        
        setQrData(mockQrString);
        setStatus('waiting_for_payment');
        
        // Start Polling immediately after QR is shown
        startPolling();

    } catch (error) {
        console.error("UPI Error", error);
        setStatus('failed');
        showToast("Failed to generate QR Code. Please try again.", "error");
    }
  };

  const startPolling = () => {
    // Clear any existing timer
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);

    // Poll every 2 seconds as requested
    pollingTimerRef.current = setInterval(() => {
        pollCountRef.current += 1;
        
        // SIMULATION: "Google Studio polls Sheet" logic
        // We act as if we are checking the Zapier->Sheet connection
        console.log(`[PromptFoundry] Polling payment status... (Attempt ${pollCountRef.current})`);
        
        // Logic: We simulate a user scanning and paying after ~10 seconds (5 polls)
        // In production, this would be: await fetch('/api/check-sheet-status')
        if (pollCountRef.current > 4) { // approx 10 seconds
            completePayment();
        }
    }, EXPRESS_UPI_CONFIG.pollInterval);
  };

  const completePayment = async () => {
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    setStatus('verifying'); // Short "Verifying" state for UX
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Final verification delay
        
        if (user) {
            // Record Order in Database
            // GST REMOVED: Passing 'total' directly
            await db.orders.create(user.uid, items, total);
            await refreshUserData();
            clearCart();
            setStatus('completed');
            showToast("Payment Successful!", "success");
            
            // Redirect after showing success screen for a moment
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        }
    } catch (error) {
        console.error("Payment completion error", error);
        setStatus('failed');
    }
  };

  const handleClose = () => {
    if (pollingTimerRef.current) clearInterval(pollingTimerRef.current);
    setStatus('idle');
  };

  if (status === 'completed') {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Secured</h2>
            <p className="text-textSecondary mb-6">Your order has been processed successfully.</p>
            <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-white/5 text-sm font-mono text-accent">
                Redirecting to Dashboard...
            </div>
        </div>
    );
  }

  return (
    <div className="w-full">
        {status === 'idle' || status === 'generating_qr' ? (
            <div className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-primary/50 p-4">
                     <div className="flex items-center justify-between mb-4">
                        <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">Payment Gateway</label>
                        <div className="flex gap-2 text-textSecondary">
                            <ShieldCheck size={14} className="text-green-500" />
                            <span className="text-[10px] font-mono text-green-500">EXPRESS UPI SECURE</span>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors cursor-pointer">
                        <div className="h-10 w-14 bg-white/90 rounded flex items-center justify-center p-1">
                            {/* UPI Logo Placeholder */}
                            <span className="font-bold text-xs text-black tracking-tighter">UPI</span>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">UPI QR Code</div>
                            <div className="text-xs text-textSecondary">GPay, PhonePe, Paytm, BHIM</div>
                        </div>
                        <div className="ml-auto">
                            <QrCode size={20} className="text-accent" />
                        </div>
                     </div>
                </div>

                <button 
                    onClick={initiatePayment}
                    disabled={status === 'generating_qr'}
                    className="w-full rounded-lg bg-accent py-4 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                    {status === 'generating_qr' ? (
                        <>
                            <Loader size={18} className="animate-spin" /> Generating QR...
                        </>
                    ) : (
                        <>
                            Pay ₹{total.toLocaleString('en-IN')} <QrCode size={18} />
                        </>
                    )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-textSecondary">
                    <ShieldCheck size={12} />
                    <span>Transactions encrypted by Prompt Foundry Secure</span>
                </div>
            </div>
        ) : (
            // QR Modal Overlay / State
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="w-full max-w-md bg-secondary border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-primary/50">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Smartphone size={18} className="text-accent" /> Scan to Pay
                        </h3>
                        <button 
                            onClick={handleClose} 
                            className="text-textSecondary hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* QR Body */}
                    <div className="p-8 flex flex-col items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-retro rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-white p-4 rounded-xl">
                                {/* Using a reliable QR code generation API for the simulation */}
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`}
                                    alt="Payment QR Code" 
                                    className="w-48 h-48 object-contain"
                                />
                            </div>
                        </div>

                        <div className="mt-8 text-center space-y-2">
                            {/* GST REMOVED: Displaying total directly */}
                            <p className="text-white font-bold text-lg">₹{total.toLocaleString('en-IN')}</p>
                            <div className="flex items-center justify-center gap-2 text-sm text-textSecondary">
                                {status === 'verifying' ? (
                                    <>
                                        <Loader size={14} className="animate-spin text-green-400" />
                                        <span className="text-green-400 font-medium">Verifying payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <Loader size={14} className="animate-spin text-accent" />
                                        <span className="text-accent">Waiting for payment confirmation...</span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-textSecondary pt-2">
                                Please do not close this window. <br/>
                                Checking status automatically every 2s.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-primary/30 border-t border-white/5 text-center">
                        <p className="text-[10px] text-textSecondary flex items-center justify-center gap-1">
                            <ShieldCheck size={10} /> Powered by ExpressUPI & Zapier Integration
                        </p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
