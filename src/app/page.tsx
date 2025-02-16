import { auth } from '@/auth';
import {
  ArrowRightIcon,
  Sparkles,
  BookOpen,
  FileText,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

const menus = [
  {
    label: '총 면접 연습',
    value: '0회',
    icon: <MessageSquare className='text-blue-500' />,
    color: 'blue',
  },
  {
    label: '첨삭 완료',
    value: '0건',
    icon: <FileText className='text-emerald-500' />,
    color: 'emerald',
  },
  {
    label: '학습한 질문',
    value: '0개',
    icon: <BookOpen className='text-purple-500' />,
    color: 'purple',
  },
];

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className='max-w-6xl mx-auto px-6 py-12'>
      <section className='relative mb-16'>
        <div className='relative p-8 md:p-12 bg-white rounded-3xl border border-gray-200 shadow-sm'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-3xl' />
          <div className='flex justify-between items-start relative'>
            <div className='max-w-2xl'>
              <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>
                {user && `${user.name}님 환영합니다!`}
              </h1>

              <p className='text-xl text-gray-600 leading-relaxed mt-4'>
                AI와 함께 면접 준비를 시작해보세요
              </p>
            </div>
            <div className='hidden md:flex md:items-center md:justify-center w-12 h-12 rounded-xl bg-blue-50'>
              <Sparkles className='w-6 h-6 text-blue-500' aria-hidden='true' />
            </div>
          </div>
        </div>
      </section>

      <section className='grid md:grid-cols-3 gap-6 mb-12' aria-label='통계'>
        {menus.map(({ color, label, value, icon }, i) => (
          <div
            key={i}
            className='p-6 bg-white rounded-2xl border border-gray-100 shadow-sm'
          >
            <div
              className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center mb-4`}
            >
              {icon}
            </div>
            <p className='text-sm font-medium text-gray-500'>{label}</p>
            <p className='text-2xl font-semibold text-gray-900 mt-1'>{value}</p>
          </div>
        ))}
      </section>

      <div className='grid md:grid-cols-2 gap-8'>
        <section aria-label='최근 활동'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            최근 활동
          </h2>

          <article className='group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-4'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    면접 연습
                  </h3>
                  <p className='text-gray-500 mt-1'>
                    AI와 1:1 면접 연습을 시작해보세요
                  </p>
                </div>
                <div className='w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center'>
                  <MessageSquare className='w-5 h-5 text-purple-500' />
                </div>
              </div>
              <Link
                href='/practice'
                className='inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500'
              >
                <span>시작하기</span>
                <ArrowRightIcon className='ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5' />
              </Link>
            </div>
          </article>

          <article className='group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200'>
            <div className='p-6'>
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    이력서 첨삭
                  </h3>
                  <p className='text-gray-500 mt-1'>
                    AI가 이력서를 분석하고 개선점을 제안해드려요
                  </p>
                </div>
                <div className='w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center'>
                  <FileText className='w-5 h-5 text-emerald-500' />
                </div>
              </div>
              <Link
                href='/resume'
                className='inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500'
              >
                <span>시작하기</span>
                <ArrowRightIcon className='ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5' />
              </Link>
            </div>
          </article>
        </section>

        <section aria-label='학습 자료'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>
            추천 학습 자료
          </h2>
          <article className='group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200'>
            <div className='p-6'>
              <div className='mb-8'>
                <div className='w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center mb-4'>
                  <BookOpen className='w-6 h-6 text-blue-500' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  면접 질문 모음
                </h3>
                <p className='text-gray-600'>
                  직무별 추천 면접 질문과 모범 답안을 확인해보세요
                </p>
              </div>
              <Link
                href='/interviews'
                className='inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors'
              >
                <span>질문 모음 보기</span>
                <ArrowRightIcon className='ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5' />
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
