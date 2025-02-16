import Link from 'next/link';
import InterviewBadge from './InterviewBadge';
import { ArrowRight, Code, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import useInterviews from '@/hooks/useInterviews';

type Props = {
  id: string;
  category: string;
  keyword: string;
  description: string;
  level: number;
  tag: string;
};

export default function InterviewCard({
  id,
  category,
  keyword,
  description,
  level,
  tag,
}: Props) {
  const session = useSession();
  const isAdmin = session.data?.user?.role === 'ADMIN';
  const { deleteInterview } = useInterviews(category);
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    deleteInterview(id);
  };
  return (
    <Link
      href={`/interviews/${category}/${keyword}`}
      className='block bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-200 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/50'
    >
      <div className='p-6'>
        <div className='flex justify-between items-start gap-4'>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-3 mb-3'>
              <Code className='w-5 h-5 text-blue-500' />
              <h2 className='text-xl font-bold text-gray-900 truncate'>
                {keyword}
              </h2>
            </div>

            <p className='text-gray-600 mb-4 line-clamp-2'>{description}</p>

            <InterviewBadge level={level} tag={tag} />
          </div>

          <div className='mt-1 flex items-center gap-4'>
            {isAdmin && (
              <button onClick={handleDelete} className='focus:outline-none'>
                <Trash2 className='w-5 h-5 text-red-500 transition-transform duration-200 hover:translate-x-1 hover:text-red-600' />
              </button>
            )}
            <ArrowRight className='w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500' />
          </div>
        </div>
      </div>
    </Link>
  );
}
