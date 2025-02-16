import { Interview } from '@/models/interview';
import InterviewCard from './InterviewCard';

type Props = {
  interviews: Interview[];
};

export default function InterviewList({ interviews }: Props) {
  return (
    <ul className='grid gap-6'>
      {interviews?.map(
        ({ _id: id, keyword, category, description, tag, level }) => (
          <li key={id} className='group'>
            <InterviewCard
              id={id}
              keyword={keyword}
              category={category}
              description={description}
              tag={tag}
              level={level}
            />
          </li>
        )
      )}
    </ul>
  );
}
