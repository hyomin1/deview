import { UserRole } from '@/models/user';
import 'next-auth';

declare module 'next-auth' {
  interface User {
    role?: UserRole;
  }

  interface Session {
    user?: User;
  }
}
