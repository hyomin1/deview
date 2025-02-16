'use client';

import { signIn, signOut } from 'next-auth/react';
import { LogIn, LogOut } from 'lucide-react';

type Props = {
  showLoginButton: boolean;
};

export default function SignButton({ showLoginButton }: Props) {
  return (
    <button
      onClick={showLoginButton ? () => signIn() : () => signOut()}
      className={`
        inline-flex items-center justify-center
        min-w-[120px] px-6 py-2.5
        text-sm font-medium
        rounded-lg transition-colors duration-200
        ${
          showLoginButton
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {showLoginButton ? (
        <>
          <LogIn className='w-4 h-4 mr-2' />
          로그인
        </>
      ) : (
        <>
          <LogOut className='w-4 h-4 mr-2' />
          로그아웃
        </>
      )}
    </button>
  );
}
