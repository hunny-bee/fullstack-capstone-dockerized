import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "../../../public/friends getaway.jpg",
    "../../../public/kids fun activities.jpg",
    "../../../public/safari adventure.jpg"
  ];

  useEffect(() => {
    setIsVisible(true);

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ))}

     
      <div className={`relative z-10 text-center text-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-5xl font-bold mb-4">Welcome to StayCation</h1>
        <p className="text-xl mb-8">Escape the ordinary and dive into extraordinary getaways with StayCation! Whether you're craving a thrilling safari adventure, a beachfront paradise, or a chic city stay, we’ve got the perfect place waiting for you. Pack your bags, leave your worries behind, and let the adventure begin!</p>
        <button className="bg-black-500 hover:bg-black-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;