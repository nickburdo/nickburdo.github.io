import Header from '@/components/main-layout/Header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen min-w-[768px] flex-col">
      <Header />
      <main className="container mx-auto flex-grow p-8">{children}</main>
    </div>
  );
}
