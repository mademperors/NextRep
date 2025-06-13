import { CreateChallenge } from '~/components/challenge/challenge-create';

export function meta() {
  return [{ title: 'Create Challenge' }, { name: 'description', content: 'Create Challenge' }];
}

export default function CreateChallengePage() {
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <CreateChallenge />
    </div>
  );
}

