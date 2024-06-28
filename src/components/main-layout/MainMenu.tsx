'use client';
import { mainMenuItems } from '@/components/main-layout/mainMenuItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainMenu() {
  const pathname = usePathname();
  const isActive = (path: string, hasChildren: boolean) =>
    hasChildren ? pathname.startsWith(path) : path === pathname;
  return (
    <nav className="flex gap-4">
      {mainMenuItems.map(({ title, href, hasChildren}) => (
        <Link key={title} href={href} className={isActive(href, hasChildren) ? 'bg-white text-sky-800 rounded-full px-4 py-2 font-semibold' : ' px-4 py-2 font-semibold'}>
          {title}
        </Link>
      ))}
    </nav>
  );
}
