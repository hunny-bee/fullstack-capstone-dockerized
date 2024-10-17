'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Globe, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          <span className="text-yellow-500">Stay</span>cation
        </Link>

        <div className="hidden md:flex items-center flex-grow justify-center">
          <div className="flex items-center border rounded-full p-2 shadow-sm hover:shadow-md transition">
            <button className="px-4 font-semibold">Anywhere</button>
            <span className="border-l border-gray-300 h-6"></span>
            <button className="px-4 font-semibold">Any week</button>
            <span className="border-l border-gray-300 h-6"></span>
            <button className="px-4 text-gray-600">Add guests</button>
            <Button variant="primary" size="icon" className="bg-primary text-white rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Staycation your home
          </Button>

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5 mr-2" />
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Sign up</DropdownMenuItem>
              <DropdownMenuItem>Log in</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}