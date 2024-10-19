'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineHome, AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';
import CheckIn from '../checkin/CheckIn';
import CheckOut from '../checkout/CheckOut';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.pageYOffset > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed w-full z-20 top-0 left-0 transition-all duration-300 ${isScrolled ? 'shadow-md backdrop-blur bg-white' : 'bg-transparent'}`}>
      
      <div className="h-16 w-full flex items-center justify-between px-8 md:px-20 lg:px-32">
        
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <AiOutlineHome size={30} color="black" />
            <h1 className="text-[#e5d84a] text-2xl font-bold">StayCation</h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/stays" className="text-base font-medium text-black hover:text-gray-700">
            Stays
          </Link>
          <Link href="/experiences" className="text-base font-medium text-black hover:text-gray-700">
            Experiences
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/host" className="hidden md:block text-sm font-medium text-black hover:text-gray-700">
            StayCation your home
          </Link>

          <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer flex items-center gap-2" onClick={toggleDropdown}>
              <AiOutlineMenu size={20} />
              <AiOutlineUser size={24} />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 shadow-lg bg-white rounded-xl w-56 p-4 text-sm text-gray-700 z-50">
                <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100">
                  Sign Up
                </Link>
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Log in
                </Link>
                <hr className="my-2" />
                <Link href="/host" className="block px-4 py-2 hover:bg-gray-100">
                  StayCation your home
                </Link>
                <Link href="/host-experience" className="block px-4 py-2 hover:bg-gray-100">
                  Host an experience
                </Link>
                <Link href="/help" className="block px-4 py-2 hover:bg-gray-100">
                  Help Center
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-center">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm w-11/12 lg:w-2/3 justify-between">
            <input
              type="text"
              placeholder="Search destinations"
              className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-1/3"
            />

            <span className="h-8 border-l border-gray-300 mx-4"></span>

            <CheckIn />
            <span className="h-8 border-l border-gray-300 mx-4"></span>
            <CheckOut />

            <span className="h-8 border-l border-gray-300 mx-4"></span>

            <input
              type="number"
              min="1"
              className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 w-1/6"
              placeholder="Add guests"
            />

            <button className="bg-[#e5d84a] hover:bg-[#e5d84a] rounded-full p-2 ml-2">
              <BiSearch size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
