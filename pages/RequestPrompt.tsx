import React, { useState } from 'react';
import { Send, CheckCircle, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const RequestPrompt: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Business',
    model: 'GPT-4o / GPT-4 Turbo',
    description: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Custom Prompt Request: ${formData.category} - ${formData.name}`;
    const body = `Hi Prompt Foundry Team,

I would like to request a custom engineered prompt with the following specifications:

Client Details:
Name: ${formData.name}
Email: ${formData.email}

Project Scope:
Category: ${formData.category}
Target AI Model: ${formData.model}
Estimated Budget: ${formData.budget || 'Not specified'}

Requirement Description:
${formData.description}

Please review this request and provide a quote/feasibility report.

Best,
${formData.name}`;

    // Construct Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=saisrikiran@yahoo.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    setIsSubmitting(false);
    showToast("Redirecting to Gmail...", "info");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="mb-10 text-center">
             <div className="inline-flex items-center gap-2 rounded-full border border-retro/20 bg-retro/10 px-3 py-1 mb-6 backdrop-blur-md">
                <Sparkles size={14} className="text-retro" />
                <span className="text-xs font-medium text-retro uppercase tracking-wide">Custom Engineering</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-white mb-4">Request a Custom Prompt</h1>
            <p className="text-textSecondary max-w-2xl mx-auto">
                Can't find exactly what you need? Our prompt engineers will build a bespoke solution tailored to your specific workflow and edge cases.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Sidebar info */}
            <div className="md:col-span-1 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-secondary/50 p-6 backdrop-blur-sm">
                    <h3 className="font-bold text-white mb-4">How it works</h3>
                    <ul className="space-y-4">
                        {[
                            { step: '01', text: 'Submit your requirements' },
                            { step: '02', text: 'We review feasibility & quote' },
                            { step: '03', text: 'Engineering & Testing' },
                            { step: '04', text: 'Delivery & Documentation' }
                        ].map((item) => (
                            <li key={item.step} className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/10 text-xs font-bold text-accent font-mono">
                                    {item.step}
                                </span>
                                <span className="text-sm text-textSecondary">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-secondary/50 p-6 backdrop-blur-sm">
                    <h3 className="font-bold text-white mb-2">Enterprise Grade</h3>
                    <p className="text-xs text-textSecondary mb-4">
                        We build complex chains, function calling definitions, and agentic workflows for enterprise applications.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
                        <CheckCircle size={12} /> Confidentiality Guaranteed
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-secondary/30 p-8 backdrop-blur-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-textSecondary mb-1.5 uppercase tracking-wider">Name</label>
                            <input 
                                required 
                                name="name"
                                type="text" 
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-primary border border-borderSubtle p-3 text-white focus:border-accent outline-none transition-colors" 
                                placeholder="Your name" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-textSecondary mb-1.5 uppercase tracking-wider">Email</label>
                            <input 
                                required 
                                name="email"
                                type="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-primary border border-borderSubtle p-3 text-white focus:border-accent outline-none transition-colors" 
                                placeholder="work@company.com" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-textSecondary mb-1.5 uppercase tracking-wider">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-primary border border-borderSubtle p-3 text-white focus:border-accent outline-none transition-colors appearance-none"
                            >
                                <option>Business Automation</option>
                                <option>Marketing & Copywriting</option>
                                <option>Software Development</option>
                                <option>Data Analysis</option>
                                <option>Creative & Design</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-textSecondary mb-1.5 uppercase tracking-wider">Target Model</label>
                            <select 
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-primary border border-borderSubtle p-3 text-white focus:border-accent outline-none transition-colors appearance-none"
                            >
                                <option>GPT-4o / GPT-4 Turbo</option>
                                <option>Claude 3.5 Sonnet</option>
                                <option>Claude 3 Opus</option>
                                <option>Gemini Pro 1.5</option>
                                <option>Midjourney V6</option>
                                <option>Llama 3 (Open Source)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-textSecondary mb-1.5 uppercase tracking-wider">Requirement Description</label>
                        <textarea 
                            required 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6} 
                            className="w-full rounded-lg bg-primary border border-borderSubtle p-3 text-white focus:border-accent outline-none transition-colors resize-none" 
                            placeholder="Describe the task you want to automate. Include inputs, desired outputs, and any specific constraints..." 
                        />
                    </div>

                    <div>
                         <label className="block text-xs font-bold text-textSecondary mb-1.5 uppercase tracking-wider">Budget Range (Optional)</label>
                         <input 
                            name="budget"
                            type="text" 
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full rounded-lg bg-primary border border-borderSubtle p-3 text-white focus:border-accent outline-none transition-colors" 
                            placeholder="e.g. $500 - $1,000" 
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent py-4 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
                    >
                        {isSubmitting ? (
                            <span>Opening Gmail...</span>
                        ) : (
                            <>
                                <Send size={18} /> Compose in Gmail
                            </>
                        )}
                    </button>
                    
                    <p className="text-center text-xs text-textSecondary">
                        This will open a pre-filled email draft in your browser.
                    </p>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};