import { Bot } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type Props = {
  messages: {
    role: string;
    content: string;
  }[];
  isLoading: boolean;
};

export default function ResumeChat({ messages, isLoading }: Props) {
  const session = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='flex-1 overflow-auto px-6'>
      <div className='space-y-4'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-none'>
                <Bot size={20} className='text-blue-500' />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : `bg-gray-100 text-gray-900 ${
                      isLoading ? 'animate-pulse' : ''
                    }`
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <div className='w-8 h-8 rounded-full flex items-center justify-center flex-none'>
                <Image
                  className='rounded-full'
                  src={session.data?.user?.image ?? ''}
                  alt='User Profile'
                  width={30}
                  height={30}
                />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
