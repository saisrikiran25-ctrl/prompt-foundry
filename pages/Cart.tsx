
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="mb-6 rounded-full bg-secondary/50 p-6 ring-1 ring-white/10">
          <ShoppingBag size={48} className="text-textSecondary" />
        </div>
        <h2 className="mb-2 text-2xl font-display font-bold text-white">Your cart is empty</h2>
        <p className="mb-8 max-w-md text-textSecondary">
          Looks like you haven't added any prompts yet. Explore our marketplace to find the perfect engineering tools.
        </p>
        <Link
          to="/catalog"
          className="rounded-lg bg-accent px-8 py-3 font-bold text-primary shadow-lg shadow-accent/20 transition-transform hover:scale-105"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-display font-bold text-white">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-6 rounded-xl border border-white/5 bg-secondary/30 p-6 backdrop-blur-sm sm:flex-row sm:items-center"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover ring-1 ring-white/10"
                />
              </Link>

              <div className="flex-1">
                <div className="flex justify-between mb-1">
                    <Link to={`/product/${item.id}`} className="font-bold text-white hover:text-accent transition-colors">
                        {item.name}
                    </Link>
                    <span className="font-bold text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-sm text-textSecondary mb-4">{item.category}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-lg bg-primary border border-white/10 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-textSecondary hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm font-medium text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-textSecondary hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-secondary/80 p-6 backdrop-blur-xl">
            <h2 className="mb-6 text-xl font-bold text-white">Order Summary</h2>
            
            <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-textSecondary">
                    <span>Subtotal</span>
                    <span className="text-white">₹{total.toLocaleString('en-IN')}</span>
                </div>
                {/* GST Removed */}
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg text-white">
                    <span>Total</span>
                    <span className="text-accent">₹{total.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <button 
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent py-4 font-bold text-primary shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            
            <p className="mt-4 text-center text-xs text-textSecondary">
                Secure UPI payment. Delivered in 2-3 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
