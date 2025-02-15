export type UserRole = 'ADMIN' | 'USER';

export type AuthUser = {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: UserRole;
};
