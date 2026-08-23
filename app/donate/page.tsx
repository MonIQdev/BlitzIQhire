"use client";
import { useState } from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function DonatePage() {
  const [amount, setAmount] = useState(25);
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
    else setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <Heart className="mx-auto text-cerise mb-6" size={64} fill="#D81B60" />
      <h1 className="text-5xl font-black mb-4">Keep the Engine Running</h1>
      <p className="text-lavender/40 text-xl mb-16">blitzIQhire is built for the community. Your donations cover OpenAI tokens.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[10, 25, 50].map((val) => (
          <button 
            key={val} 
            onClick={() => setAmount(val)}
            className={`premium-card p-12 transition-all ${amount === val ? 'border-cerise bg-cerise/5 shadow-glow-cerise' : 'opacity-50'}`}
          >
            <div className="text-4xl font-black mb-2">${val}</div>
            <div className="text-xs uppercase font-black tracking-widest text-lavender/30">Select</div>
          </button>
        ))}
      </div>

      <button onClick={handleDonate} disabled={loading} className="btn-primary mx-auto h-20 px-20 text-2xl">
        {loading ? "Initializing..." : `Donate $${amount}`}
      </button>

      <div className="mt-12 flex items-center justify-center gap-3 text-lavender/20 text-sm">
        <ShieldCheck size={18} /> Payments secured by Stripe
      </div>
    </div>
  );
}
