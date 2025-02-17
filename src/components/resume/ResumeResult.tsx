import React, { useState } from 'react';
import { ClipboardCopy, FileText, Check } from 'lucide-react';
import GridSpinner from '../ui/GridSpinner';

type Props = {
  review: string;
  isLoading: boolean;
};

export default function ResumeResult({ review, isLoading }: Props) {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(review);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg h-[600px] flex flex-col relative'>
      {' '}
      {/* 고정 높이 설정 */}
      {/* 토스트 부분 */}
      <div
        className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg transition-opacity duration-200 ${
          showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Check size={16} className='text-green-400' />
        <span className='text-sm'>복사되었습니다</span>
      </div>
      {/* 헤더 부분 - 고정 */}
      <div className='p-6 flex-none border-b border-gray-100'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='bg-emerald-100 p-2 rounded-lg'>
              <FileText size={20} className='text-emerald-600' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-800'>검토 내용</h2>
              <p className='text-sm text-gray-500'>
                AI가 분석한 상세 피드백입니다
              </p>
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className='flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-200'
          >
            <ClipboardCopy size={16} />
            <span>복사하기</span>
          </button>
        </div>
      </div>
      {/* 내용 부분 - 스크롤 가능 */}
      <div className='flex-1 overflow-y-auto'>
        {' '}
        {/* overflow-y-auto로 변경 */}
        <div className='p-6'>
          <div className='bg-emerald-50/50 rounded-lg p-6 leading-relaxed'>
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <GridSpinner />
              </div>
            ) : review ? (
              review.split('\n').map((paragraph, index) => (
                <p key={index} className='text-gray-700 mb-4 last:mb-0'>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className='text-gray-500 text-center italic'>
                첨삭 결과가 여기에 표시됩니다
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
