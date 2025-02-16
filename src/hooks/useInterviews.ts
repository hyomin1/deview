import { PaginatedResponse, SortOption } from '@/models/interview';
import { useState } from 'react';
import useSWR from 'swr';

export default function useInterviews(
  category: string,
  sortBy: SortOption = 'latest',
  page: number = 1
) {
  const { data, isLoading, error, mutate } = useSWR<PaginatedResponse>(
    `/api/interview/${category}/${sortBy}/${page}`
  );
  const [isCreating, setIsCreating] = useState(false);
  if (!data) {
    return {
      interviews: [],
      currentPage: 0,
      totalPages: 0,
      isLoading,
      error,
      mutate,
      deleteInterview: async () => {},
      createInterview: async () => {},
    };
  }
  const { interviews, currentPage, totalPages } = data;

  const deleteInterview = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/interview/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('삭제 실패');
      }
      // 현재 URL에 해당하는 데이터 갱신
      mutate();
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const createInterview = async (keyword: string) => {
    setIsCreating(true); // 시작할 때 true
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, keyword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '저장 실패');
      }

      mutate();
      return true;
    } catch (error) {
      console.error(`키워드 전송 에러 ${error}`);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    currentPage,
    totalPages,
    interviews,
    isLoading,
    isCreating,
    error,
    mutate,
    deleteInterview,
    createInterview,
  };
}
