import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { BlitzEngine } from '@/components/dashboard/BlitzEngine';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.upsert({
    where: { supabaseId: session.user.id },
    update: {},
    create: {
      supabaseId: session.user.id,
      email: session.user.email!,
    },
  });

  const appSettings = await prisma.appSettings.findUnique({ where: { key: 'ai_kill_switch' } });
  const isKilled = appSettings?.value === 'true';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-black mb-2 tracking-tighter">Command Dashboard</h1>
        <p className="text-lavender/40">Connected as <span className="text-cerise font-bold">{user.email}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <BlitzEngine 
            sessionToken={session.access_token} 
            isKilled={isKilled}
          />
        </div>
        
        <div className="space-y-8">
          <div className="premium-card p-8">
            <h3 className="text-xl font-bold mb-6">Profile Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-lavender/40">Blitz Score</span>
                <span className="text-cerise font-bold">98/100</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-accent-gradient h-full w-[98%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
