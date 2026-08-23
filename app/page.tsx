"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Target, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative pt-20 pb-32">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cerise/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cerise/10 border border-cerise/20 text-cerise text-xs font-black uppercase tracking-[0.2em] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cerise opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cerise"></span>
            </span>
            Live Beta: GPT-4 Enabled
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            STOP APPLYING.<br />
            <span className="text-transparent bg-clip-text bg-accent-gradient">START BLITZING.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-lavender/60 mb-12 leading-relaxed">
            The only AI application engine that rewrites your experience to perfectly match job descriptions in under 10 seconds.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/login" className="btn-primary h-16 px-12 text-lg">
              Get Started Free <ArrowRight />
            </Link>
            <Link href="/donate" className="flex items-center justify-center gap-2 h-16 px-12 border border-lavender/10 rounded-lg hover:bg-white/5 transition-all font-bold">
              Support the Vision
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40"
        >
          {[
            { icon: Zap, title: "Instant Blitz", desc: "Our engine targets specific keywords and phrasing that recruiters crave." },
            { icon: Target, title: "ATS Dominance", desc: "Beat the automated screeners with mathematically optimized resumes." },
            { icon: Shield, title: "Private & Secure", desc: "Your data is never used to train global models. Your blitz is yours alone." }
          ].map((f, i) => (
            <div key={i} className="premium-card p-10 text-left group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cerise transition-all">
                <f.icon className="text-cerise group-hover:text-white" size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-lavender/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
