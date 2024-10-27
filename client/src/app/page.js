// 'use client';

// import { useState, useEffect, useContext } from 'react'; // Add useContext here
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMap } from '@fortawesome/free-solid-svg-icons';
// import 'leaflet/dist/leaflet.css';
// import { properties as allProperties } from '@/data/properties';
// import Homepage from '@/pages/Homepage';
// import PropertyListing from '@/components/PropertyListing';
// import SearchBar from '../components/SearchBar';
// import PropertyCard from '@/components/propertyCard/PropertyCard';
// import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
// import Link from 'next/link';
// import Explore from '@/pages/explore';
// import FloatingMap from './components/Floating/Floating';
// import property from '@/pages/propertylisting';
// import { SearchContext } from './layout';

// export default function Home() {
//   const [filteredProperties, setFilteredProperties] = useState(allProperties);
//   const { searchParams } = useContext(SearchContext); 

//   useEffect(() => {
//     let filtered = allProperties;

//     if (searchParams.location) {
//       filtered = filtered.filter(property =>
//         property.location.toLowerCase().includes(searchParams.location.toLowerCase())
//       );
//     }

//     if (searchParams.guests && Object.values(searchParams.guests).some(count => count > 0)) {
//       const totalGuests = Object.values(searchParams.guests).reduce((sum, count) => sum + count, 0);
//       filtered = filtered.filter(property => property.guests >= totalGuests);
//     }

//     setFilteredProperties(filtered);
//   }, [searchParams]);

//   return (     
//     <LanguageProvider>
//       <div className="w-full mx-auto ">
//         <Homepage />
//         <Link href="/propertylisting"></Link>
        
//         <PropertyListing properties={filteredProperties} />

//         <Explore />
        
//         <FloatingMap />
//         {/* <PropertyCard/> */}
//       </div>
//     </LanguageProvider>
//   );
// }


'use client';

import { useState, useEffect, useContext } from 'react'; // Add useContext here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';
import { properties as allProperties } from '@/data/properties';
import Homepage from '@/pages/Homepage';
import PropertyListing from '@/components/PropertyListing';
import SearchBar from '../components/SearchBar';
import PropertyCard from '@/components/propertyCard/PropertyCard';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import Link from 'next/link';
import Explore from '@/pages/explore';
import FloatingMap from './components/Floating/Floating';
import property from '@/pages/propertylisting';
import { SearchContext } from './layout';

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const { searchParams } = useContext(SearchContext); 

  useEffect(() => {
    let filtered = allProperties;

    if (searchParams.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }

    if (searchParams.guests && Object.values(searchParams.guests).some(count => count > 0)) {
      const totalGuests = Object.values(searchParams.guests).reduce((sum, count) => sum + count, 0);
      filtered = filtered.filter(property => property.guests >= totalGuests);
    }

    setFilteredProperties(filtered);
  }, [searchParams]);

  return (     
    <LanguageProvider>
      <div className="w-full mx-auto ">
        <Homepage />
        <Link href="/propertylisting"></Link>
        
        <PropertyListing properties={filteredProperties} />

        <Explore />
        
        <FloatingMap />
        {/* <PropertyCard/> */}
      </div>
    </LanguageProvider>
  );
}