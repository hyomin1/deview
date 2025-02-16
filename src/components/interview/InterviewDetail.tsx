'use client';

import { Interview } from '@/models/interview';
import {
  BookOpen,
  CheckCircle2,
  CodeIcon,
  Copy,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import MarkdownViewer from '../MarkdownViewer';

type Props = {
  interview: Interview;
};

export default function InterviewDetail({ interview }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyAnswer = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const {
    _id: id,
    question,
    answer,
    practicalUses,
    commonMistakes,
    relatedLinks,
  } = interview;

  return (
    <div className='space-y-8'>
      {/* 질문 섹션 */}
      <section className='p-6 bg-gray-50 rounded-lg border border-gray-200'>
        <div className='flex items-center mb-4'>
          <CodeIcon className='w-6 h-6 mr-3 text-blue-600' />
          <h2 className='text-xl font-semibold text-gray-800'>면접 질문</h2>
        </div>
        <p className='text-gray-700 leading-relaxed'>{question}</p>
      </section>

      {/* 답변 섹션 */}
      <section className='bg-white rounded-lg border border-gray-200'>
        <div className='border-b border-gray-100 p-6 pb-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <BookOpen className='w-6 h-6 mr-3 text-green-600' />
              <h2 className='text-xl font-semibold text-gray-800'>답변</h2>
            </div>
            <button
              onClick={handleCopyAnswer}
              className='flex items-center px-3 py-1.5 rounded-md border border-gray-200 
                       hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-800'
            >
              {copied ? (
                <>
                  <CheckCircle2 className='w-4 h-4 mr-1.5' />
                  <span className='text-sm'>복사됨</span>
                </>
              ) : (
                <>
                  <Copy className='w-4 h-4 mr-1.5' />
                  <span className='text-sm'>답변 복사</span>
                </>
              )}
            </button>
          </div>
        </div>
        <div className='p-6 pt-4'>
          <MarkdownViewer id={id} initialAnswer={answer} />
        </div>
      </section>

      {/* 추가 정보 그리드 */}
      <div className='grid md:grid-cols-2 gap-6'>
        {/* 실제 사용 사례 */}
        <section className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            실제 사용 사례
          </h2>
          <ul className='space-y-3'>
            {practicalUses?.map((use) => (
              <li key={use} className='flex items-start'>
                <CheckCircle2 className='w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-0.5' />
                <span className='text-gray-700'>{use}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 흔한 실수 */}
        <section className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            흔한 실수
          </h2>
          <ul className='space-y-3'>
            {commonMistakes?.map((mistake) => (
              <li key={mistake} className='flex items-start'>
                <CodeIcon className='w-5 h-5 mr-3 text-red-600 flex-shrink-0 mt-0.5' />
                <span className='text-gray-700'>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 관련 문서 링크 섹션 */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            관련 문서
          </h2>
          <ul className='space-y-2'>
            {relatedLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-gray-700 hover:text-blue-600 transition-colors group'
                >
                  <BookOpen className='w-5 h-5 mr-2 flex-shrink-0 text-gray-500 group-hover:text-blue-600' />
                  <span className='hover:underline'>{link}</span>
                  <ExternalLink className='w-4 h-4 ml-1.5 text-gray-400 group-hover:text-blue-600' />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
