'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Globe, Menu, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/lib/i18n/useTranslation';

const Header = ({ onSearch }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, changeLanguage, locale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const locations = [
    'Malibu, California',
    'Aspen, Colorado',
    'New York City, New York',
    'Portland, Oregon',
    'Santa Cruz, California',
    'Lake Tahoe, California',
    'Scottsdale, Arizona',
    'Napa Valley, California',
    'Newport, Rhode Island',
    'Seattle, Washington'
  ];

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Português', code: 'pt' },
    { name: 'Español', code: 'es' },
    { name: 'العربية', code: 'ar' },
    { name: '中文', code: 'zh' },
  ];

  const handleSearch = () => {
    onSearch({
      location,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests
    });
    setIsSearchOpen(false);
  };

  const GuestSelector = () => (
    <div className="space-y-4">
      {Object.entries(guests).map(([type, count]) => (
        <div key={type} className="flex items-center justify-between">
          <div>
            <p className="capitalize font-medium">{type}</p>
            <p className="text-sm text-muted-foreground">
              {type === 'infants' ? 'Under 2 years' : type === 'children' ? '2-12 years' : type === 'pets' ? 'Bringing a service animal?' : 'Age 13+'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }))}
              disabled={count === 0}
            >
              -
            </Button>
            <span className="w-8 text-center">{count}</span>
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
      'flex items-center space-x-4 bg-white rounded-full border shadow-sm p-2',
      expanded ? 'w-full max-w-4xl mx-auto' : ''
    )}>
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-[200px] justify-start font-normal">
            <span className="mr-2">{t('where')}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder={t('searchLocations')} />
            <CommandEmpty>{t('noLocationFound')}</CommandEmpty>
            <CommandGroup>
              {locations.map((loc) => (
                <CommandItem
                  key={loc}
                  onSelect={() => {
                    setLocation(loc);
                    handleSearch();
                  }}
                >
                  {loc}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="h-6 w-px bg-border" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-[150px] justify-start font-normal">
            {checkInDate ? checkInDate.toLocaleDateString() : t('checkIn')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkInDate}
            onSelect={(date) => {
              setCheckInDate(date);
              handleSearch();
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="h-6 w-px bg-border" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-[150px] justify-start font-normal">
            {checkOutDate ? checkOutDate.toLocaleDateString() : t('checkOut')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={checkOutDate}
            onSelect={(date) => {
              setCheckOutDate(date);
              handleSearch();
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="h-6 w-px bg-border" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-[200px] justify-start font-normal">
            <span className="mr-2">
              {Object.values(guests).reduce((a, b) => a + b, 0) > 0
                ? `${Object.values(guests).reduce((a, b) => a + b, 0)} ${t('guests')}`
                : t('who')}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4">
          <GuestSelector />
        </PopoverContent>
      </Popover>

      <Button 
        size="icon" 
        className="rounded-full bg-primary text-primary-foreground"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background shadow-md py-4' : 'bg-background py-6'
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center transition-all duration-300',
          isScrolled ? 'flex-col space-y-4 md:flex-row md:space-y-0 md:justify-between' : 'justify-between'
        )}>
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
            <span className="ml-2 text-xl font-bold text-primary">StayCation</span>
          </div>

          {!isScrolled && pathname === '/' && <SearchBar />}

          <nav className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push('/host')}>
              {t('hostYourHome')}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onClick={() => changeLanguage(lang.code)}>
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
                <DropdownMenuItem onClick={() => router.push('/signup')}>{t('signUp')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/login')}>{t('logIn')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/host')}>{t('hostYourHome')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/host-experience')}>{t('hostExperience')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/help')}>{t('helpCenter')}</DropdownMenuItem>
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