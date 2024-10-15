import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          properties: 'Properties',
          about: 'About',
          contact: 'Contact',
          login: 'Log In',
          signup: 'Sign Up',
          where_to_go: 'Where to go?',
          check_in: 'Check-in',
          check_out: 'Check-out',
          guests: 'Guests',
          search: 'Search',
          night: 'night',
          book_now: 'Book Now',
          how_it_works: 'How it works',
          careers: 'Careers',
          investors: 'Investors',
          diversity: 'Diversity',
          accessibility: 'Accessibility',
          invite_friends: 'Invite friends',
          host_home: 'Host your home',
          host_experience: 'Host an experience',
          responsible_hosting: 'Responsible hosting',
          help_center: 'Help Center',
          neighborhood_support: 'Neighborhood Support',
          trust_safety: 'Trust & Safety',
          all_rights_reserved: 'All rights reserved',
        },
      },
      // Add more languages here
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;