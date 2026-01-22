
import React, { useState } from 'react';
import { ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { db } from '../services/database';
import { useNavigate } from 'react-router-dom';

export const StripePaymentForm: React.FC = () => {
  const { total, clearCart, items } = useCart();
  const { user, refreshUserData } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
        showToast("Please login to complete purchase", "error");
        navigate('/login?redirect=checkout');
        return;
    }

    setIsProcessing(true);

    try {
      // Simulate backend payment processing latency
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create Order in DB
      await db.orders.create(user.uid, items, total * 1.18);
      
      await refreshUserData();
      clearCart();
      showToast("Purchase successful! Check email for downloads.", "success");
      navigate('/');
    } catch (err) {
      showToast("Payment processing failed. Try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-primary/50 p-4">
                 <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-bold text-textSecondary uppercase tracking-wider">Payment Method</label>
                    <div className="flex gap-2 text-textSecondary">
                        <CreditCard size={14} />
                        <span className="text-[10px] font-mono">SECURE</span>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg border border-white/5">
                    <div className="h-8 w-12 bg-white/10 rounded flex items-center justify-center text-xs font-bold text-white">Card</div>
                    <div className="text-sm text-textSecondary">
                        Ending in <span className="text-white font-mono">4242</span> (Mock)
                    </div>
                 </div>
            </div>

            <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full rounded-lg bg-accent py-3 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
                {isProcessing ? 'Processing Payment...' : `Pay ₹${(total * 1.18).toLocaleString('en-IN')}`}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-textSecondary">
                <ShieldCheck size={12} className="text-green-500" />
                <span>Payments processed securely</span>
            </div>
        </form>
    </div>
  );
};