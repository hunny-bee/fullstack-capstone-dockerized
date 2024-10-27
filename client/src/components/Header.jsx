
"use client";

import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Globe, Menu, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/lib/i18n/useTranslation';
import { SearchContext } from '@/app/layout';

const Header = ({ onSearch }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setSearchParams } = useContext(SearchContext);
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const { t, changeLanguage, locale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    setSearchParams({ location: '', guests: null });
    setLocation('');
    setGuests({ adults: 0, children: 0, infants: 0, pets: 0 });
    router.push('/');
  };

  const locations = [
    'Cape Town', 
    'Johannesburg', 
    'Durban', 
    'Pretoria', 
    'Gqeberha', 
    'Bloemfontein', 
    'East London'
  ];

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Português', code: 'pt' },
    { name: 'Español', code: 'es' },
    { name: 'العربية', code: 'ar' },
    { name: '中文', code: 'zh' },
  ];

  const handleSearch = () => {
    if (location) {
      onSearch?.({ location, guests });
      router.push(`/propertylisting?location=${encodeURIComponent(location)}`);
      setIsSearchOpen(false);
    }
  };

  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setSearchTerm(''); 
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
              onClick={() => {
                const newGuests = { ...guests, [type]: Math.max(0, guests[type] - 1) };
                setGuests(newGuests);
              }}
              disabled={count === 0}
              aria-label={`Decrease number of ${type}`}
            >
              -
            </Button>
            <span className="w-8 text-center">{count}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newGuests = { ...guests, [type]: guests[type] + 1 };
                setGuests(newGuests);
              }}
              aria-label={`Increase number of ${type}`}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const SearchBar = () => (
    <div className="flex items-center space-x-4 bg-background rounded-full shadow-md p-2 max-w-4xl mx-auto">
      <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-[150px] justify-start font-normal">
            <span className="mr-2">{location || 'Where'}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4" align="start">
          <div className="space-y-4">
            <Input
              placeholder={t('searchLocations')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              aria-label="Search location"
            />
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {filteredLocations.length === 0 ? (
                <p className="text-sm text-muted-foreground p-2">{t('noLocationFound')}</p>
              ) : (
                filteredLocations.map((loc) => (
                  <Button
                    key={loc}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleLocationSelect(loc)}
                    aria-label={`Select ${loc} as location`}
                  >
                    {loc}
                  </Button>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="h-6 w-px bg-border" />

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" aria-label="Check-in date">
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
          <Button variant="ghost" aria-label="Check-out date">
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
          <Button variant="ghost" className="w-full justify-start" aria-label="Number of guests">
            <span className="mr-2">
              {Object.values(guests).reduce((a, b) => a + b, 0) > 0
                ? `${Object.values(guests).reduce((a, b) => a + b, 0)} guests`
                : 'Who'}
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
        className="rounded-full bg-primary text-primary-foreground p-2 hover:bg-primary/80 transition duration-300 ease-in-out"
        onClick={handleSearch}
        aria-label="Search properties"
      >
        <Search className="h-6 w-6" />
      </Button>
    </div>
  );

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ?  'bg-white shadow-md py-3 ' : 'bg-white py-4'
    )}>
      <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-4">
      <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
            </svg>
            <span className="ml-2 text-xl font-bold text-primary">StayCation</span>
          </div>
        <SearchBar />
        <nav className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.push('/host')} aria-label={t('hostYourHome')}>
          {t('hostYourHome')}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="hidden md:flex">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
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
              <Menu className="h-5 w-5 mr-2"/>
              <User className="h-5 w-5"  />
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
    </header>
  );
};

export default Header;

