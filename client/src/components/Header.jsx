'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Correct import for useRouter in Next.js App Router
import { Menu, X, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter(); // Now correctly imported

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Staycation
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link href="/stays" className="text-gray-600 hover:text-primary">
            Stays
          </Link>
          <Link href="/experiences" className="text-gray-600 hover:text-primary">
            Experiences
          </Link>
          <Link href="/online-experiences" className="text-gray-600 hover:text-primary">
            Online Experiences
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push(router.pathname, router.asPath, { locale: 'en' })}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(router.pathname, router.asPath, { locale: 'es' })}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(router.pathname, router.asPath, { locale: 'fr' })}>
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link href="/stays" className="text-gray-600 hover:text-primary">
              Stays
            </Link>
            <Link href="/experiences" className="text-gray-600 hover:text-primary">
              Experiences
            </Link>
            <Link href="/online-experiences" className="text-gray-600 hover:text-primary">
              Online Experiences
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
