import React, { useState } from 'react';
import ResumeResult from './ResumeResult';
import ResumeInput from './ResumeInput';
import ResumeChat from './ResumeChat';
import { Sparkles } from 'lucide-react';

export default function ResumeContainer() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        '안녕하세요! 글의 첨삭을 도와드리겠습니다. 첨삭받고 싶으신 문서를 작성하거나 업로드해주세요.',
    },
  ]);
  const [text, setText] = useState('');
  const [instruction, setInstruction] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: '글을 제출했습니다.' },
    ]);

    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '글을 검토 중입니다...' },
    ]);

    setText('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.content !== '글을 검토 중입니다...'),
        {
          role: 'assistant',
          content:
            '첨삭이 완료되었습니다. 오른쪽에서 상세한 피드백을 확인해주세요. 추가적인 질문이나 수정이 필요하시다면 언제든 말씀해주세요.',
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className='h-full bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden'>
      <div className='h-full max-w-8xl mx-auto p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 h-full'>
          <div className='bg-white rounded-lg shadow-lg h-full overflow-hidden flex flex-col border border-gray-100'>
            <div className='p-6 flex-none border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='bg-blue-500 p-2 rounded-lg'>
                  <Sparkles size={24} className='text-white' />
                </div>
                <div>
                  <h2 className='text-xl font-bold text-gray-900'>
                    AI 첨삭 도우미
                  </h2>
                  <p className='text-sm text-gray-500'>
                    실시간으로 전문적인 피드백을 받아보세요
                  </p>
                </div>
              </div>
            </div>

            <ResumeChat messages={messages} isLoading={isLoading} />

            <div className='border-t border-gray-100'>
              <ResumeInput
                text={text}
                handleSendMessage={handleSendMessage}
                setText={setText}
                instruction={instruction}
                setInstruction={setInstruction}
                setReview={setReview}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* 결과 섹션 */}
          <div className='bg-white rounded-lg shadow-lg h-full overflow-hidden border border-gray-100'>
            <div className='h-full'>
              <ResumeResult review={review} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
