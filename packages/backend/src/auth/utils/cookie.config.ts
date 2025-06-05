export const cookieConfig = {
  httpOnly: true,
  maxAge: 900000,
  sameSite: 'lax' as const,
  path: '/NextRep/api',
};
