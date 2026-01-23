
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Shield, Layers, FileText, Layout, Cpu, ShieldCheck, Lock } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/mockData';

export const Home: React.FC = () => {
  const bestSellers = PRODUCTS;

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Mesh Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/10 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-retro/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="mx-auto max-w-[96%] pt-12 pb-8 md:pt-24 md:pb-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 mb-8 backdrop-blur-md">
                <Sparkles size={14} className="text-accent" />
                <span className="text-xs font-medium text-accent uppercase tracking-wide">The Gold Standard for AI</span>
            </div>
            
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
                Engineering Meets <br />
                <span className="bg-gradient-to-r from-accent to-retro bg-clip-text text-transparent">Business</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-textSecondary leading-relaxed">
                Access my private library of expert-grade prompts for GPT-4, Claude, and Midjourney. Battle-tested engineering, crafted for excellence.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/catalog" className="flex items-center justify-center h-12 w-full sm:w-auto px-8 rounded-lg bg-accent text-primary font-bold shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95 transition-all duration-200">
                    Explore Prompts
                </Link>
                <Link 
                    to="/about"
                    className="flex items-center justify-center h-12 w-full sm:w-auto px-8 rounded-lg border border-white/10 bg-secondary/50 text-white font-medium hover:bg-white/10 backdrop-blur-md transition-all"
                >
                    About Founder
                </Link>
            </div>
        </div>
      </section>

      {/* Key Application Features Bar */}
      <section className="border-y border-white/5 bg-secondary/30 backdrop-blur-sm">
        <div className="mx-auto max-w-[96%] px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { 
                        icon: Layout, 
                        title: 'Centralized Dashboard', 
                        desc: 'Manage your entire prompt library, invoices, and downloads in one sleek interface.' 
                    },
                    { 
                        icon: Cpu, 
                        title: 'Multi-Model Logic', 
                        desc: 'Prompts engineered to work seamlessly across GPT-4, Claude 3.5, and Gemini Pro.' 
                    },
                    { 
                        icon: ShieldCheck, 
                        title: 'Verified Quality', 
                        desc: 'Every prompt is battle-tested by engineers to ensure zero hallucinations.' 
                    },
                    { 
                        icon: Lock, 
                        title: 'Secure & Private', 
                        desc: 'Secure UPI payment gateway. Products delivered within 2-3 hours.' 
                    },
                ].map((feature, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-accent/10 group-hover:text-accent group-hover:ring-accent/20">
                            <feature.icon size={24} className="text-textSecondary group-hover:text-accent transition-colors" />
                        </div>
                        <h3 className="mb-2 font-display font-bold text-white">{feature.title}</h3>
                        <p className="text-sm text-textSecondary leading-relaxed px-2">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Features of the Prompts Section */}
      <section id="features" className="mx-auto w-full max-w-[96%] px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-12 text-center md:text-left">
            <h2 className="text-2xl font-display font-bold text-white mb-2">The Anatomy of a Premium Prompt</h2>
            <p className="text-sm text-textSecondary max-w-2xl">Why leading engineers and creators choose Prompt Foundry for their workflow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-2xl glass-card border border-white/5 hover:border-accent/20 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Expert Engineered</h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                    Each prompt undergoes rigorous testing to ensure reliability, safety, and consistent outputs across all edge cases. No fluff, just results.
                </p>
            </div>

            <div className="group p-6 rounded-2xl glass-card border border-white/5 hover:border-retro/20 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-retro/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="text-retro" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Multi-Model Ready</h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                   Don't settle for single-model performance. Get optimized variants for GPT-4, Claude 3.5, and Gemini Pro included with every purchase.
                </p>
            </div>

            <div className="group p-6 rounded-2xl glass-card border border-white/5 hover:border-purple-500/20 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="text-purple-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Full Documentation</h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                    Includes comprehensive guides, variable explanations, and integration snippets to help you deploy these prompts into your applications immediately.
                </p>
            </div>
        </div>
      </section>

      {/* Bestsellers Grid */}
      <section className="mx-auto w-full max-w-[96%] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-2">
            <TrendingUp className="text-retro" />
            <h2 className="text-2xl font-display font-bold text-white">Best Sellers</h2>
        </div>
        
        {/* Adjusted grid: Multi column standard grid for vertical cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-[96%] px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary to-primary border border-white/10 p-8 md:p-16 text-center">
             <div className="absolute top-0 right-0 p-16 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
             <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Start Engineering Your Success</h2>
                <p className="text-textSecondary max-w-xl mx-auto mb-8">Join thousands of professionals who are automating their workflow with Prompt Foundry's expert-grade library.</p>
                <Link to="/catalog" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                    Get Started Now
                </Link>
             </div>
        </div>
      </section>
    </div>
  );
};
