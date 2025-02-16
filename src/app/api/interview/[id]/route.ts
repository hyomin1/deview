import { deleteInterview } from '@/service/interview';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: NextRequest, context: Context) {
  try {
    const { id } = await context.params;

    await deleteInterview(id);
    return NextResponse.json(null, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: '삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
