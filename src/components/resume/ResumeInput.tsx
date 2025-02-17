import { Send } from 'lucide-react';
import React, { FormEvent } from 'react';

type Props = {
  text: string;
  onClick: () => void;
  setText: (text: string) => void;
  instruction: string;
  setInstruction: (instruction: string) => void;
  setReview: (review: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export default function ResumeInput({
  text,
  onClick,
  setText,
  instruction,
  setInstruction,
  setReview,
  isLoading,
  setIsLoading,
}: Props) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        body: JSON.stringify({ text, instruction }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setReview(data);
    } catch (error) {
      console.error(`첨삭 전송 에러 ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <div className='bg-white shadow-lg rounded-xl p-6'>
        <form onSubmit={onSubmit} className='space-y-4'>
          <input
            placeholder='원하는 첨삭 내용을 입력하세요 (ex: 00에 맞게 수정해줘)'
            type='text'
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
          />

          <div className='flex gap-2'>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onClick()}
              placeholder='첨삭받고자 하는 글을 적어주세요 (ex: 자소서)'
              className='flex-1 px-4 py-3 bg-gray-50 border resize-none border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
            />

            <button
              disabled={isLoading}
              onClick={onClick}
              type='submit'
              className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              <Send size={18} className='text-white' />
              <span className='hidden sm:inline'>보내기</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
