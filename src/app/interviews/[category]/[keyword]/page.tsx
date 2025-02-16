import Link from 'next/link';
import { ChevronLeft, MessageCircleQuestion } from 'lucide-react';
import { getInterviewByKeywordAndCategory } from '@/service/interview';
import InterviewDetail from '@/components/interview/InterviewDetail';
import InterviewUpdate from '@/components/interview/InterviewUpdate';
import { checkIsAdmin } from '@/utils/auth';
import InterviewBadge from '@/components/interview/InterviewBadge';

type Props = {
  params: Promise<{ keyword: string; category: string }>;
};

export default async function InterviewQuestionDetailPage({ params }: Props) {
  const keyword = (await params).keyword;
  const category = (await params).category;
  const interview = await getInterviewByKeywordAndCategory(category, keyword);
  if (!interview) {
    return null;
  }
  const { _id: id, title, level, tag } = interview;

  const isAdmin = await checkIsAdmin();

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <header className='mb-10'>
        <div className='flex items-center mb-4'>
          <Link
            href='/interviews/frontend'
            className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
          >
            <ChevronLeft className='mr-2' />
            <span>면접 질문 목록으로</span>
          </Link>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center'>
            <MessageCircleQuestion className='w-10 h-10 mr-4 text-blue-600' />
            <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
          </div>
          {isAdmin && <InterviewUpdate id={id} keyword={keyword} />}
        </div>

        <InterviewBadge level={level} tag={tag} />
      </header>
      <InterviewDetail interview={interview} />
    </div>
  );
}
