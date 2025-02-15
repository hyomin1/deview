import { AuthUser } from '@/models/user';
import clientPromise from '@/utils/mongodb';

export async function createOrUpdateUser(user: AuthUser) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const res = await db.collection('users').findOneAndUpdate(
      { email: user.email },
      {
        $set: {
          // 문서가 존재할 때 해당 필드들을 업데이트
          name: user.name,
          image: user.image,
        },
        $setOnInsert: {
          // 문서가 없어서 새로 생성될 때만 적용되는 필드들
          email: user.email,
          createdAt: new Date(),
          role: 'USER',
        },
      },
      {
        upsert: true, // 문서가 없으면 새로 생성하고, 있으면 업데이트
      }
    );
    return res;
  } catch (error) {
    console.error('사용자 정보 저장 중 오류:', error);
  }
}

export async function getUser() {}
