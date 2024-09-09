'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Header from '@/components/layout/Header';
import { useRouter } from 'next/navigation';


function CreateThreadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [creator, setCreator] = useState('');
  const [locked, setLocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCreator(user.uid);
      } else {
        console.log('User is not logged in');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newThread = {
      title,
      description,
      category,
      creator,
      creationDate: new Date().toISOString(),
      locked,
    };
    try {
      await addDoc(collection(db, 'threads'), newThread);
      console.log('Document successfully written!');
      setTitle('');
      setDescription('');
      setCategory('');
      router.push('/');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create a New Thread</h1>
        {/* {!creator && (
          <p className="text-red-500 mb-4">You need to log in to create a New Thread</p>
        )} */}
        {
         creator ? 
         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">Title</label>
           <input
             type="text"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
             required
      
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">Description</label>
           <textarea
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
             required
             rows={4}
           
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">Category</label>
           <input
             type="text"
             value={category}
             onChange={(e) => setCategory(e.target.value)}
             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
             required
           
           />
         </div>
         <button
           type="submit"
           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
         >
           Create New Thread
         </button>
       </form> : <p className="text-red-500 mb-4 text-center">You need to log in to create a New Thread</p>
        }
        
      </div>
    </div>
  );
}

export default CreateThreadPage;