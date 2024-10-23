import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

library.add(faMap, faBed);

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const FloatingMap = () => {
  const [showMap, setShowMap] = useState(false);

  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  return (
    <div>
      <button onClick={handleMapToggle} style={iconButtonStyles}>
        <FontAwesomeIcon icon={faMap} style={smallIconStyles} />
      </button>

      {showMap && <CornerMap onClose={handleMapToggle} />}
    </div>
  );
};

const CornerMap = ({ onClose }) => {
  const [location, setLocation] = useState(null);
  const [fakeHotels, setFakeHotels] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
          generateFakeHotels([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const generateFakeHotels = (location) => {
    const nearbyHotels = [
      { lat: location[0] + 0.0036, lng: location[1] + 0.0045, name: "Hotel A (5 min away)" },
      { lat: location[0] + 0.0036, lng: location[1] - 0.0045, name: "Hotel B (5 min away)" },
    ];

    const hotelsEightMinutesAway = [
      { lat: location[0] + 0.0072, lng: location[1] + 0.009, name: "Hotel C (8 min away)" },
      { lat: location[0] + 0.0072, lng: location[1] - 0.009, name: "Hotel D (8 min away)" },
      { lat: location[0] - 0.0072, lng: location[1] + 0.009, name: "Hotel E (8 min away)" },
      { lat: location[0] - 0.0072, lng: location[1] - 0.009, name: "Hotel F (8 min away)" },
    ];

    const otherHotels = Array.from({ length: 10 }, (_, index) => ({
      lat: location[0] + (Math.random() - 0.5) * 0.1,
      lng: location[1] + (Math.random() - 0.5) * 0.1,
      name: `Hotel ${String.fromCharCode(67 + index)}`, 
    }));

    setFakeHotels([...nearbyHotels, ...hotelsEightMinutesAway, ...otherHotels]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
      });
    }
  }, []);

  const locationIcon = new L.DivIcon({
    className: 'custom-location-icon',
    html: '<span style="color: #ee6b6e;"><i class="fas fa-map-marker-alt" style="font-size: 30px;"></i></span>',
    iconSize: [35, 61],
    iconAnchor: [17, 61],
  });

  const hotelIcon = new L.DivIcon({
    className: 'custom-hotel-icon',
    html: '<span style="color: #000;"><i class="fas fa-bed" style="font-size: 25px;"></i></span>',
    iconSize: [35, 61],
    iconAnchor: [17, 61],
  });

  return (
    <div style={cornerMapStyles}>
      {location ? (
        <MapContainer center={location} zoom={14} style={mapContainerStyles}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location} icon={locationIcon}>
            <Popup>Your current location</Popup>
          </Marker>
          {fakeHotels.map((hotel, index) => (
            <Marker key={index} position={[hotel.lat, hotel.lng]} icon={hotelIcon}>
              <Popup>{hotel.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

const cornerMapStyles = {
  position: 'fixed',
  bottom: '20px',
  left: '80px',
  height: '400px',
  width: '500px',
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
  borderRadius: '8px',
};

const mapContainerStyles = {
  height: '100%',
  width: '100%',
};

const iconButtonStyles = {
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  padding: '10px',
  backgroundColor: '#fadb5e',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: '1000',
};

const smallIconStyles = {
  fontSize: '30px',
};

export default FloatingMap;
