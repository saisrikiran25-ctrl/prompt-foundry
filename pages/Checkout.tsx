
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { InstantPaymentForm } from '../components/InstantPaymentForm';

export const Checkout: React.FC = () => {
  const { items, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // If empty cart, redirect
  if (items.length === 0) {
      return <Navigate to="/cart" replace />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-display font-bold text-white mb-8 text-center">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Details */}
            <div className="space-y-6">
                 {/* User check */}
                 <div className="rounded-xl border border-white/10 bg-secondary/50 p-6">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                        <UserIcon size={18} className="text-accent" /> Account
                    </h3>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <img src={user.avatar} className="w-10 h-10 rounded-full" alt="User" />
                            <div>
                                <p className="text-sm font-bold text-white">{user.displayName}</p>
                                <p className="text-xs text-textSecondary">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-textSecondary">
                            <p className="mb-2">You are checking out as a guest.</p>
                            <button onClick={() => navigate('/login?redirect=checkout')} className="text-accent hover:underline">Log in to save your order</button>
                        </div>
                    )}
                 </div>

                 {/* Instant Payment Options */}
                 <div className="rounded-xl border border-white/10 bg-secondary/50 p-6">
                    <InstantPaymentForm />
                 </div>
            </div>

            {/* Summary */}
            <div>
                <div className="rounded-xl border border-white/10 bg-secondary/80 p-6 backdrop-blur-xl sticky top-24">
                    <h3 className="font-bold text-white mb-4">Order Summary</h3>
                    <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-textSecondary truncate max-w-[200px]">{item.quantity}x {item.name}</span>
                                <span className="text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                        <div className="flex justify-between text-sm text-textSecondary">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        {/* GST Removed */}
                        <div className="flex justify-between font-bold text-lg text-white pt-2">
                            <span>Total</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
