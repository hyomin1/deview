import { Interview } from '@/models/interview';
import clientPromise from '@/utils/mongodb';

export async function createInterview(interview: Interview) {
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

    return await collection.find({ category }).toArray();
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

    return await collection.findOne({
      category,
      keyword: decodeURIComponent(keyword),
    });
  } catch (error) {
    console.error('MongoDB Error:', error);
    throw new Error('데이터 조회 실패');
  }
}
