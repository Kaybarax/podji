import React from 'react';
import Link from 'next/link';
import ProfileListWrapper from './ProfileListWrapper';

/**
 * ProfilePage component
 *
 * This is the main profile page route that will display fetched user images and data.
 * This page uses a client component with React Query to fetch and display profiles with infinite scrolling.
 */
export default function ProfilePage() {
  // Use a client component for React Query

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Profiles</h1>
        <p className="text-gray-600">View user profiles and their information</p>
      </header>

      <main className="flex flex-col gap-8">
        {/* ProfileListWrapper handles the dynamic import and Suspense */}
        <ProfileListWrapper />

        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4">
          &larr; Back to Home
        </Link>
      </main>
    </div>
  );
}
