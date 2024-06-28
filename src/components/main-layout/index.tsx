import Header from '@/components/main-layout/Header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col min-w-[768px]">
      <Header />
      <main className="flex-grow container mx-auto p-8">
        { children }
      </main>
    </div>
  );
}
