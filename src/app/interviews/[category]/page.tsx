import Link from 'next/link';
import { ChevronLeft, BookOpen } from 'lucide-react';
import InterviewGeneratorInput from '@/components/InterviewGeneratorInput';
import { getInterviewsByCategory } from '@/service/interview';
import InterviewList from '@/components/InterviewList';
import { checkIsAdmin } from '@/utils/auth';

type Props = {
  params: Promise<{ category: string }>;
};

export default async function InterviewCategoryPage({ params }: Props) {
  const category = (await params).category;
  const interviews = await getInterviewsByCategory(category);
  const isAdmin = await checkIsAdmin();
  return (
    <div className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-6 py-12'>
        {/* 뒤로가기 */}
        <nav className='mb-12'>
          <Link
            href='/interviews'
            className='inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors'
          >
            <ChevronLeft className='mr-1 h-5 w-5' />
            <span className='text-sm font-medium'>카테고리로 돌아가기</span>
          </Link>
        </nav>

        {/* 헤더 섹션 */}
        <header className='mb-12'>
          <div className='flex items-center gap-5 mb-8'>
            <div className='flex-shrink-0'>
              <BookOpen className='h-12 w-12 text-blue-600' strokeWidth={1.5} />
            </div>
            <div>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                {category} 면접 질문
              </h1>
              <p className='text-lg text-gray-600'>
                {category} 개발자를 위한 심층 기술 면접 질문 모음
              </p>
            </div>
          </div>

          {/* 검색 입력 */}
          {isAdmin && (
            <div className='max-w-2xl'>
              <InterviewGeneratorInput />
            </div>
          )}
        </header>

        {/* 질문 목록 */}
        <section>
          <InterviewList interviews={interviews} />
        </section>
      </div>
    </div>
  );
}
