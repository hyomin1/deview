'use client';

import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  id: string;
  keyword: string;
};

export default function InterviewUpdate({ id, keyword }: Props) {
  const router = useRouter();
  const handleClick = async () => {
    await fetch('/api/interview', {
      method: 'PUT',
      body: JSON.stringify({ id, keyword }),
    });
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className='inline-flex items-center px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group'
      >
        <RefreshCcw className='w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500' />
        <span className='text-sm font-medium'>업데이트</span>
      </button>
    </div>
  );
}
