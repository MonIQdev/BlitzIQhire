import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return NextResponse.json({ error: 'No token' }, { status: 401 });

  const killSwitch = await prisma.appSettings.findUnique({ where: { key: 'ai_kill_switch' } });
  if (killSwitch?.value === 'true') return NextResponse.json({ error: 'AI Services Paused' }, { status: 503 });

  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { jobDescription } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: "You are an elite career strategist. Rewrite the user's application content to be aggressive, targeted, and perfect for the job description." },
        { role: "user", content: `Job: ${jobDescription}` }
      ],
    });

    const result = completion.choices[0].message.content;

    await prisma.usageLog.create({
      data: {
        userId: user.id,
        action: 'AI_BLITZ',
        tokensUsed: completion.usage?.total_tokens || 0
      }
    });

    return NextResponse.json({ result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
