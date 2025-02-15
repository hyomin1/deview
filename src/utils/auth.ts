import { auth } from '@/auth';

export async function checkIsAdmin() {
  const session = await auth();
  return session?.user?.role === 'ADMIN';
}
