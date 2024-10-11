"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { login, register } from '@/lib/api';

const Auth = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login(email, password);
        localStorage.setItem('token', response.data.token);
      } else {
        await register(username, email, password);
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? t('Login') : t('Register')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              placeholder={t('Username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4"
            />
          )}
          <Input
            type="email"
            placeholder={t('Email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder={t('Password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            {isLogin ? t('Login') : t('Register')}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full"
        >
          {isLogin ? t('Need an account? Register') : t('Already have an account? Login')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Auth;
