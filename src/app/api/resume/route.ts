import reviewDocument from '@/service/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { instruction, text } = await req.json();

  const res = await reviewDocument(instruction, text);

  return NextResponse.json(res);
}
