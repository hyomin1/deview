import { SortOption } from '@/models/interview';
import { ArrowDownWideNarrow, Clock, Tags } from 'lucide-react';
import React from 'react';

type Props = {
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
};

export default function SortOptions({ sortBy, setSortBy }: Props) {
  return (
    <div className='flex justify-end gap-2'>
      <button
        onClick={() => setSortBy('latest')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          sortBy === 'latest'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Clock className='w-4 h-4' />
        <span>최신순</span>
      </button>
      <button
        onClick={() => setSortBy('level')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          sortBy === 'level'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ArrowDownWideNarrow className='w-4 h-4' />
        <span>난이도순</span>
      </button>
      <button
        onClick={() => setSortBy('tag')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          sortBy === 'tag'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Tags className='w-4 h-4' />
        <span>태그별</span>
      </button>
    </div>
  );
}
