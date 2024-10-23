import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/activities')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-6">Explore Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity._id}>
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2">{activity.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600 mb-2">{activity.description}</CardDescription>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{activity.location}</span>
                <span className="text-sm font-medium">{activity.duration} hours</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50">
              <div className="w-full flex items-center justify-between">
                <span className="text-lg font-bold">${activity.price}</span>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Book Activity
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}