import { useAuth } from '~/components/auth/AuthProvider';
import type { Route } from '../routes/+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Welcome' }, { name: 'description', content: 'Welcome to NextRep' }];
}

export function Welcome() {
  const { user } = useAuth();

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center min-h-0">
        <header className="flex flex-col items-center">
          <h1 className="text-8xl font-bold font-fugaz">NextRep</h1>
        </header>
        <div className="max-w-[600px] w-full px-4 mt-4">
          <p className="text-center text-2xl font-bold text-gray-700 dark:text-gray-200">
            {user
              ? `Welcome back, ${user.username}!`
              : 'Welcome to NextRep! Please login to continue.'}
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-4 max-w-[600px] w-full px-4">
          <p className="text-center text-lg">
            NextRep is a platform for tracking your fitness progress. It allows you to create
            challenges and track your progress. It also allows you to see your friends progress and
            their ranking.
          </p>
        </div>
      </div>
    </main>
  );
}

