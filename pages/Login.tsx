
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Cpu, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Mocked for now, but UI presence is strict
  const [name, setName] = useState('');
  
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if (isLogin) {
            await login(email);
        } else {
            if (!name) return;
            await register(email, name);
        }
        navigate(redirect);
    } catch (error) {
        // Error handled in AuthContext via Toast
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-secondary/50 p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/5 blur-[80px] rounded-full pointer-events-none -z-10" />

        <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-retro shadow-lg shadow-accent/20">
                <Cpu className="text-white" size={28} />
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join the Foundry'}
            </h1>
            <p className="text-sm text-textSecondary">
                {isLogin 
                    ? 'Sign in to access your engineered prompts.' 
                    : 'Create an account to start building your library.'}
            </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 mb-8 bg-primary/50 rounded-lg border border-white/5">
            <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-secondary text-white shadow-sm ring-1 ring-white/10' : 'text-textSecondary hover:text-white'}`}
            >
                Sign In
            </button>
            <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-secondary text-white shadow-sm ring-1 ring-white/10' : 'text-textSecondary hover:text-white'}`}
            >
                Create Account
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="mb-1 block text-xs font-bold text-textSecondary uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            required={!isLogin}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg bg-primary border border-borderSubtle p-3 pl-10 text-white focus:border-accent outline-none transition-colors"
                            placeholder="John Doe"
                        />
                        <User className="absolute left-3 top-3.5 text-textSecondary" size={16} />
                    </div>
                </div>
            )}

            <div>
                <label className="mb-1 block text-xs font-bold text-textSecondary uppercase tracking-wider">Email Address</label>
                <div className="relative">
                    <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg bg-primary border border-borderSubtle p-3 pl-10 text-white focus:border-accent outline-none transition-colors"
                        placeholder="engineer@example.com"
                    />
                    <Mail className="absolute left-3 top-3.5 text-textSecondary" size={16} />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-xs font-bold text-textSecondary uppercase tracking-wider">Password</label>
                <div className="relative">
                    <input 
                        type="password" 
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg bg-primary border border-borderSubtle p-3 pl-10 text-white focus:border-accent outline-none transition-colors"
                        placeholder="••••••••"
                    />
                    <Lock className="absolute left-3 top-3.5 text-textSecondary" size={16} />
                </div>
            </div>
            
            <button 
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-bold text-primary shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader className="animate-spin" size={20} /> : (isLogin ? 'Sign In' : 'Create Account')}
                {!loading && <ArrowRight size={18} />}
            </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-textSecondary border-t border-white/5 pt-4">
            <p>Protected by Prompt Foundry Secure Auth.</p>
        </div>
      </div>
    </div>
  );
};
