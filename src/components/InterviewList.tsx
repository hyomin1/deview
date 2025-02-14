import { Interview } from '@/models/interview';
import { Code } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  interviews: Interview[];
};

export default function InterviewList({ interviews }: Props) {
  return (
    <section>
      <ul className='space-y-6'>
        {interviews.map(({ keyword, category, description, tag, level }) => (
          <li
            key={keyword}
            className='bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all'
          >
            <Link
              href={`/interviews/${category}/${keyword}`}
              className='block p-6'
            >
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                    {keyword}
                  </h2>
                  <p className='text-gray-600 mb-4'>{description}</p>
                  <div className='flex items-center space-x-2'>
                    <span className='px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full'>
                      {tag}
                    </span>

                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        level === 5
                          ? 'bg-red-50 text-red-700'
                          : level === 1
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      LV.{level}
                    </span>
                  </div>
                </div>
                <Code className='w-8 h-8 text-gray-400' />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
