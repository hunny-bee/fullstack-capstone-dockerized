"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { login } from '@/lib/api';

const LoginPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => { // Removed the TypeScript type
    e.preventDefault();
    setError('');
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(t('Invalid email or password'));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{t('Login')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder={t('Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder={t('Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-yellow-500 mb-4">{error}</p>}
            <Button type="submit" className="w-full">
              {t('Login')}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            {t("Don't have an account?")}{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              {t('Sign up')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
