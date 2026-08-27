import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (!user || error) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({ where: { supabaseId: user.id } });
  if (!dbUser?.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { value } = await req.json();
  await prisma.appSettings.upsert({
    where: { key: 'ai_kill_switch' },
    update: { value: String(value) },
    create: { key: 'ai_kill_switch', value: String(value) }
  });

  return NextResponse.json({ success: true });
}
