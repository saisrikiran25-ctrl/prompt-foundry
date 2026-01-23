
import React, { useEffect } from 'react';
import { Linkedin, Cpu, Globe, Brain, Rocket, Code, Layers } from 'lucide-react';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = {
    saas: [
      { name: "ContentAccel", desc: "Content Optimization and Generation App" },
      { name: "Prompt Foundry", desc: "Luxe Marketplace for Premium AI Prompts" },
      { name: "Aletheia", desc: "Zero-to-One Business Intelligence App" },
      { name: "Alpha AI Invoicing", desc: "AI Automated Invoice Generation App" }
    ],
    wrappers: [
      { name: "Academic Schedule Generator", desc: "AI-powered Academic Timetable Generator" },
      { name: "BizBuddy", desc: "AI-powered Business Prompt Builder" },
      { name: "AdVantage AI", desc: "AI-driven Brand and Strategy Assistant" },
      { name: "FinanceGO", desc: "FMCG-focused Financial Analytics Web App" }
    ],
    gpts: [
      { name: "Ultra Prompt Image Lab", desc: "Expert Level Image Prompts" },
      { name: "LinkedIn Hook Generator", desc: "LinkedIn Hooks and Posts" },
      { name: "BuildPilot", desc: "Webapp developer and Code Gen" },
      { name: "Algorithm Strategist Pro", desc: "YouTube SEO & Thumbnail Concepts" }
    ]
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero / Vision */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-8 backdrop-blur-md">
                <Rocket size={14} className="text-accent" />
                <span className="text-xs font-medium text-textSecondary uppercase tracking-wide">The Vision</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Democratizing <span className="bg-gradient-to-r from-accent to-retro bg-clip-text text-transparent">AI Mastery</span>
            </h1>
            <p className="text-xl text-textSecondary leading-relaxed max-w-3xl mx-auto">
                To help professionals, business owners, developers, and creative professionals leverage the full capabilities of AI in this rapidly evolving digital age.
            </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Founder Bio */}
        <div className="mb-20">
            <div className="relative rounded-2xl border border-white/10 bg-secondary/30 p-8 md:p-12 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-retro/5 blur-[100px] rounded-full pointer-events-none -z-10" />
                
                <div className="flex flex-col md:flex-row gap-10 items-start">
                    {/* Avatar / Side */}
                    <div className="shrink-0 flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-accent to-retro p-1 shadow-2xl shadow-accent/20">
                            <img 
                                src="https://pitchdeckstorage1234.blob.core.windows.net/thumbnails/Gemini_Generated_Image_lfd1gclfd1gclfd1.png" 
                                alt="Sai Srikiran J" 
                                className="w-full h-full rounded-xl object-cover bg-secondary"
                            />
                        </div>
                        <a 
                            href="https://www.linkedin.com/in/sai-srikiran-j-85983a36b/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-white bg-[#0077b5] hover:bg-[#006396] px-6 py-2.5 rounded-lg transition-colors w-full justify-center shadow-lg active:scale-95 duration-200"
                        >
                            <Linkedin size={16} /> Connect on LinkedIn
                        </a>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                             <h2 className="text-3xl font-display font-bold text-white">Sai Srikiran J</h2>
                             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                                <Code size={12} /> Founder
                             </div>
                        </div>
                        <p className="text-accent font-medium mb-6">Expert Prompt Engineer & AI Developer</p>
                        
                        <p className="text-textSecondary leading-relaxed mb-8 text-lg border-l-2 border-white/10 pl-6">
                            Experienced prompt engineer with a proven track record in the AI ecosystem. I have developed and deployed <span className="text-white font-bold">40+ Prompt Packages</span> and <span className="text-white font-bold">400+ Business Prompts</span> spanning specialized verticals including Marketing, Sales, Content Generation, Finance, and Corporate Strategy.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-bold text-white mb-1">40+</div>
                                <div className="text-[10px] text-textSecondary uppercase tracking-wider font-bold">Packages</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-bold text-white mb-1">400+</div>
                                <div className="text-[10px] text-textSecondary uppercase tracking-wider font-bold">Prompts</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-bold text-white mb-1">9+</div>
                                <div className="text-[10px] text-textSecondary uppercase tracking-wider font-bold">Apps Deployed</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-2xl font-bold text-white mb-1">6+</div>
                                <div className="text-[10px] text-textSecondary uppercase tracking-wider font-bold">Custom GPTs & Gems</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Portfolio Grid */}
        <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-white mb-8 text-center md:text-left">Engineering Portfolio</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            {/* SaaS Apps */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5 min-h-[60px]">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent ring-1 ring-accent/20"><Globe size={18} /></div>
                    <h3 className="text-lg font-bold text-white">SaaS Applications</h3>
                </div>
                <div className="space-y-4">
                    {projects.saas.map((item, i) => (
                        <div key={i} className="group flex flex-col justify-center h-24 p-4 rounded-xl border border-white/5 bg-secondary/20 hover:border-accent/30 hover:bg-secondary/40 transition-all hover:-translate-y-1">
                            <div className="font-bold text-white group-hover:text-accent transition-colors line-clamp-1" title={item.name}>{item.name}</div>
                            <div className="text-xs text-textSecondary mt-1 line-clamp-2" title={item.desc}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Wrappers */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5 min-h-[60px]">
                    <div className="p-2 rounded-lg bg-retro/10 text-retro ring-1 ring-retro/20"><Layers size={18} /></div>
                    <h3 className="text-lg font-bold text-white">AI Wrappers</h3>
                </div>
                <div className="space-y-4">
                    {projects.wrappers.map((item, i) => (
                        <div key={i} className="group flex flex-col justify-center h-24 p-4 rounded-xl border border-white/5 bg-secondary/20 hover:border-retro/30 hover:bg-secondary/40 transition-all hover:-translate-y-1">
                            <div className="font-bold text-white group-hover:text-retro transition-colors line-clamp-1" title={item.name}>{item.name}</div>
                             <div className="text-xs text-textSecondary mt-1 line-clamp-2" title={item.desc}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom GPTs */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5 min-h-[60px]">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20"><Brain size={18} /></div>
                    <h3 className="text-lg font-bold text-white">Custom GPTs</h3>
                </div>
                <div className="space-y-4">
                    {projects.gpts.map((item, i) => (
                        <div key={i} className="group flex flex-col justify-center h-24 p-4 rounded-xl border border-white/5 bg-secondary/20 hover:border-purple-500/30 hover:bg-secondary/40 transition-all hover:-translate-y-1">
                            <div className="font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1" title={item.name}>{item.name}</div>
                            <div className="text-xs text-textSecondary mt-1 line-clamp-1" title={item.desc}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};
