
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User as UserIcon, Menu, X, Cpu, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');
  const currentQuery = searchParams.get('q') || '';
  const isCatalog = location.pathname === '/catalog';

  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = ['Marketing', 'Business', 'Creative', 'Productivity', 'Developer'];

  // Sync search input with URL query param
  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  // Update suggestions based on query
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
        const matches = PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.tags.some(t => t.toLowerCase().includes(query))
        ).slice(0, 5);
        setSuggestions(matches);
    } else {
        setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
        setIsMobileMenuOpen(false);
        setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
      navigate(`/product/${productId}`);
      setShowSuggestions(false);
  };

  // Delay hiding suggestions to allow click event to register
  const handleBlur = () => {
      setTimeout(() => {
          setShowSuggestions(false);
      }, 200);
  };

  return (
    <div className="min-h-screen bg-primary font-sans text-textPrimary selection:bg-accent/30 selection:text-accent flex flex-col">
      {/* Sticky Glass Navbar */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/5 transition-all duration-300">
        {/* Main Bar - Updated Max Width */}
        <div className="mx-auto flex h-16 max-w-[96%] items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-retro shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">
               <Cpu className="text-white" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white hidden sm:block">
              Prompt <span className="text-accent">Foundry</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          {user && (
            <div className="hidden flex-1 items-center justify-center px-8 md:flex relative z-50">
              <form onSubmit={handleSearch} className="relative w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={handleBlur}
                  autoComplete="off"
                  placeholder="Search for expert prompts..."
                  className="w-full rounded-full border border-borderSubtle bg-secondary/50 py-2.5 pl-12 pr-4 text-sm text-textPrimary placeholder-textSecondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all shadow-inner"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary" size={18} />

                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery.trim().length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 w-full rounded-xl border border-white/10 bg-secondary/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                      {suggestions.length > 0 ? (
                          <>
                              <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-textSecondary bg-white/5 border-b border-white/5">
                                  Top Matches
                              </div>
                              {suggestions.map(product => (
                                  <button
                                      key={product.id}
                                      onClick={() => handleSuggestionClick(product.id)}
                                      className="flex items-center gap-3 w-full p-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0 group"
                                  >
                                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-primary ring-1 ring-white/10 group-hover:ring-accent/50 transition-all" />
                                      <div className="min-w-0 flex-1">
                                          <div className="text-sm font-bold text-white truncate group-hover:text-accent transition-colors">{product.name}</div>
                                          <div className="text-xs text-textSecondary flex items-center gap-2">
                                              <span className="truncate">{product.category}</span>
                                              <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                              <span className="text-white font-medium">₹{product.price.toLocaleString('en-IN')}</span>
                                          </div>
                                      </div>
                                  </button>
                              ))}
                              <button 
                                  onClick={(e) => {
                                      handleSearch(e);
                                  }}
                                  className="p-3 text-xs font-bold text-center text-accent bg-accent/5 hover:bg-accent/10 transition-colors"
                              >
                                  View all results for "{searchQuery}"
                              </button>
                          </>
                      ) : (
                          <div className="p-4 text-sm text-textSecondary text-center">
                              No matches found. Press Enter to search catalog.
                          </div>
                      )}
                    </div>
                )}
              </form>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 md:flex">
              {user && (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">
                    My Library
                  </Link>
                  <div className="h-4 w-px bg-white/10"></div>
                </>
              )}
              <Link to="/cart" className="relative text-textSecondary hover:text-accent transition-colors">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-primary animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="relative">
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors"
                    >
                        <img src={user.avatar} alt="User" className="h-8 w-8 rounded-full ring-2 ring-white/10" />
                    </button>
                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                        <div className="absolute right-0 mt-3 w-48 rounded-xl border border-white/10 bg-secondary/95 p-2 shadow-xl backdrop-blur-xl z-20">
                            <div className="px-3 py-2 text-xs text-textSecondary border-b border-white/5 mb-2">
                                Signed in as <br/> <span className="font-bold text-white">{user.displayName}</span>
                            </div>
                            <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-textPrimary hover:bg-white/10 hover:text-accent">
                                <LayoutDashboard size={16} /> Dashboard
                            </Link>
                            <button onClick={() => { logout(); setIsProfileOpen(false); }} className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                        </>
                    )}
                </div>
              ) : (
                <Link to="/login" className="text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                    Login
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-textPrimary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-primary pt-20 px-6 md:hidden overflow-y-auto">
            {user && (
              <form onSubmit={handleSearch} className="mb-6 relative">
                  <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full rounded-lg bg-secondary border border-borderSubtle p-3 text-textPrimary focus:border-accent outline-none"
                  />
              </form>
            )}
             <div className="space-y-4">
                <Link 
                    to="/catalog" 
                    className={`block text-lg ${isCatalog && !currentCategory ? 'font-bold text-white' : 'font-medium text-textSecondary'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Browse All
                </Link>
                {categories.map((cat) => (
                    <Link 
                        key={cat} 
                        to={`/catalog?category=${cat}`} 
                        className={`block text-lg ${isCatalog && currentCategory === cat ? 'font-bold text-white' : 'font-medium text-textSecondary'}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {cat}
                    </Link>
                ))}
                <div className="h-px bg-white/10 my-4" />
                <Link to="/cart" className="flex items-center justify-between text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>
                    Cart
                    <span className="bg-accent text-primary px-2 rounded-full text-sm font-bold">{itemCount}</span>
                </Link>
                {user ? (
                    <Link to="/dashboard" className="block text-lg font-medium text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                        My Dashboard
                    </Link>
                ) : (
                    <Link to="/login" className="block text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>
                        Login
                    </Link>
                )}
             </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20 md:pt-24 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-secondary pt-16 pb-12">
        <div className="mx-auto max-w-[96%] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 items-start">
                
                {/* Brand Column */}
                <div className="col-span-1">
                    <div className="flex items-center gap-2 mb-6 h-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                             <Cpu className="text-primary" size={18} />
                        </div>
                        <span className="font-display font-bold text-xl text-white">Prompt Foundry</span>
                    </div>
                    <p className="text-sm text-textSecondary leading-relaxed">
                        The definitive library for engineered AI prompts. Expertly crafted, battle-tested results, instant delivery.
                    </p>
                </div>

                {/* Collection Column */}
                <div className="col-span-1">
                    <div className="flex items-center h-8 mb-6">
                        <h4 className="font-display font-bold text-white">Collection</h4>
                    </div>
                    <ul className="space-y-4 text-sm text-textSecondary">
                        <li><Link to="/catalog" className="hover:text-accent transition-colors block">Browse All</Link></li>
                        <li><Link to="/catalog?sort=popular" className="hover:text-accent transition-colors block">Best Sellers</Link></li>
                        <li><Link to="/catalog?sort=new" className="hover:text-accent transition-colors block">New Arrivals</Link></li>
                    </ul>
                </div>

                {/* Support Column */}
                <div className="col-span-1">
                     <div className="flex items-center h-8 mb-6">
                        <h4 className="font-display font-bold text-white">Support</h4>
                    </div>
                    <ul className="space-y-4 text-sm text-textSecondary">
                        <li><Link to="/help" className="hover:text-accent transition-colors block">Help Center</Link></li>
                        <li><Link to="/request-prompt" className="hover:text-accent transition-colors block">Request a Prompt</Link></li>
                        <li><Link to="/terms" className="hover:text-accent transition-colors block">Terms of Service</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition-colors block">About Founder</Link></li>
                    </ul>
                </div>

                 {/* Stay Updated Column */}
                 <div className="col-span-1">
                     <div className="flex items-center h-8 mb-6">
                        <h4 className="font-display font-bold text-white">Stay Updated</h4>
                    </div>
                     <div className="flex flex-col gap-3">
                         <input 
                            type="email" 
                            placeholder="Enter email" 
                            className="bg-primary border border-white/10 rounded-lg px-4 py-3 text-sm w-full focus:border-accent outline-none text-white transition-all placeholder:text-white/20" 
                         />
                         <button className="bg-accent hover:bg-accent/90 text-primary font-bold text-sm px-4 py-3 rounded-lg transition-colors w-full">
                            Join
                         </button>
                     </div>
                </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-textSecondary">
                <p>&copy; {new Date().getFullYear()} Prompt Foundry. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link to="/terms" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};
