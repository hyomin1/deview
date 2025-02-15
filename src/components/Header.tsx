import { auth } from '@/auth';
import SignButton from './SignButton';
import Image from 'next/image';

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className='h-16 border-b px-4 flex items-center justify-between'>
      <div>{/* 로고나 다른 헤더 콘텐츠 */}</div>
      <div className='flex gap-4 items-center'>
        {user ? (
          <>
            <Image
              className='rounded-full'
              src={user.image ?? ''}
              alt='User Profile'
              width={30}
              height={30}
            />
            <p className='text-sm text-gray-600'>{user.name}</p>
            <SignButton showLoginButton={false} />
          </>
        ) : (
          <SignButton showLoginButton />
        )}
      </div>
    </header>
  );
}
