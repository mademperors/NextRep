import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  route('admin/register', 'routes/admin-register.tsx'),
  route('admin/login', 'routes/admin-login.tsx'),

  ...prefix('profile', [index('routes/profile.tsx'), route('edit', 'routes/edit-profile.tsx')]),

  ...prefix('challenges', [
    // index('routes/challenges.tsx'),
    route(':challengeId', 'routes/single-challenge.tsx'),
  ]),
] satisfies RouteConfig;

