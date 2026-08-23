"use client";
import React from 'react';

export function BlitzEngine({ sessionToken, isKilled }: { sessionToken: string; isKilled: boolean }) {
  return (
    <div className="premium-card p-8">
      <h2 className="text-xl font-bold mb-2">Blitz Engine</h2>
      <p className="text-sm text-lavender/40 mb-2">AI features are <span className="font-bold">{isKilled ? 'paused' : 'running'}</span>.</p>
      <p className="text-sm text-lavender/40">Session: <span className="font-mono">{sessionToken ? 'connected' : 'none'}</span></p>
    </div>
  );
}
