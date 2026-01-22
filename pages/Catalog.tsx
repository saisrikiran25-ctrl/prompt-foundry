
import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, ArrowUpDown, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/mockData';
import { ProductCategory } from '../types';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');
  const sortParam = searchParams.get('sort');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [sortBy, setSortBy] = useState<string>(sortParam || 'popular');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const categories: (ProductCategory | 'All')[] = ['All', 'Marketing', 'Business', 'Creative', 'Productivity', 'Developer', 'Education'];

  // Sync state with URL params
  useEffect(() => {
    // FIX: Always update selectedCategory based on param, defaulting to 'All' if null
    setSelectedCategory(categoryParam || 'All');
    
    if (sortParam) setSortBy(sortParam);
  }, [categoryParam, sortParam]);

  // Update URL when local filters change (optional polish, but good for UX)
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        if (cat === 'All') newParams.delete('category');
        else newParams.set('category', cat);
        return newParams;
    });
  };

  const filteredProducts = useMemo(() => {
    // 1. Filter
    let result = PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchSearch = !queryParam || 
          product.name.toLowerCase().includes(queryParam.toLowerCase()) || 
          product.description.toLowerCase().includes(queryParam.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(queryParam.toLowerCase()));
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchCategory && matchSearch && matchPrice;
    });

    // 2. Sort
    // We create a copy to avoid mutating the original mock data during the sort
    result = [...result]; 
    
    switch (sortBy) {
        case 'price-low':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'new':
            // Simulating "New" by reversing ID order (assuming newer IDs are added last)
            result.reverse(); 
            break;
        case 'popular':
        default:
            result.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
    }

    return result;
  }, [selectedCategory, queryParam, priceRange, sortBy]);

  return (
    <div className="mx-auto max-w-[96%] px-4 py-8 sm:px-6 lg:px-8">
      {/* Header & Mobile Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <div>
            <h1 className="text-3xl font-display font-bold text-white">
                {queryParam ? `Results for "${queryParam}"` : 'Browse Catalog'}
            </h1>
            <p className="text-textSecondary mt-1">
                Showing {filteredProducts.length} expert prompts
            </p>
        </div>
        
        <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative group">
                <div className="flex items-center gap-2 rounded-lg bg-secondary border border-white/10 px-4 py-2 text-sm text-white">
                    <ArrowUpDown size={14} className="text-accent" />
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent border-none outline-none appearance-none cursor-pointer font-medium"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="new">New Arrivals</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 rounded-lg bg-secondary border border-white/10 px-4 py-2 text-white text-sm"
            >
                <Filter size={14} /> Filters
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters (Desktop + Mobile Drawer) */}
        <div className={`
            fixed inset-0 z-40 bg-primary p-6 transition-transform duration-300 lg:static lg:block lg:bg-transparent lg:p-0 lg:translate-x-0
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="font-bold text-white text-lg">Filters</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="text-textSecondary">
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-8">
                {/* Categories */}
                <div className="rounded-xl border border-white/5 bg-secondary/30 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 font-bold text-white flex items-center gap-2">
                        <Filter size={16} className="text-accent" /> Categories
                    </h3>
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-accent' : 'border-white/20 group-hover:border-white/40'}`}>
                                    {selectedCategory === cat && <div className="w-2 h-2 rounded-full bg-accent" />}
                                </div>
                                <span className={`text-sm ${selectedCategory === cat ? 'text-white font-medium' : 'text-textSecondary group-hover:text-white'}`}>
                                    {cat}
                                </span>
                                <input 
                                    type="radio" 
                                    name="category" 
                                    className="hidden" 
                                    checked={selectedCategory === cat}
                                    onChange={() => {
                                        handleCategoryChange(cat);
                                        setIsMobileFiltersOpen(false);
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="rounded-xl border border-white/5 bg-secondary/30 p-6 backdrop-blur-sm">
                    <h3 className="mb-4 font-bold text-white">Price Range</h3>
                    <div className="flex items-center gap-4 text-sm text-textSecondary mb-4">
                        <span>₹{priceRange[0]}</span>
                        <span className="flex-1 h-px bg-white/10"></span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="300" 
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full accent-accent h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="mt-4 flex justify-between text-xs text-textSecondary">
                        <button onClick={() => setPriceRange([0, 100])} className="hover:text-white">Under ₹100</button>
                        <button onClick={() => setPriceRange([0, 300])} className="hover:text-white">Reset</button>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Mobile Filter Backdrop */}
        {isMobileFiltersOpen && (
            <div 
                className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileFiltersOpen(false)}
            />
        )}

        {/* Product Grid - Multi Column for Vertical Cards */}
        <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
                // Using standard grid columns for vertical cards
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-white/5 bg-secondary/20">
                    <Search size={48} className="text-white/10 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                    <p className="text-textSecondary text-center max-w-md">
                        Try adjusting your filters or search for a different term.
                    </p>
                    <button 
                        onClick={() => { setSelectedCategory('All'); setPriceRange([0, 300]); setSortBy('popular'); setSearchParams({}); }}
                        className="mt-6 text-accent hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
