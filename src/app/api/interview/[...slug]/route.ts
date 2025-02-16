import { SortOption } from '@/models/interview';
import { getInterviewsByCategory } from '@/service/interview';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function GET(_: NextRequest, context: Context) {
  try {
    const { slug } = await context.params;

    if ((!slug && !Array.isArray(slug)) || slug.length < 2) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const [category, sortBy, page] = slug;
    const { interviews, totalPages } = await getInterviewsByCategory(
      category,
      sortBy as SortOption,
      Number(page)
    );

    return NextResponse.json({
      interviews,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('질문 데이터 조회 에러', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
