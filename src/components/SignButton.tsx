'use client';

import { signIn, signOut } from 'next-auth/react';

type Props = {
  showLoginButton: boolean;
};

export default function SignButton({ showLoginButton }: Props) {
  return (
    <button
      onClick={showLoginButton ? () => signIn() : () => signOut()}
      className={
        showLoginButton
          ? 'px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700' // 로그인 버튼 스타일
          : 'px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50' // 로그아웃 버튼 스타일
      }
    >
      {showLoginButton ? '로그인' : '로그아웃'}
    </button>
  );
}
