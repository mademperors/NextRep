import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  layout('client-layout.tsx', [
    index('routes/home.tsx'),
    route('login', 'routes/login.tsx'),
    route('register', 'routes/register.tsx'),
    route('admin/register', 'routes/admin-register.tsx'),
    route('admin/login', 'routes/admin-login.tsx'),
    route('dashboard', 'routes/dashboard.tsx'),

    ...prefix('profile', [index('routes/profile.tsx'), route('edit', 'routes/edit-profile.tsx')]),

    ...prefix('challenges', [
      index('routes/challenge-list.tsx'),
      route('create', 'routes/create-challenge.tsx'),
      route(':challengeId', 'routes/single-challenge.tsx'),
    ]),

    ...prefix('trainings', [
      // index('routes/training-list.tsx'),
      route('create', 'routes/create-training.tsx'),
    ]),
  ]),
] satisfies RouteConfig;

