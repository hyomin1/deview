'use client';

import { FormEvent, useState } from 'react';

export default function InterviewGeneratorInput() {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
      if (!res.ok) {
        throw new Error('저장 실패');
      }
      setKeyword('');
    } catch (error) {
      console.error(`키워드 전송 에러 ${error}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='키워드 입력'
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button>입력 완료</button>
    </form>
  );
}
