
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Download, Box, Clock, Search, ExternalLink, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { user, orders } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Derive purchased products from orders for display
  const purchasedProductIds = new Set(user.purchasedPrompts);
  const myPrompts = PRODUCTS.filter(p => purchasedProductIds.has(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
        <img src={user.avatar} alt={user.displayName} className="w-16 h-16 rounded-full border-2 border-accent" />
        <div>
            <h1 className="text-2xl font-display font-bold text-white">Welcome, {user.displayName}</h1>
            <p className="text-textSecondary">Manage your prompts and order history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Library */}
        <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Box size={20} className="text-accent" /> My Prompt Library
            </h2>
            
            {myPrompts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {myPrompts.map(product => (
                        <div key={product.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl border border-white/10 bg-secondary/40 hover:bg-secondary/60 transition-colors">
                            <div className="shrink-0">
                                <img src={product.image} className="w-24 h-24 rounded-lg object-cover bg-primary" alt={product.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-white truncate">{product.name}</h3>
                                        <p className="text-sm text-textSecondary">{product.category} • {product.productType}</p>
                                    </div>
                                    <Link to={`/product/${product.id}`} className="text-xs text-accent hover:underline flex items-center gap-1">
                                        View Details <ExternalLink size={10} />
                                    </Link>
                                </div>
                                
                                <div className="mt-4">
                                    <div className="text-xs font-bold text-textSecondary uppercase tracking-wider mb-2">Available Downloads</div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {product.downloadResources?.map((resource, i) => (
                                            <a 
                                                key={i}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 p-2 rounded bg-primary/50 border border-white/5 hover:border-accent/30 hover:bg-primary transition-all group"
                                            >
                                                <div className="p-1.5 rounded bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary transition-colors">
                                                    <Download size={14} />
                                                </div>
                                                <span className="text-sm text-white truncate group-hover:text-accent transition-colors">{resource.name}</span>
                                            </a>
                                        )) || (
                                            <div className="text-sm text-textSecondary italic">No resources available. Contact support.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-8 rounded-xl border border-dashed border-white/10 bg-secondary/20 text-center">
                    <p className="text-textSecondary mb-4">You haven't purchased any prompts yet.</p>
                    <Link to="/catalog" className="text-accent hover:underline font-bold">Browse the Marketplace</Link>
                </div>
            )}
        </div>

        {/* Right: Recent Orders */}
        <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock size={20} className="text-textSecondary" /> Order History
            </h2>
            <div className="space-y-4">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="p-4 rounded-xl border border-white/5 bg-secondary/30">
                            <div className="flex justify-between mb-2">
                                <span className="text-xs font-mono text-textSecondary uppercase">#{order.id}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div className="text-sm font-bold text-white mb-1">
                                {order.items.length} Items
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-textSecondary">{new Date(order.date).toLocaleDateString()}</span>
                                <span className="font-bold text-white">₹{order.total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-textSecondary">No orders found.</div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
