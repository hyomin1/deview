import { auth } from '@/auth';
import SignButton from '@/components/SignButton';
import clientPromise from '@/utils/mongodb';

async function getDb() {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  return db.collection('comments').find({}).toArray();
}

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[80vh] space-y-6'>
        <h1 className='text-4xl font-bold'>Deview에 오신 것을 환영합니다</h1>
        <p className='text-lg text-gray-600'>개발자들을 위한 공간</p>
        <SignButton showLoginButton />
      </div>
    );
  }
  return (
    <div>
      <h1>Welcome back!</h1>
      {/* 로그인된 사용자를 위한 콘텐츠 */}
    </div>
  );
}
