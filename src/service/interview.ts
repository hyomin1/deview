import { Interview, MongoInterview } from '@/models/interview';
import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

type CreateInterviewInput = Omit<Interview, '_id' | 'createdAt'>;

export async function createInterview(interview: CreateInterviewInput) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection('interviews');

    await collection.insertOne({
      ...interview,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('MongoDB Error:', error);
    throw new Error('몽고 DB 저장 실패');
  }
}

export async function getInterviewsByCategory(category: string) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection<Interview>('interviews');

    const interviews = await collection.find({ category }).toArray();

    // MongoDB 객체를 일반 객체로 변환
    return interviews.map((interview) => ({
      ...interview,
      _id: interview._id.toString(),
    }));
  } catch (error) {
    console.error('MongoDB Error:', error);
    throw new Error('데이터 조회 실패');
  }
}

export async function getInterviewByKeywordAndCategory(
  category: string,
  keyword: string
): Promise<Interview | null> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection<Interview>('interviews');

    const interview = await collection.findOne({
      category,
      keyword: decodeURIComponent(keyword),
    });

    if (!interview) {
      return null;
    }

    return {
      ...interview,
      _id: interview._id.toString(),
    };
  } catch (error) {
    console.error('MongoDB Error:', error);
    throw new Error('데이터 조회 실패');
  }
}

export async function updateInterview(id: string, interview: MongoInterview) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const collection = db.collection<MongoInterview>('interviews');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: interview }
    );

    if (result.matchedCount === 0) {
      throw new Error('해당 ID의 문서를 찾을 수 없습니다');
    }
  } catch (error) {
    console.error('MongoDB Error:', error);
    throw new Error('데이터 조회 실패');
  }
}
