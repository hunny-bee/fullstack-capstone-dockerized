"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from API or local storage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile logic here
    console.log('Update profile', user);
  };

  if (!user) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('Your Profile')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('Edit Profile')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t('Username')}
              </label>
              <Input
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('Email')}
              </label>
              <Input
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button type="submit">{t('Update Profile')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
