import React from 'react';
import Link from 'next/link';
import { ChevronLeft, BookOpen } from 'lucide-react';
import InterviewGeneratorInput from '@/components/InterviewGeneratorInput';
import { getInterviewsByCategory } from '@/service/interview';
import InterviewList from '@/components/InterviewList';

type Props = {
  params: Promise<{ category: string }>;
};

// 해당 keyword(frontend,backend)로 db에서 정보 받아옴

export default async function InterviewCategoryPage({ params }: Props) {
  const category = (await params).category;
  const interviews = await getInterviewsByCategory(category);

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {/* 뒤로가기 및 헤더 */}
      <header className='mb-10'>
        <div className='flex items-center mb-4'>
          <Link
            href='/interviews'
            className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
          >
            <ChevronLeft className='mr-2' />
            <span>카테고리로 돌아가기</span>
          </Link>
        </div>
        <div className='flex items-center'>
          <BookOpen className='w-10 h-10 mr-4 text-blue-600' />
          <div>
            <div>
              <h1 className='text-3xl font-bold text-gray-800'>
                {category} 면접 질문
              </h1>
              <p className='text-gray-600'>
                프론트엔드 개발자를 위한 심층 기술 면접 질문 모음
              </p>
            </div>
            <InterviewGeneratorInput />
          </div>
        </div>
      </header>

      {/* 질문 목록 */}
      <InterviewList interviews={interviews} />
    </div>
  );
}
