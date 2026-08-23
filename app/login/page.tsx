"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Mail, Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (!error) setStatus('sent');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="premium-card w-full max-w-md p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-accent-gradient" />
        
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
          <p className="text-lavender/40">Sign in to resume your job blitz.</p>
        </div>

        {status === 'sent' ? (
          <div className="bg-cerise/5 border border-cerise/20 rounded-xl p-8 text-center">
            <Sparkles className="text-cerise mx-auto mb-4" size={40} />
            <h3 className="font-bold text-white text-xl mb-2">Check your email</h3>
            <p className="text-sm text-lavender/50">We've sent a magic link to {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-lavender/30">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-lavender/20" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="input-base pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button disabled={loading} className="btn-primary w-full h-14">
              {loading ? <Loader2 className="animate-spin" /> : "Send Magic Link"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
