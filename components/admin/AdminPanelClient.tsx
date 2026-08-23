"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Search, FileText, Send, Power, Flame, Database, ArrowLeft, Upload, FileUp } from 'lucide-react';
import Link from 'next/link';

interface AdminStats {
  totalUsers: number;
  totalCalls: number;
  totalSearches: number;
  totalApplications: number;
  isKilled: boolean;
}

export function AdminPanelClient({ stats }: { stats: AdminStats }) {
  const [isKilled, setIsKilled] = useState(stats.isKilled);
  const [loading, setLoading] = useState(false);

  const toggleKillSwitch = async () => {
    setLoading(true);
    const newVal = !isKilled;
    await fetch('/api/admin/kill-switch', {
      method: 'POST',
      body: JSON.stringify({ value: newVal })
    });
    setIsKilled(newVal);
    setLoading(false);
  };

  return (
    <div className="space-y-12 pb-40">
      {/* Header matching screenshot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
            <RocketSmall />
          </div>
          <h1 className="text-2xl font-bold text-lavender">/ Admin</h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-lavender/40 hover:text-white transition-colors">
            <SunIcon />
          </button>
          <Link href="/dashboard" className="bg-white/5 border border-white/10 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
            <ArrowLeft size={16} /> Back to site
          </Link>
        </div>
      </div>

      {/* AI Kill Switch section */}
      <section className="premium-card p-10">
        <h2 className="text-2xl font-bold mb-3">AI Kill Switch</h2>
        <p className="text-lavender/40 mb-8">AI features are currently {isKilled ? 'paused' : 'running'}. You can pause all AI requests instantly.</p>
        <button 
          onClick={toggleKillSwitch}
          disabled={loading}
          className={`flex items-center gap-3 font-black px-10 py-5 rounded-xl uppercase tracking-widest transition-all ${isKilled ? 'bg-green-500 hover:bg-green-600' : 'bg-cerise hover:bg-cerise-hover shadow-glow-cerise'}`}
        >
          <Power size={20} /> {isKilled ? 'RESUME ALL AI REQUESTS' : 'STOP ALL AI REQUESTS'}
        </button>
      </section>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="premium-card p-10 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500"><Flame size={24} /></div>
            <div className="text-xl font-bold text-lavender/40"><span className="text-white text-3xl font-black">{stats.totalCalls}</span> / 1500</div>
          </div>
          <p className="text-lg font-bold text-lavender/60">Gemini Calls Today</p>
        </div>

        <div className="premium-card p-10 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500"><Database size={24} /></div>
            <div className="text-xl font-bold text-lavender/40"><span className="text-white text-3xl font-black">0</span> MB / 1000 MB</div>
          </div>
          <p className="text-lg font-bold text-lavender/60">Storage Used</p>
        </div>
      </div>

      {/* Big Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatItem icon={User} color="bg-purple-500" value={stats.totalUsers.toLocaleString()} label="Total Users" />
        <StatItem icon={Search} color="bg-pink-500" value={stats.totalSearches.toLocaleString()} label="Jobs Searched Today" />
        <StatItem icon={FileText} color="bg-blue-500" value={stats.totalApplications.toLocaleString()} label="Applications Tracked" />
      </div>

      {/* Send Announcement */}
      <section className="premium-card p-10">
        <h2 className="text-2xl font-bold mb-8">Send Announcement</h2>
        <textarea 
          placeholder="Write an announcement to broadcast to all users..."
          className="input-base bg-transparent border-white/5 mb-6 min-h-[150px]"
        />
        <button className="btn-primary px-10 h-14">
          <Send size={18} /> Send Announcement
        </button>
      </section>

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <button className="bg-cerise/10 border border-cerise/20 py-5 rounded-full font-black text-cerise text-sm uppercase tracking-widest hover:bg-cerise hover:text-white transition-all">
          Upload Resume Template
        </button>
        <button className="bg-white/5 border border-white/10 py-5 rounded-full font-black text-lavender/40 text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
          Upload Cover Letter Template
        </button>
      </div>

      <section className="premium-card p-10">
        <h2 className="text-2xl font-bold mb-8">Upload Resume Template</h2>
        <div className="space-y-6">
          <div>
            <label className="text-xs font-black text-lavender/30 uppercase tracking-widest block mb-3">Template name</label>
            <input type="text" className="input-base" placeholder="Professional 2024" />
          </div>
          <div>
            <label className="text-xs font-black text-lavender/30 uppercase tracking-widest block mb-3">Template file (PDF / DOCX)</label>
            <div className="flex items-center gap-4">
              <button className="btn-primary h-12 px-6 text-sm">Choose file</button>
              <span className="text-lavender/20 italic">No file chosen</span>
            </div>
          </div>
          <div className="pt-4">
            <label className="text-xs font-black text-lavender/30 uppercase tracking-widest block mb-3">Description</label>
            <input type="text" className="input-base" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ icon: Icon, color, value, label }: any) {
  return (
    <div className="space-y-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-5xl font-black text-white mb-1">{value}</div>
        <div className="text-lavender/40 text-sm font-bold uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
}

function RocketSmall() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D81B60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>; }
function SunIcon() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>; }
