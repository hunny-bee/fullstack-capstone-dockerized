// Marking this component as a Client Component
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default function PropertyListing() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties from API
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    // Implement API call to fetch properties
    // For now, we'll use dummy data
    const dummyProperties = [
      {
        id: 1,
        title: 'Cozy Beachfront Cottage',
        description: 'Relax in this charming cottage with stunning ocean views.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
      },
      {
        id: 2,
        title: 'Modern City Apartment',
        description: 'Stylish apartment in the heart of the city.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      },
      {
        id: 3,
        title: 'Mountain Retreat Cabin',
        description: 'Escape to nature in this secluded mountain cabin.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      },{
        id: 4,
        title: 'Luxury Penthouse Suite',
        description: 'Experience ultimate luxury in this top-floor penthouse.',
        price: 300,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      },
      {
        id: 5,
        title: 'Rustic Farmhouse Getaway',
        description: 'Enjoy the countryside in this charming renovated farmhouse.',
        price: 140,
        image: 'https://images.unsplash.com/photo-1505916349660-8d91a99c3e23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      },
      {
        id: 6,
        title: 'Seaside Villa',
        description: 'Luxurious villa with private beach access and panoramic views.',
        price: 250,
        image: 'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      },
      {
        id: 7,
        title: 'Urban Loft',
        description: 'Trendy loft in a converted warehouse with artistic vibes.',
        price: 130,
        image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
      },
      {
        id: 8,
        title: 'Treehouse Adventure',
        description: 'Unique treehouse experience surrounded by nature.',
        price: 160,
        image: 'https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      },
      {
        id: 9,
        title: 'Historic Downtown Apartment',
        description: 'Charming apartment in a restored historic building.',
        price: 110,
        image: 'https://images.unsplash.com/photo-1529408686214-b48b8532f72c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      },
    ];
    setProperties(dummyProperties);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id}>
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription>{property.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-md" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-lg font-semibold">${property.price} / {t('night')}</span>
            <Button>{t('book_now')}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
