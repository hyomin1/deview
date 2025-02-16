import SignButton from './SignButton';

export default function Welcome() {
  return (
    <main className='min-h-[80vh] flex items-center justify-center bg-white px-4'>
      <div className='max-w-2xl w-full text-center space-y-8'>
        <div className='space-y-3'>
          <h1 className='text-4xl font-bold text-gray-900 tracking-tight'>
            Deview에 오신 것을 환영합니다
          </h1>
        </div>

        <div className='pt-4'>
          <SignButton showLoginButton />
        </div>
      </div>
    </main>
  );
}
