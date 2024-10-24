"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Globe, Menu, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/lib/i18n/useTranslation';


const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const { t, changeLanguage, locale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'];
  
  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Português', code: 'pt' },
    { name: 'Español', code: 'es' },
    { name: 'العربية', code: 'ar' },
    { name: '中文', code: 'zh' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  const GuestSelector = () => (
    <div className="space-y-4">
      {['adults', 'children', 'infants', 'pets'].map((type) => (
        <div key={type} className="flex items-center justify-between">
          <span className="capitalize">{type}</span>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))}
            >
              -
            </Button>
            <span>{guests[type]}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }))}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const SearchBar = ({ expanded = false }) => (
    <div className={cn(
      'flex items-center space-x-4 bg-background rounded-full shadow-md p-2',
      expanded ? 'w-full max-w-4xl mx-auto' : ''
    )}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            <span className="mr-2">Where</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a continent" />
            </SelectTrigger>
            <SelectContent>
              {continents.map((continent) => (
                <SelectItem key={continent} value={continent.toLowerCase()}>
                  {continent}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
      <div className="h-6 w-px bg-border" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            {checkInDate ? checkInDate.toLocaleDateString() : 'Check in'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
        </PopoverContent>
      </Popover>
      <div className="h-6 w-px bg-border" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            {checkOutDate ? checkOutDate.toLocaleDateString() : 'Check out'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
        </PopoverContent>
      </Popover>
      <div className="h-6 w-px bg-border" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            <span className="mr-2">Who</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4">
          <GuestSelector />
        </PopoverContent>
      </Popover>
      <Button    size="icon" 
        className="rounded-full bg-primary text-primary-foreground p-2 hover:bg-primary/80 transition duration-300 ease-in-out">
       <Search className="h-6 w-6" />
      </Button>
    </div>
  );

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center transition-all duration-300',
          isScrolled ? 'flex-col space-y-4 md:flex-row md:space-y-0 md:justify-between' : 'justify-between'
        )}>
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/')}>
            <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
            <span className="ml-2 text-xl font-bold text-primary">StayCation</span>
          </div>

          {!isScrolled && pathname === '/' && <SearchBar />}

          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleNavigation('/host')}>
              StayCation your home
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => console.log(`Changed to ${lang.name}`)}>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">
                  <Menu className="h-5 w-5 mr-2" />
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleNavigation('/signup')}>Sign up</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/login')}>Log in</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/host')}>StayCation your home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {isScrolled && pathname === '/' && (
          <div className="flex justify-center mt-4">
            <SearchBar expanded />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;