import React, { useState } from 'react';
import { ClipboardCopy, Check, MessageSquare } from 'lucide-react';
import BeatSpinner from '../ui/BeatSpinner';

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
    <div className='bg-white rounded-xl shadow-lg h-full flex flex-col relative'>
      <div
        className={`absolute top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg shadow-lg transition-all duration-300 ${
          showToast
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <Check size={14} className='text-emerald-400' />
        <span className='text-sm font-medium'>복사되었습니다</span>
      </div>

      <div className='px-6 py-5 flex-none border-b border-gray-100'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='bg-emerald-100 p-2.5 rounded-xl'>
              <MessageSquare size={20} className='text-emerald-600' />
            </div>
            <div>
              <h2 className='text-lg font-bold text-gray-900'>검토 내용</h2>
              <p className='text-sm text-gray-500 mt-0.5'>
                AI가 분석한 상세 피드백입니다
              </p>
            </div>
          </div>
          <button
            onClick={copyToClipboard}
            className='flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-200 active:scale-95'
          >
            <ClipboardCopy size={15} />
            <span>복사하기</span>
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <div className='p-6'>
          <div className='bg-gradient-to-br from-emerald-50/70 to-emerald-50/40 rounded-xl p-6'>
            {isLoading ? (
              <div className='flex items-center justify-center py-12'>
                <BeatSpinner />
              </div>
            ) : review ? (
              <div className='space-y-4'>
                {review.split('\n').map(
                  (paragraph, index) =>
                    paragraph.trim() && (
                      <p key={index} className='text-gray-700 leading-relaxed'>
                        {paragraph}
                      </p>
                    )
                )}
              </div>
            ) : (
              <div className='py-12 text-center'>
                <p className='text-gray-500 italic'>
                  첨삭 결과가 여기에 표시됩니다
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
