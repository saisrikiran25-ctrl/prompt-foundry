
import React from 'react';
import { Star, ShoppingCart, Zap, Cpu } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col rounded-xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] overflow-hidden h-full border border-white/5">
        {/* Hover Gradient Border Effect */}
        <div className="absolute inset-0 rounded-xl border border-white/5 group-hover:border-accent/30 transition-colors z-10 pointer-events-none" />
        
        {/* Image Section - Top, Landscape Aspect Ratio */}
        <div className="relative w-full aspect-video overflow-hidden bg-secondary border-b border-white/5 shrink-0">
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute top-2 right-2 z-20">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-1 text-xs font-medium text-accent backdrop-blur-md">
                    <Zap size={10} className="fill-accent" />
                    Instant
                </span>
            </div>
            
            {/* Quick Add Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100 z-10">
                <button
                    onClick={handleAddToCart}
                    className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>
        </div>

        {/* Content Section - Bottom */}
        <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-center justify-between">
                <span className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-textSecondary bg-white/5">
                    {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} className={product.rating > 0 ? "fill-yellow-400" : "text-textSecondary"} />
                    <span className={`text-xs font-bold ${product.rating > 0 ? "text-textPrimary" : "text-accent"}`}>
                        {product.rating > 0 ? product.rating.toFixed(1) : "New"}
                    </span>
                </div>
            </div>

            <Link to={`/product/${product.id}`} className="block mb-2">
                <h3 className="font-display text-lg font-bold leading-tight text-textPrimary transition-colors group-hover:text-accent line-clamp-1">
                    {product.name}
                </h3>
            </Link>
            
            <p className="mb-4 line-clamp-2 text-sm text-textSecondary flex-1">
                {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-textSecondary">
                   <Cpu size={14} className="text-retro" />
                   <span>{product.productType}</span>
                </div>
                <span className="font-display text-lg font-bold text-accent">
                    ₹{product.price.toLocaleString('en-IN')}
                </span>
            </div>
        </div>
    </div>
  );
};
