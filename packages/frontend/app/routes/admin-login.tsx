import { LoginForm } from '~/components/auth/login-form';
import { Role } from '~/constants/enums/roles.enum';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login admin' },
    { name: 'description', content: 'Login to your admin account' },
  ];
}

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginForm className="w-full max-w-md" role={Role.ADMIN} />
    </div>
  );
}

