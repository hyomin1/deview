export type AuthUser = {
  email?: string | null;
  name?: string | null;
  image?: string | null;
  role?: 'ADMIN' | 'USER';
};
