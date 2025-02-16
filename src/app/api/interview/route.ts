import {
  createInterview,
  getInterviewByKeywordAndCategory,
  updateAnswer,
  updateInterview,
} from '@/service/interview';
import { generateInterview } from '@/service/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { category, keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json(
        { error: '키워드를 입력해야합니다.' },
        { status: 400 }
      );
    }
    const existingInterview = await getInterviewByKeywordAndCategory(
      category,
      keyword
    );

    if (existingInterview) {
      return NextResponse.json(
        { error: '이미 존재하는 키워드 입니다.' },
        { status: 409 }
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

export async function PUT(req: NextRequest) {
  try {
    const { id, keyword } = await req.json();
    if (!id || !keyword) {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }
    const response = await generateInterview(keyword);
    await updateInterview(id, response);
    return NextResponse.json('전체적인 면접 데이터 업데이트 성공', {
      status: 200,
    });
  } catch (error) {
    console.error(`전체적인 면접 데이터 업데이트 업데이트 에러 ${error}`);
    return NextResponse.json(
      { error: '처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, answer } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }
    await updateAnswer(id, answer);
    return NextResponse.json('면접 답변 성공', { status: 200 });
  } catch (error) {
    console.error(`면접 답변 업데이트 에러 ${error}`);
    return NextResponse.json(
      { error: '처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
