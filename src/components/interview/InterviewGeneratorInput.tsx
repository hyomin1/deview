'use client';

import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import GridSpinner from '../ui/GridSpinner';
import useInterviews from '@/hooks/useInterviews';

type Props = {
  category: string;
};

export default function InterviewGeneratorInput({ category }: Props) {
  const [keyword, setKeyword] = useState('');
  const { createInterview, isCreating } = useInterviews(category);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    try {
      await createInterview(keyword);
      setKeyword('');
    } catch (error) {
      alert(
        error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-4 relative'>
      <div className='relative flex items-center'>
        <Search className='absolute left-3 text-gray-400 w-5 h-5' />
        <input
          placeholder='면접 질문을 생성할 키워드를 입력하세요'
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
          disabled={isCreating}
        />
        <button
          type='submit'
          disabled={isCreating || !keyword.trim()}
          className='absolute right-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm font-medium min-w-[80px] h-8 flex items-center justify-center'
        >
          {isCreating ? <GridSpinner /> : '생성하기'}
        </button>
      </div>
    </form>
  );
}
