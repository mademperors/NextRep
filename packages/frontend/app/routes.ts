import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  layout('client-layout.tsx', [
    route('login', 'routes/login.tsx'),
    route('register', 'routes/register.tsx'),
    route('admin/register', 'routes/admin-register.tsx'),
    route('admin/login', 'routes/admin-login.tsx'),
    route('dashboard', 'routes/dashboard.tsx'),

    ...prefix('profile', [
      index('routes/profile.tsx'),
      route('edit', 'routes/edit-profile.tsx'),
      route(':username', 'routes/profile-friends.tsx'),
    ]),

    ...prefix('challenges', [
      index('routes/challenge-list.tsx'),
      route('create', 'routes/create-challenge.tsx'),
      route(':challengeId', 'routes/single-challenge.tsx'),
      route(':challengeId/edit', 'routes/edit-challenge.tsx'),
    ]),

    ...prefix('trainings', [
      // index('routes/training-list.tsx'),
      route('create', 'routes/create-training.tsx'),
    ]),

    ...prefix('friends', [
      index('routes/friends.tsx'),
      route('add', 'routes/add-friend.tsx'),
      route('requests', 'routes/friend-requests.tsx'),
    ]),

    ...prefix('diet', [index('routes/diet.tsx')]),
  ]),
] satisfies RouteConfig;

