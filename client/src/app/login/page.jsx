"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Logging in with:', { email, password });
    alert("Login Successful! Welcome back!");
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={() => router.push('/signup')}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: 'transparent', border: '1px solid #007bff', borderRadius: '4px', color: '#007bff', cursor: 'pointer' }}
            >
              Sign Up
            </button>
            <button
              type="submit"
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
