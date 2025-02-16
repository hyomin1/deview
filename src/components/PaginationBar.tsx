import { PAGE } from '@/app/constants/interview';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

type Props = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
};

export default function PaginationBar({
  currentPage,
  setPage,
  totalPages,
}: Props) {
  return (
    <div className='flex justify-center mt-8'>
      <Pagination
        current={currentPage}
        total={totalPages * PAGE}
        pageSize={PAGE}
        onChange={setPage}
      />
    </div>
  );
}
