
'use client';

import { useEffect, useState } from 'react';
import properties from '@/data/property';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PropertyListingPage = () => {
    const router = useRouter();
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const locationParam = new URLSearchParams(window.location.search).get('location');

        const fetchProperties = () => {
            if (!Array.isArray(properties)) {
                setError("Error: properties data is not available.");
                setLoading(false);
                return;
            }

            const results = properties.filter((property) =>
                property.location?.toLowerCase() === locationParam?.toLowerCase()
            );

            setFilteredProperties(results.length > 0 ? results : []);
            setLoading(false);
        };

        if (locationParam) {
            fetchProperties();
        } else {
            setError("No location specified");
            setLoading(false);
        }
    }, []);

    if (loading) return <div>Loading properties...</div>;
    if (error) return <div>{error}</div>;

    return (

        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Search Results:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProperties.map((property) => (
                    <Card
                        key={property.id}
                        className="max-w-sm rounded-lg shadow-md bg-white transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer"
                         onClick={() => router.push(`/property/${property.id}`)}
                    >
                        <CardContent className="p-0 relative">
                            <div className="relative w-full h-48">
                                <Image
                                    src={property.images[0]}
                                    alt={property.title}
                                    width={300}
                                    height={200}
                                    className="object-cover w-full h-full rounded-t-lg"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 text-gray-800 hover:bg-gray-300 rounded-full"
                                >
                                    <Heart className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 flex flex-col">
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-semibold">{property.rating}</span>
                                <span className="text-gray-600">({property.reviews} reviews)</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                            <p className="text-lg font-semibold">
                                <span className="text-lg">{property.currency}{property.price}</span> / night
                            </p>
                        </CardFooter>
                    </Card>
                ))}
                {filteredProperties.length === 0 && !loading && (
                    <div>No properties found in this location.</div>
                )}
            </div>
        </div>
    );
};

export default PropertyListingPage;

