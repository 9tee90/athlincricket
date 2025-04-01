'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface ChallengesLayoutProps {
  children: React.ReactNode;
}

export default function ChallengesLayout({ children }: ChallengesLayoutProps) {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
} 