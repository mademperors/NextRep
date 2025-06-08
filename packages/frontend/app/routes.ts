import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  route('admin/register', 'routes/admin-register.tsx'),
  route('admin/login', 'routes/admin-login.tsx'),
] satisfies RouteConfig;
