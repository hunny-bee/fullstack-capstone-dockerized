'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

export default function SignUp() {
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/register', formData);
      toast({
        title: t('signUpSuccess'),
        description: t('signUpSuccessMessage'),
      });
      router.push('/sign-in');
    } catch (error) {
      toast({
        title: t('signUpError'),
        description: error.response?.data?.msg || t('generalError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('signUp')}</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4">
          <Input
            name="name"
            type="text"
            placeholder={t('name')}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder={t('email')}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder={t('password')}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('loading') : t('signUp')}
          </Button>
        </div>
      </form>
    </div>
  );
}
