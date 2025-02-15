import { Interview } from '@/models/interview';
import { Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  interviews: Interview[];
};

export default function InterviewList({ interviews }: Props) {
  const getLevelStyle = (level: number) => {
    switch (level) {
      case 5:
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 4:
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-green-500 to-teal-500 text-white';
      default:
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white';
    }
  };

  return (
    <ul className='grid gap-6'>
      {interviews.map(
        ({ _id: id, keyword, category, description, tag, level }) => (
          <li key={id} className='group'>
            <Link
              href={`/interviews/${category}/${keyword}`}
              className='block bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-200 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/50'
            >
              <div className='p-6'>
                <div className='flex justify-between items-start gap-4'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Code className='w-5 h-5 text-blue-500' />
                      <h2 className='text-xl font-bold text-gray-900 truncate'>
                        {keyword}
                      </h2>
                    </div>

                    <p className='text-gray-600 mb-4 line-clamp-2'>
                      {description}
                    </p>

                    <div className='flex items-center gap-2 flex-wrap'>
                      <span className='px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full'>
                        {tag}
                      </span>
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelStyle(
                          level
                        )}`}
                      >
                        Level {level}
                      </span>
                    </div>
                  </div>

                  <div className='mt-1'>
                    <ArrowRight className='w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500' />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
