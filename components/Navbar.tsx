"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, ShieldAlert, Heart, Layout, LogIn, User as UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

export function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAdminStatus(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAdminStatus(session.user.id);
      else setIsAdmin(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAdminStatus = async (uid: string) => {
    try {
      const res = await fetch(`/api/user/status?uid=${uid}`);
      const data = await res.json();
      setIsAdmin(data.isAdmin);
    } catch (e) {
      console.error(e);
    }
  };

  const links = [
    { name: 'Blitz', href: '/', icon: Rocket },
    { name: 'Support', href: '/donate', icon: Heart },
    ...(session ? [{ name: 'Dashboard', href: '/dashboard', icon: Layout }] : []),
    ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: ShieldAlert }] : []),
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-gradient rounded-xl flex items-center justify-center shadow-glow-cerise">
            <Rocket className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            blitzIQ<span className="text-cerise">hire</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-cerise ${pathname === link.href ? 'text-cerise' : 'text-lavender/50'}`}
            >
              {link.name}
            </Link>
          ))}
          {session ? (
             <button onClick={() => getSupabase().auth.signOut()} className="text-lavender/30 hover:text-white transition-colors">
               <UserIcon size={20} />
             </button>
          ) : (
            <Link href="/login" className="btn-primary py-2 px-6">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
