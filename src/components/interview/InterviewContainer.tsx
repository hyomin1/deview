'use client';

import { SortOption } from '@/models/interview';
import React, { useState } from 'react';
import SortOptions from '../SortOptions';
import PaginationBar from '../PaginationBar';
import GridSpinner from '../ui/GridSpinner';
import InterviewList from './InterviewList';
import ErrorAlert from '../ErrorAlert';
import InterviewSearch from './InterviewSearch';
import InterviewSearchResult from './InterviewSearchResult';
import useInterviews from '@/hooks/useInterviews';
import useDebounce from '@/hooks/useDebounce';

type Props = {
  category: string;
};

export default function InterviewContainer({ category }: Props) {
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [page, setPage] = useState(1);

  const { interviews, isLoading, error, currentPage, totalPages, mutate } =
    useInterviews(category, sortBy, page);

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword);
  const renderContent = () => {
    if (error) {
      <ErrorAlert
        message='인터뷰 목록을 불러오는 중 문제가 발생했습니다.'
        action={{
          label: '다시 시도',
          onClick: () => mutate(),
        }}
      />;
    }
    if (isLoading) {
      return (
        <div className='flex justify-center items-center'>
          <GridSpinner />
        </div>
      );
    }

    return (
      <>
        {debouncedKeyword.length < 1 ? (
          <>
            <InterviewList interviews={interviews} />
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={setPage}
            />
          </>
        ) : (
          <InterviewSearchResult
            category={category}
            keyword={debouncedKeyword}
          />
        )}
      </>
    );
  };
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <InterviewSearch keyword={keyword} setKeyword={setKeyword} />
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {renderContent()}
    </div>
  );
}
