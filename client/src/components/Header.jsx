"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Globe, Menu, X, ChevronDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SearchBar from '@/components/SearchBar';

const languages = [
  { code: 'en', name: 'English (US)', region: 'United States' },
  { code: 'en-GB', name: 'English (UK)', region: 'United Kingdom' },
  { code: 'es', name: 'Español', region: 'España' },
  { code: 'fr', name: 'Français', region: 'France' },
  { code: 'de', name: 'Deutsch', region: 'Deutschland' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Home Link */}
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-yellow-400" />
            <span className="font-bold text-2xl text-yellow-400">Staycation</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/stays" className="hover:bg-gray-100 px-3 py-2 rounded-full">Stays</Link>
            <Link href="/experiences" className="hover:bg-gray-100 px-3 py-2 rounded-full">Experiences</Link>
            <Link href="/online-experiences" className="hover:bg-gray-100 px-3 py-2 rounded-full">Online Experiences</Link>
          </nav>

          {/* User, Language, and Staycation Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Staycation Button */}
            <Button variant="outline">Staycation your home</Button>

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{selectedLanguage.code.toUpperCase()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} onSelect={() => setSelectedLanguage(lang)}>
                    <div className="flex flex-col">
                      <span>{lang.name}</span>
                      <span className="text-sm text-gray-500">{lang.region}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Action Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5 mr-2" />
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/signup">Sign up</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Search Bar (Shown Only When Not Scrolled) */}
        {!isScrolled && (
          <div className="mt-4">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white p-4">
          <nav className="flex flex-col space-y-2">
            <Link href="/stays" className="hover:bg-gray-100 px-3 py-2 rounded-full">Stays</Link>
            <Link href="/experiences" className="hover:bg-gray-100 px-3 py-2 rounded-full">Experiences</Link>
            <Link href="/online-experiences" className="hover:bg-gray-100 px-3 py-2 rounded-full">Online Experiences</Link>
            <Button variant="outline" className="justify-start">Staycation your home</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
