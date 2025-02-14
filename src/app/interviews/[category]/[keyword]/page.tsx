//'use client';
//import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  BookOpen,
  Copy,
  CheckCircle2,
  MessageCircleQuestion,
  Code as CodeIcon,
} from 'lucide-react';
import { getInterviewByKeywordAndCategory } from '@/service/interview';

type Props = {
  params: Promise<{ keyword: string; category: string }>;
};

export default async function InterviewQuestionDetailPage({ params }: Props) {
  //const [copied, setCopied] = useState(false);

  // const handleCopyAnswer = () => {
  //   navigator.clipboard.writeText(questionDetail.answer);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  const keyword = (await params).keyword;
  const category = (await params).category;
  const interview = await getInterviewByKeywordAndCategory(category, keyword);
  if (!interview) {
    return null;
  }
  const {
    title,
    question,
    answer,
    level,
    tag,
    practicalUses,
    commonMistakes,
    relatedLinks,
  } = interview;

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      {/* 뒤로가기 및 헤더 */}
      <header className='mb-10'>
        <div className='flex items-center mb-4'>
          <Link
            href='/interviews/frontend'
            className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
          >
            <ChevronLeft className='mr-2' />
            <span>면접 질문 목록으로</span>
          </Link>
        </div>

        <div className='flex items-center mb-6'>
          <MessageCircleQuestion className='w-10 h-10 mr-4 text-blue-600' />
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>{title}</h1>
          </div>
        </div>

        {/* 메타 정보 */}
        <div className='flex items-center space-x-4 mb-6'>
          <span className='px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full'>
            {category}
          </span>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              level === 3
                ? 'bg-red-50 text-red-700'
                : level === 2
                ? 'bg-yellow-50 text-yellow-700'
                : 'bg-green-50 text-green-700'
            }`}
          >
            LV.{level}
          </span>

          <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'>
            {tag}
          </span>
        </div>
      </header>

      {/* 질문 섹션 */}
      <section className='mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200'>
        <div className='flex items-center mb-4'>
          <CodeIcon className='w-6 h-6 mr-3 text-blue-600' />
          <h2 className='text-xl font-semibold text-gray-800'>면접 질문</h2>
        </div>
        <p className='text-gray-700'>{question}</p>
      </section>

      {/* 답변 섹션 */}
      <section className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <BookOpen className='w-6 h-6 mr-3 text-green-600' />
            <h2 className='text-xl font-semibold text-gray-800'>답변</h2>
          </div>
          {/* <button
            onClick={handleCopyAnswer}
            className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
          >
            {copied ? (
              <CheckCircle2 className='w-5 h-5 mr-2 text-green-600' />
            ) : (
              <Copy className='w-5 h-5 mr-2' />
            )}
            <span className='text-sm'>{copied ? '복사됨' : '답변 복사'}</span>
          </button> */}
        </div>
        <div className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm'>
          <pre className='text-gray-800 overflow-x-auto whitespace-pre-wrap'>
            {answer}
          </pre>
        </div>
      </section>

      {/* 추가 정보 */}
      <div className='grid md:grid-cols-2 gap-6'>
        {/* 실제 사용 사례 */}
        <section className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            실제 사용 사례
          </h2>
          <ul className='space-y-2'>
            {practicalUses?.map((use) => (
              <li key={use} className='flex items-center text-gray-700'>
                <CheckCircle2 className='w-5 h-5 mr-2 text-green-600' />
                {use}
              </li>
            ))}
          </ul>
        </section>

        {/* 흔한 실수 */}
        <section className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            흔한 실수
          </h2>
          <ul className='space-y-2'>
            {commonMistakes?.map((mistake) => (
              <li key={mistake} className='flex items-center text-gray-700'>
                <CodeIcon className='w-5 h-5 mr-2 text-red-600' />
                {mistake}
              </li>
            ))}
          </ul>
        </section>
      </div>
      {/* 관련 문서 링크 섹션 추가 */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className='bg-gray-50 p-6 rounded-lg border border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>
            관련 문서
          </h2>
          <ul className='space-y-3'>
            {relatedLinks.map((link, index) => (
              <li key={index} className='flex items-start'>
                <Link
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-blue-600 hover:text-blue-800 transition-colors'
                >
                  <BookOpen className='w-5 h-5 mr-2 flex-shrink-0' />
                  <span className='text-gray-700 hover:text-blue-600 underline'>
                    {link}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
