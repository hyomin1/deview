import { ObjectId } from 'mongodb';

export type Interview = {
  _id: string;
  keyword: string;
  description: string;
  level: number;
  tag: string;
  category: string;
  title: string;
  question: string;
  answer: string;
  practicalUses: string[];
  commonMistakes: string[];
  relatedLinks: string[];
  createdAt: Date;
};

export type MongoInterview = Omit<Interview, '_id'> & {
  _id: ObjectId;
};

export type SortOption = 'latest' | 'tag' | 'level';

export type PaginatedResponse = {
  interviews: Interview[];
  totalPages: number;
  currentPage: number;
};
