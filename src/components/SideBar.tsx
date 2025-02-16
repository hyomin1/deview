'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BookOpenIcon from './ui/icons/BookOpenIcon';
import QuizIcon from './ui/icons/QuizIcon';
import { FileEditIcon, History } from 'lucide-react';

const menus = [
  {
    href: '/interviews',
    icon: <BookOpenIcon />,
    title: '질문 모아보기',
    description: '직무별 기술 면접 질문을 확인해보세요',
  },

  {
    href: '/resume',
    icon: <FileEditIcon />,
    title: '자소서/이력서 첨삭',
    description: 'AI가 문서를 분석하고 개선점을 제안해드려요',
  },
  {
    href: '/practice',
    icon: <QuizIcon />,
    title: '채팅 면접',
    description: 'AI와 함께 면접 연습을 시작해보세요',
  },
  {
    href: '/history',
    icon: <History />,
    title: '히스토리',
    description: '지난 면접 연습과 첨삭 내역을 확인해보세요',
  },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className='h-full w-64 bg-white border-r border-gray-200'>
      <div className='flex flex-col h-full'>
        <div className='px-6 py-8'>
          <Link
            href='/'
            className='text-3xl font-bold hover:text-gray-600 transition-colors'
          >
            Deview
          </Link>
        </div>

        <nav className='flex-1 px-4 pb-8'>
          <ul className='space-y-2'>
            {menus.map(({ href, icon, title, description }) => {
              const isActive =
                pathname === href || pathname?.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      block p-3 rounded-lg transition-all duration-200
                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }
                    `}
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`
                        w-10 h-10 rounded-lg flex items-center justify-center
                        ${isActive ? 'bg-blue-100' : 'bg-gray-100'}
                      `}
                      >
                        {icon}
                      </div>
                      <div>
                        <h2 className='font-medium'>{title}</h2>
                        <p className='text-sm text-gray-500 mt-0.5'>
                          {description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className='p-4 border-t border-gray-200'>
          <div className='px-3 py-2 rounded-lg bg-gray-50'>
            <p className='text-sm text-gray-600'>AI 기반 면접 준비 플랫폼</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
