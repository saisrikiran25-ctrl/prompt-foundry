
import React, { useState } from 'react';
import { CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { db } from '../services/database';
import { useNavigate } from 'react-router-dom';

// UPI Payment Configuration
const UPI_QR_IMAGE = 'https://pitchdeckstorage1234.blob.core.windows.net/pay/1000042265.png';

type PaymentStatus = 'idle' | 'processing' | 'completed';

export const UPIPaymentForm: React.FC = () => {
  const { total, clearCart, items } = useCart();
  const { user, refreshUserData } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<PaymentStatus>('idle');

  const handlePayClick = async () => {
    if (!user) {
      navigate('/login?redirect=checkout');
      return;
    }

    setStatus('processing');

    try {
      // Record order in database as pending
      await db.orders.create(user.uid, items, total);
      await refreshUserData();
      clearCart();
      
      // Redirect to UPI payment QR code
      window.open(UPI_QR_IMAGE, '_blank');
      
      setStatus('completed');
      showToast("Payment window opened! Products will be delivered in 2-3 hours after payment.", "success");
      
      // Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error("Order creation error", error);
      setStatus('idle');
      showToast("Failed to process. Please try again.", "error");
    }
  };

  if (status === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Order Placed!</h2>
        <p className="text-textSecondary mb-4 max-w-md">
          Complete the payment using the UPI QR code. Your products will be delivered to your email and dashboard within 2-3 hours after payment is received.
        </p>
        <div className="px-4 py-2 bg-secondary/50 rounded-lg border border-white/5 text-sm font-mono text-accent">
          Redirecting to Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-primary/50 p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-4">UPI Payment</h3>
          <p className="text-sm text-textSecondary mb-6">
            Click below to view the UPI QR code and complete your payment
          </p>
          
          <div className="bg-secondary/50 rounded-lg border border-white/5 p-6 mb-6">
            <p className="text-white font-bold text-3xl mb-2">₹{total.toLocaleString('en-IN')}</p>
            <p className="text-xs text-textSecondary">Total Amount</p>
          </div>

          <button 
            onClick={handlePayClick}
            disabled={status === 'processing'}
            className="w-full rounded-lg bg-accent py-4 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {status === 'processing' ? (
              <>
                <Loader size={18} className="animate-spin" /> Processing...
              </>
            ) : (
              <>
                Pay ₹{total.toLocaleString('en-IN')} via UPI
              </>
            )}
          </button>
          
          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-white font-medium mb-2">📦 Delivery Information</p>
            <p className="text-xs text-textSecondary">
              Products will be delivered to your email and My Library dashboard within 2-3 hours after payment is received.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
