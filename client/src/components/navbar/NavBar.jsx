"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Globe, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            Staycation
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/listings">
              <Button variant="ghost">{t('Listings')}</Button>
            </Link>
            <Input
              type="text"
              placeholder={t('Search')}
              className="w-64"
              icon={<Search className="h-4 w-4" />}
            />
            <Link href="/listings/create">
              <Button variant="ghost">{t('Become a host')}</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/profile">{t('Profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>{t('Logout')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{t('Login')}</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="ghost">{t('Sign Up')}</Button>
                </Link>
              </>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link href="/listings">
              <Button variant="ghost" className="w-full mb-2">{t('Listings')}</Button>
            </Link>
            <Input
              type="text"
              placeholder={t('Search')}
              className="w-full mb-4"
              icon={<Search className="h-4 w-4" />}
            />
            <Link href="/listings/create">
              <Button variant="ghost" className="w-full mb-2">{t('Become a host')}</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full mb-2">
                  {t('Language')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {isLoggedIn ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" className="w-full mb-2">{t('Profile')}</Button>
                </Link>
                <Button variant="ghost" className="w-full mb-2" onClick={handleLogout}>{t('Logout')}</Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="w-full mb-2">{t('Login')}</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="ghost" className="w-full mb-2">{t('Sign Up')}</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;