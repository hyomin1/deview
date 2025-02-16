import { SortOption } from '@/models/interview';
import { Sort } from 'mongodb';

type SortDirection = 1 | -1;
type MongoSortOption = { [key: string]: SortDirection };

export const getSortOptions = (sort: SortOption): Sort => {
  const sortOptions: Record<SortOption, MongoSortOption> = {
    latest: { createdAt: -1 },
    level: { level: 1 },
    tag: { tag: 1 },
  };

  return sortOptions[sort] || sortOptions.latest;
};
