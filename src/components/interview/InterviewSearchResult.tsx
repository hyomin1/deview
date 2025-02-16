import useSWR from 'swr';
import { Interview } from '@/models/interview';
import InterviewCard from './InterviewCard';
import GridSpinner from '../ui/GridSpinner';
import ErrorAlert from '../ErrorAlert';

type Props = {
  category: string;
  keyword: string;
};

export default function InterviewSearchResult({ category, keyword }: Props) {
  const { data, isLoading, error, mutate } = useSWR<Interview>(
    `/api/interview/search/${category}/${keyword}`
  );

  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <GridSpinner />
      </div>
    );
  }
  if (error) {
    <ErrorAlert
      message='인터뷰 목록을 불러오는 중 문제가 발생했습니다.'
      action={{
        label: '다시 시도',
        onClick: () => mutate(),
      }}
    />;
  }
  if (!data) {
    return null;
  }
  const { _id: id, description, level, tag } = data;

  return (
    <InterviewCard
      id={id}
      category={category}
      keyword={keyword}
      description={description}
      level={level}
      tag={tag}
    />
  );
}
