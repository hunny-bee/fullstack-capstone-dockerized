// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

// export default function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); 
//   const [success, setSuccess] = useState(false); 
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess(false);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name, email, password, role: "guest" }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
        
//         localStorage.setItem("token", data.token);
//         console.log("Signup successful");
//         setSuccess(true); 
//         setTimeout(() => {
//           router.push("/"); 
//         }, 3000); 
//       } else {
       
//         setError("An error occurred. Please try again.");
//       }
//     } catch (error) {
      
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#f7f7f7",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "white",
//           padding: "2rem",
//           borderRadius: "8px",
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//           width: "24rem",
//         }}
//       >
//         <h2
//           style={{
//             fontSize: "1.5rem",
//             fontWeight: "600",
//             marginBottom: "1.5rem",
//             textAlign: "center",
//           }}
//         >
//           Sign up for StayCation
//         </h2>

        
//         {error && (
//           <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
//             {error}
//           </p>
//         )}

        
//         {success && (
//           <div
//             style={{
//               textAlign: "center",
//               color: "#4caf50",
//               marginBottom: "1rem",
//             }}
//           >
//             <FontAwesomeIcon icon={faCheckCircle} size="2x" />
//             <p>Congratulations! Your account has been created.</p>
//           </div>
//         )}

        
//         {!success && (
//           <form onSubmit={handleSignup}>
//             <div style={{ marginBottom: "1rem" }}>
//               <label
//                 htmlFor="name"
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                 }}
//               >
//                 Full Name
//               </label>
//               <input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ddd",
//                   borderRadius: "4px",
//                 }}
//               />
//             </div>
//             <div style={{ marginBottom: "1rem" }}>
//               <label
//                 htmlFor="email"
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                 }}
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ddd",
//                   borderRadius: "4px",
//                 }}
//               />
//             </div>
//             <div style={{ marginBottom: "1rem" }}>
//               <label
//                 htmlFor="password"
//                 style={{
//                   display: "block",
//                   marginBottom: "0.5rem",
//                   fontSize: "0.875rem",
//                   fontWeight: "500",
//                 }}
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem",
//                   border: "1px solid #ddd",
//                   borderRadius: "4px",
//                 }}
//               />
//             </div>
//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 padding: "0.75rem",
//                 backgroundColor: "#fadb53",
//                 color: "white",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 border: "none",
//                 fontSize: "1rem",
//                 fontWeight: "600",
//               }}
//             >
//               Sign up
//             </button>
//           </form>
//         )}

        
//         {!success && (
//           <div style={{ marginTop: "1rem", textAlign: "center" }}>
//             <p style={{ fontSize: "0.875rem", color: "#555" }}>
//               Already have an account?{" "}
//               <Link href="/login" style={{ color: "#ff385c", textDecoration: "underline" }}>
//                 Log in
//               </Link>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the correct import for useRouter
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-api-url.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup Successful! You can now log in.");
        router.push('/login'); // Navigate to the login page on successful signup
      } else {
        alert(data.message || "An error occurred. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again."); // Handle any other errors
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f7f7' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', width: '24rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
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
            Sign up
          </button>
        </form>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#555' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#ff385c', textDecoration: 'underline' }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

