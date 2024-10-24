// "use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(''); 
//   const router = useRouter();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

    
//     if (email === "test@example.com" && password === "password") {
//       alert("Login Successful! Welcome back!");
//       router.push('/');
//     } else {
//       setError("An error occurred. Please try again."); 
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#f7f7f7',
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: 'white',
//           padding: '2rem',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//           width: '24rem',
//         }}
//       >
//         <h2
//           style={{
//             fontSize: '1.5rem',
//             fontWeight: '600',
//             marginBottom: '1.5rem',
//             textAlign: 'center',
//           }}
//         >
//           Log in to Staycation
//         </h2>

        
//         {error && (
//           <p
//             style={{
//               color: 'red',
//               textAlign: 'center',
//               marginBottom: '1rem',
//             }}
//           >
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleLogin}>
//           <div style={{ marginBottom: '1rem' }}>
//             <label
//               htmlFor="email"
//               style={{
//                 display: 'block',
//                 marginBottom: '0.5rem',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//               }}
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: '1rem' }}>
//             <label
//               htmlFor="password"
//               style={{
//                 display: 'block',
//                 marginBottom: '0.5rem',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//               }}
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: '0.75rem',
//                 border: '1px solid #ddd',
//                 borderRadius: '4px',
//               }}
//             />
//           </div>
//           <button
//             type="submit"
//             style={{
//               width: '100%',
//               padding: '0.75rem',
//               backgroundColor: '#fadb5e',
//               color: 'white',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               border: 'none',
//               fontSize: '1rem',
//               fontWeight: '600',
//             }}
//           >
//             Log in
//           </button>
//         </form>

//         <div style={{ marginTop: '1rem', textAlign: 'center' }}>
//           <p style={{ fontSize: '0.875rem', color: '#555' }}>
//             Don't have an account?{' '}
//             <Link href="/signup" style={{ color: '#ff385c', textDecoration: 'underline' }}>
//               Sign up
//             </Link>
//           </p>
//         </div>

       
//         <div style={{ marginTop: '1rem', textAlign: 'center' }}>
//           <p style={{ fontSize: '0.875rem', color: '#555' }}>
//             <Link href="/" style={{ color: '#fadb5e', textDecoration: 'underline' }}>
//               Back to Homepage
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for the router
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        alert("Login Successful! Welcome back!");
        router.push('/'); // Navigate to home page on successful login
      } else {
        alert(data.message || "An error occurred. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again."); // Handle any other errors
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f7f7' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '24rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Log in to Staycation</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#fadb5e', color: 'white', borderRadius: '4px', cursor: 'pointer', border: 'none', fontSize: '1rem', fontWeight: '600' }}>
            Log in
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#555' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#ff385c', textDecoration: 'underline' }}>
              Sign up
            </Link>
          </p>
          <p style={{ fontSize: '0.875rem', color: '#555' }}>
            <Link href="/forgot-password" style={{ color: '#ff385c', textDecoration: 'underline' }}>
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

