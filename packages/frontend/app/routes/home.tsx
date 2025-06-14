import { Welcome } from '../welcome/welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'NextRep' }, { name: 'description', content: 'Welcome to NextRep' }];
}

export default function Home() {
  return <Welcome />;
}

