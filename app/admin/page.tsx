import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { AdminPanelClient } from '@/components/admin/AdminPanelClient';

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.getSession();
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({ where: { supabaseId: session.user.id } });
  if (!user?.isAdmin) redirect('/dashboard');

  // Stats for the screen shots
  const totalUsers = await prisma.user.count();
  const totalCalls = await prisma.usageLog.count();
  const totalSearches = await prisma.jobSearch.count();
  const totalApplications = await prisma.trackedApplication.count();
  const killSwitch = await prisma.appSettings.findUnique({ where: { key: 'ai_kill_switch' } });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AdminPanelClient 
        stats={{
          totalUsers,
          totalCalls,
          totalSearches,
          totalApplications,
          isKilled: killSwitch?.value === 'true'
        }}
      />
    </div>
  );
}
