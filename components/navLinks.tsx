'use client';

import {
  Clapperboard,
  Compass,
  Heart,
  Home,
  LinkIcon,
  MessageCircle,
  PlusSquare,
  Search,
} from 'lucide-react';

import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { name: 'Home', href: '/dashboard', icon: Home },
  {
    name: 'Search',
    href: '/dashboard/search',
    icon: Search,
    hideOnMobile: true,
  },
  { name: 'Explore', href: '/dashboard/explore', icon: Compass },
  {
    name: 'Reels',
    href: '/dashboard/reels',
    icon: Clapperboard,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageCircle,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Heart,
    hideOnMobile: true,
  },
  {
    name: 'Create',
    href: '/dashboard/create',
    icon: PlusSquare,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ name, href, icon: Icon, hideOnMobile }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={name}
            href={href}
            className={buttonVariants({
              variant: isActive ? 'secondary' : 'ghost',
              className: cn('navLink', { 'hidden md:flex': hideOnMobile }),
              size: 'lg',
            })}
          >
            <Icon className='w-6' />
            <p
              className={`${cn('hidden lg:block', {
                'font-extrabold': isActive,
              })}`}
            >
              {name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
