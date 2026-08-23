"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Copy, Send, RotateCcw, AlertTriangle } from 'lucide-react';

export function BlitzEngine({ sessionToken, isKilled }: { sessionToken: string, isKilled: boolean }) {
  const [jobDesc, setJobDesc] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBlitz = async () => {
    if (isKilled) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionToken}` },
        body: JSON.stringify({ jobDescription: jobDesc })
      });
      const data = await res.json();
      if (data.error) setOutput(`Error: ${data.error}`);
      else setOutput(data.result);
    } catch (e) {
      setOutput("Internal engine failure. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (isKilled) {
    return (
      <div className="premium-card p-12 text-center border-red-500/20 bg-red-500/5">
        <AlertTriangle className="text-red-500 mx-auto mb-6" size={64} />
        <h2 className="text-2xl font-black mb-2">Engine Paused</h2>
        <p className="text-lavender/40">The administrator has temporarily paused AI services. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="premium-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cerise/10 rounded-lg text-cerise"><Zap size={20} /></div>
            <h3 className="text-xl font-bold uppercase tracking-widest">Job Blitz Engine</h3>
          </div>
          <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded uppercase tracking-[0.2em] text-lavender/30">Turbo-V4</span>
        </div>
        
        <textarea 
          className="input-base min-h-[300px] resize-none mb-6"
          placeholder="Paste job description requirements here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        
        <button 
          onClick={handleBlitz} 
          disabled={loading || !jobDesc}
          className="btn-primary w-full h-16 text-lg"
        >
          {loading ? <RotateCcw className="animate-spin" /> : <><Zap /> Start Blitzing</>}
        </button>
      </div>

      <AnimatePresence>
        {output && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="premium-card p-8 border-cerise/20 bg-cerise/5"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Optimized Content</h3>
              <button onClick={() => navigator.clipboard.writeText(output)} className="text-lavender/40 hover:text-cerise transition-colors">
                <Copy size={20} />
              </button>
            </div>
            <div className="text-lavender/80 whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {output}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
