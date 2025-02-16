import { FormEvent } from 'react';
import { Search } from 'lucide-react';

type Props = {
  keyword: string;
  setKeyword: (keyword: string) => void;
};

export default function InterviewSearch({ keyword, setKeyword }: Props) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className='basis-2/5'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
          <Search className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </div>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='w-full pl-10 pr-24 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        />
      </div>
    </form>
  );
}
