import reviewDocument from '@/service/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { instruction, text } = await req.json();
  if (!instruction || !text) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  const res = await reviewDocument(instruction, text);

  return NextResponse.json(res);
}
