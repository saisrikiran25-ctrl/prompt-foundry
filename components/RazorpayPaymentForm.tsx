
import React, { useState, useEffect } from 'react';
import { CreditCard, Loader, CheckCircle, ShieldCheck, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { db } from '../services/database';
import { useNavigate } from 'react-router-dom';

// Razorpay Configuration - User needs to provide these values
// NOTE: Only the Key ID is used in frontend. Key Secret must ONLY be on backend server.
const RAZORPAY_CONFIG = {
  keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID', // Test Key ID - Replace with your actual key
};

// Declare Razorpay on window for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentStatus = 'idle' | 'processing' | 'verifying' | 'completed' | 'failed';

export const RazorpayPaymentForm: React.FC = () => {
  const { total, clearCart, items } = useCart();
  const { user, refreshUserData } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      showToast("Failed to load Razorpay SDK. Please refresh the page.", "error");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    if (!razorpayLoaded) {
      showToast("Payment gateway is loading. Please try again.", "error");
      return;
    }

    setStatus('processing');

    try {
      // PRODUCTION: Call your backend to create a Razorpay order
      // const response = await fetch('/api/create-razorpay-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: total * 100, currency: 'INR' })
      // });
      // const orderData = await response.json();

      // DEMO MODE: Simulating order creation - REPLACE WITH BACKEND CALL FOR PRODUCTION
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Using crypto for better uniqueness in order IDs
      const orderData = {
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: total * 100, // Razorpay expects amount in paise
        currency: 'INR',
      };

      const options = {
        key: RAZORPAY_CONFIG.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'PromptFoundry',
        description: 'Premium AI Prompts Purchase',
        order_id: orderData.id,
        handler: async (response: any) => {
          await handlePaymentSuccess(response);
        },
        prefill: {
          name: user.displayName,
          email: user.email,
        },
        theme: {
          color: '#38bdf8', // Accent color from your design
        },
        modal: {
          ondismiss: () => {
            setStatus('idle');
            showToast("Payment cancelled", "error");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Razorpay Error", error);
      setStatus('failed');
      showToast("Failed to initiate payment. Please try again.", "error");
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    setStatus('verifying');
    
    try {
      // PRODUCTION: Verify payment signature on your backend - CRITICAL FOR SECURITY
      // This prevents payment tampering and ensures genuineness
      // const verification = await fetch('/api/verify-razorpay-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     razorpay_order_id: response.razorpay_order_id,
      //     razorpay_payment_id: response.razorpay_payment_id,
      //     razorpay_signature: response.razorpay_signature,
      //   })
      // });
      // if (!verification.ok) throw new Error('Payment verification failed');

      // DEMO MODE: Simulating verification delay - REPLACE WITH BACKEND VERIFICATION FOR PRODUCTION
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (user) {
        // Record Order in Database
        await db.orders.create(user.uid, items, total);
        await refreshUserData();
        clearCart();
        setStatus('completed');
        showToast("Payment Successful!", "success");
        
        // Redirect after showing success screen
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error("Payment verification error", error);
      setStatus('failed');
      showToast("Payment verification failed. Please contact support.", "error");
    }
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
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-4">
          <div className="flex items-center justify-between mb-4">
            <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">Payment Gateway</label>
            <div className="flex gap-2 text-textSecondary">
              <ShieldCheck size={14} className="text-green-500" />
              <span className="text-[10px] font-mono text-green-500">RAZORPAY SECURE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors cursor-pointer">
            <div className="h-10 w-14 bg-white/90 rounded flex items-center justify-center p-1">
              <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <rect x="0" y="0" width="200" height="60" fill="#0C2451"/>
                <text x="100" y="38" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Razorpay</text>
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-white">Razorpay Checkout</div>
              <div className="text-xs text-textSecondary">UPI, Cards, Netbanking & More</div>
            </div>
            <div className="ml-auto">
              <CreditCard size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <button 
          onClick={initiatePayment}
          disabled={status === 'processing' || status === 'verifying' || !razorpayLoaded}
          className="w-full rounded-lg bg-accent py-4 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {status === 'processing' || status === 'verifying' ? (
            <>
              <Loader size={18} className="animate-spin" /> 
              {status === 'processing' ? 'Opening Razorpay...' : 'Verifying Payment...'}
            </>
          ) : (
            <>
              Pay ₹{total.toLocaleString('en-IN')} <CreditCard size={18} />
            </>
          )}
        </button>
        
        <div className="flex items-center justify-center gap-2 text-[10px] text-textSecondary">
          <ShieldCheck size={12} />
          <span>Secure payments powered by Razorpay</span>
        </div>
      </div>
    </div>
  );
};
