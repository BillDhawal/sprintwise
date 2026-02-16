'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/create', label: 'Create Plan' },
  { href: '/create?gift=true', label: 'Gift a Plan' },
  { href: '/how-it-works', label: 'How It Works' },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isGiftMode = searchParams?.get('gift') === 'true';

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-border-light print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-semibold text-text-primary hover:text-accent-primary transition-colors"
          >
            Sprintwise
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === '/create' && pathname?.startsWith('/create') && !isGiftMode) ||
                (link.href === '/create?gift=true' && pathname?.startsWith('/create') && isGiftMode);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-design-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-canvas'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
