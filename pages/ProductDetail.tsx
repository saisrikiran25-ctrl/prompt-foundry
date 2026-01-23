
import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Star, CheckCircle, Shield, ShoppingCart, Award, Cpu, FileText, Download, HelpCircle, Zap, Send, MessageSquare } from 'lucide-react';
import { PRODUCTS, REVIEWS as INITIAL_REVIEWS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Review } from '../types';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'faq'>('specs');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Review State
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [authorName, setAuthorName] = useState(user?.displayName || '');

  if (!product) {
    return <div className="text-center py-20 text-white">Product not found</div>;
  }

  // Dynamic Rating Calculation
  const newReviewsSum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const totalReviewCount = product.reviewCount + reviews.length;
  const currentRating = totalReviewCount === 0 
    ? 0 
    : ((product.rating * product.reviewCount) + newReviewsSum) / totalReviewCount;
  
  const displayRating = currentRating > 0 ? currentRating.toFixed(1) : "New";

  const handleAddToCart = () => {
    if (!user) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        return;
    }
    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!user) {
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        return;
    }
    addToCart(product);
    navigate('/checkout');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || !authorName.trim()) return;

    const newReview: Review = {
        id: Date.now().toString(),
        author: authorName,
        rating: rating,
        text: reviewText,
        date: 'Just now',
        verifiedPurchase: true // Simulating verified purchase for demo
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    if (!user) setAuthorName('');
    showToast('Review submitted successfully!', 'success');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-textSecondary">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-accent">{product.category}</Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-8">
            {/* Main Image with Advanced Loader */}
            <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-secondary aspect-video shadow-2xl group">
                {/* Skeleton Loader */}
                <div className={`absolute inset-0 bg-white/5 animate-pulse transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'}`} 
                />
                
                {/* Visual Enhancement Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10">
                    Version {product.version}
                </div>
            </div>

            {/* Description */}
            <div className="mb-10">
                <h2 className="mb-4 text-lg font-bold text-white">About this Prompt</h2>
                <p className="text-textSecondary leading-7 whitespace-pre-line">
                    {product.fullDescription}
                </p>
            </div>

            {/* NEW: Features Section */}
            {product.features && product.features.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Zap size={18} className="text-accent" /> Key Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.slice(0, 5).map((feature, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-secondary/20 hover:bg-secondary/30 transition-colors">
                            <div className="mt-1 shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <CheckCircle size={16} className="text-accent" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm mb-1">{feature.title}</div>
                                <p className="text-xs text-textSecondary leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="mb-8 border-b border-white/10">
                <div className="flex gap-8">
                    {['specs', 'reviews', 'faq'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`border-b-2 pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                                activeTab === tab ? 'border-accent text-accent' : 'border-transparent text-textSecondary hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                {activeTab === 'specs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl border border-white/5 bg-secondary/30 p-6">
                            <h3 className="mb-4 font-bold text-white flex items-center gap-2">
                                <Cpu size={18} className="text-retro" /> Technical Specs
                            </h3>
                            <ul className="space-y-3 text-sm text-textSecondary">
                                <li className="flex justify-between">
                                    <span>{product.productType === 'Prompt Package' ? 'No. of Prompts' : 'Token Count'}</span>
                                    <span className="text-white font-mono">
                                        {product.productType === 'Prompt Package' ? product.promptCount : product.tokenCount}
                                    </span>
                                </li>
                                {/* Removed Model row as per request */}
                                <li className="flex justify-between">
                                    <span>Format</span>
                                    <span className="text-white">PDF</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Last Updated</span>
                                    <span className="text-white">2 days ago</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-secondary/30 p-6">
                            <h3 className="mb-4 font-bold text-white flex items-center gap-2">
                                <FileText size={18} className="text-accent" /> What's Included
                            </h3>
                             <ul className="space-y-3 text-sm text-textSecondary">
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>Master Prompt File (PDF)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>Usage Guide PDF</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                                    <span>Sample templates and Examples</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                
                {activeTab === 'reviews' && (
                    <div className="space-y-8">
                        {/* Rating Card */}
                        <div className="flex flex-col md:flex-row gap-8 bg-secondary/20 p-6 rounded-xl border border-white/5">
                            <div className="text-center md:text-left">
                                <div className="text-4xl font-bold text-white mb-1">{displayRating}</div>
                                <div className="flex text-yellow-400 justify-center md:justify-start mb-2">
                                    {[...Array(5)].map((_,i) => <Star key={i} size={16} fill={i < Math.floor(currentRating) ? "currentColor" : "none"} />)}
                                </div>
                                <div className="text-xs text-textSecondary">{totalReviewCount} Reviews</div>
                            </div>
                            
                            <div className="flex-1 space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-2 text-xs">
                                        <span className="w-3 text-textSecondary">{star}</span>
                                        <div className="h-1.5 flex-1 rounded-full bg-secondary">
                                            <div 
                                                className="h-full rounded-full bg-yellow-400" 
                                                style={{ width: totalReviewCount > 0 ? `${(star === 5 ? 80 : 5)}%` : '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review Form */}
                        <div className="rounded-xl border border-white/10 bg-secondary/30 p-6">
                            <h3 className="text-sm font-bold text-white mb-4">Write a Review</h3>
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-textSecondary mb-2">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="hover:scale-110 transition-transform"
                                            >
                                                <Star 
                                                    size={20} 
                                                    className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-textSecondary"} 
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {!user && (
                                    <div>
                                        <label className="block text-xs font-bold text-textSecondary mb-2">Name</label>
                                        <input 
                                            type="text" 
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            placeholder="Your name"
                                            className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-textSecondary mb-2">Review</label>
                                    <textarea 
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Share your experience with this prompt..."
                                        rows={3}
                                        className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent outline-none resize-none"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    className="flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-accent/90 transition-colors"
                                >
                                    <Send size={14} /> Submit Review
                                </button>
                            </form>
                        </div>
                        
                        {/* Reviews List */}
                        <div className="space-y-6">
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <div key={review.id} className="border-b border-white/5 pb-6 last:border-0 animate-in fade-in slide-in-from-bottom-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="font-bold text-white text-sm">{review.author}</div>
                                                {review.verifiedPurchase && (
                                                    <div className="flex items-center gap-1 text-[10px] text-green-400 font-medium bg-green-400/10 px-1.5 py-0.5 rounded">
                                                        <Shield size={10} /> Verified
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-textSecondary">{review.date}</div>
                                        </div>
                                        <div className="flex text-yellow-400 mb-2">
                                            {[...Array(5)].map((_,i) => <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />)}
                                        </div>
                                        <p className="text-sm text-textSecondary">{review.text}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-textSecondary flex flex-col items-center">
                                    <MessageSquare size={32} className="mb-2 opacity-50" />
                                    <p>No reviews yet. Be the first to rate this prompt!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'faq' && (
                    <div className="space-y-4">
                        {[
                            { q: "How do I access the prompt after purchase?", a: "Your purchased prompts will be delivered to your email and the 'My Library' section of your Dashboard within 2-3 hours after payment is received and verified." },
                            { q: "Do these prompts work with the free version of ChatGPT?", a: "Most prompts are optimized for GPT-4 (Plus), but we include fallback versions for GPT-3.5 where possible. Check the 'Technical Specs' tab for specific model compatibility." },
                            { q: "Can I get a refund if it doesn't work?", a: "Yes. We offer a 14-day money-back guarantee if the prompt fails to generate the described results despite following the usage guide." },
                            { q: "Do you provide invoices for businesses?", a: "Absolutely. A tax-compliant invoice is automatically generated and available for download in your Dashboard Order History within 2-3 hours after payment." }
                        ].map((item, i) => (
                            <div key={i} className="rounded-xl border border-white/5 bg-secondary/30 p-5">
                                <h4 className="flex items-start gap-3 font-bold text-white text-sm mb-2">
                                    <HelpCircle size={18} className="text-accent shrink-0" />
                                    {item.q}
                                </h4>
                                <p className="text-sm text-textSecondary pl-8">{item.a}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Right Column: Sticky Purchase Card */}
        <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-secondary/80 p-6 backdrop-blur-xl shadow-2xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-display font-bold text-white mb-2">{product.name}</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-yellow-400">
                             <Star size={16} className={currentRating > 0 ? "fill-yellow-400" : "text-textSecondary"} />
                             <span className="font-bold text-white">{displayRating}</span>
                        </div>
                        <span className="text-sm text-textSecondary border-l border-white/10 pl-4">{product.category}</span>
                    </div>
                </div>

                <div className="mb-6 flex items-end gap-2">
                    <span className="text-4xl font-bold text-accent">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="mb-1 text-sm text-textSecondary line-through">₹{(product.price * 1.5).toLocaleString('en-IN')}</span>
                </div>

                <div className="mb-6 space-y-3">
                    <button 
                        onClick={handleBuyNow}
                        className="w-full rounded-lg bg-gradient-to-r from-accent to-retro py-3.5 font-bold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Buy Now
                    </button>
                    <button 
                        onClick={handleAddToCart}
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-3.5 font-bold text-white hover:bg-white/10 transition-colors"
                    >
                        <ShoppingCart size={18} /> Add to Cart
                    </button>
                </div>

                <div className="space-y-3 text-xs text-textSecondary">
                    <div className="flex items-center gap-2">
                        <Award size={14} className="text-accent" />
                        <span>Quality Verified by Prompt Foundry</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Download size={14} className="text-accent" />
                        <span>Delivery: 2-3 hours after payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={14} className="text-accent" />
                        <span>Secure UPI Payment</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
