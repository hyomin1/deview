import SignButton from './SignButton';

export default function Welcome() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] space-y-6'>
      <h1 className='text-4xl font-bold'>Deview에 오신 것을 환영합니다</h1>
      <p className='text-lg text-gray-600'>개발자들을 위한 공간</p>
      <SignButton showLoginButton />
    </div>
  );
}
