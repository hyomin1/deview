'use client';

import Link from 'next/link';
import { MoveLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-white'>
      <div className='max-w-md w-full px-6'>
        {/* 404 Display */}
        <div className='text-center mb-8'>
          <h1 className='text-7xl font-bold text-gray-900 mb-3'>404</h1>
          <p className='text-xl font-medium text-gray-900 mb-2'>
            페이지를 찾을 수 없습니다
          </p>
          <p className='text-sm text-gray-500'>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
          <Link
            href='/'
            className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-sm'
          >
            <Home className='w-4 h-4 mr-2' />
            홈으로 가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-sm'
          >
            <MoveLeft className='w-4 h-4 mr-2' />
            이전 페이지
          </button>
        </div>
      </div>
    </main>
  );
}
