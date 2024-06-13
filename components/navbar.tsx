'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navItems } from '@/config/site';
import { cn } from '@/lib/utils';

import { ModeToggle } from './toggle';
import { Button } from './ui/button';

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className='hidden border-b md:grid'>
      <nav className='mx-auto flex w-full max-w-[1440px] items-center gap-x-28 py-3 pr-24'>
        <h1 className='text-2xl font-medium text-primary'>
          <Link href='/'>Gharpeti</Link>
        </h1>
        <ul className='flex items-center space-x-8'>
          {navItems.map((item) => (
            <li
              className=''
              key={item.name}
            >
              <Link
                className={cn(
                  'px-3 py-2 text-sm font-medium',
                  item.href === pathname && 'rounded-md bg-primary text-white'
                )}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className='ml-auto flex items-center space-x-6'>
          <Link href='/login'>
            <Button
              size='sm'
              variant='outline'
            >
              Login
            </Button>
          </Link>

          <Link href='/register'>
            <Button size='sm'>Signup</Button>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
