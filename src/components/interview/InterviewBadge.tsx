import { getLevelStyle } from '@/utils/style';

type Props = {
  level: number;
  tag: string;
};

export default function InterviewBadge({ level, tag }: Props) {
  return (
    <div className='flex items-center gap-2 flex-wrap'>
      <span className='px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full'>
        {tag}
      </span>
      <span
        className={`px-3 py-1 text-sm font-medium rounded-full ${getLevelStyle(
          level
        )}`}
      >
        Level {level}
      </span>
    </div>
  );
}
