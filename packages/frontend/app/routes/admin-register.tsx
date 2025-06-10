import { RegisterForm } from '~/components/auth/register-form';
import { Role } from '~/constants/enums/roles.enum';
import type { Route } from './+types/register';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Register admin' },
    { name: 'description', content: 'Register for an admin account' },
  ];
}

export default function Register() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RegisterForm className="w-full max-w-md" role={Role.ADMIN} />
    </div>
  );
}

