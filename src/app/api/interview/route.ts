import { createInterview } from '@/service/interview';
import { generateInterview } from '@/service/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json(
        { error: '키워드를 입력해야합니다.' },
        { status: 400 }
      );
    }
    const response = await generateInterview(keyword);
    await createInterview(response);
    return NextResponse.json(null, { status: 201 });
  } catch (error) {
    console.error(`Interview API Error: ${error}`);
    return NextResponse.json(
      { error: '처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
