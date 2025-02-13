import { auth } from '@/auth';
import SignButton from './SignButton';

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className='h-16 border-b px-4 flex items-center justify-between'>
      <div>{/* 로고나 다른 헤더 콘텐츠 */}</div>
      <div className='flex gap-4 items-center'>
        {user ? (
          <>
            <span className='text-sm text-gray-600'>{user.name}</span>
            <SignButton showLoginButton={false} />
          </>
        ) : (
          <SignButton showLoginButton />
        )}
      </div>
    </header>
  );
}
