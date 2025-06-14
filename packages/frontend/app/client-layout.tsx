import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { FullScreenDnaLoader } from './components/ui/dna-loader';

export default function ClientLayout() {
  return (
    <Suspense fallback={<FullScreenDnaLoader />}>
      <Outlet />
    </Suspense>
  );
}

