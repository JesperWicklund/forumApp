"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/firebase'; // Ensure you have configured Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Header from "@/components/layout/Header";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the username in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        userName: username,
        email: user.email,
        UserUID: user.uid
      });

      setSuccess("User registered successfully!");
      setError("");
      router.push("/"); // Redirect to home page or another page
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("User already exists.");
      } else {
        setError("Failed to register user");
      }
      setSuccess("");
    }
  };

  

  return (
    <div className="mx-auto container">
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Username:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Password:</label>
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;