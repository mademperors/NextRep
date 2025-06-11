import { CreateChallenge } from '~/components/challenge/challenge-create';

export function meta() {
  return [{ title: 'Create Challenge' }, { name: 'description', content: 'Create Challenge' }];
}

export default function CreateChallengePage() {
  return <CreateChallenge />;
}

