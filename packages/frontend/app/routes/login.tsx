import { LoginForm } from '~/components/login-form';
import { Role } from '~/constants/enums/roles.enum';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Login' }, { name: 'description', content: 'Login to your account' }];
}

export default function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoginForm className="w-full max-w-md" role={Role.MEMBER} />
    </div>
  );
}
