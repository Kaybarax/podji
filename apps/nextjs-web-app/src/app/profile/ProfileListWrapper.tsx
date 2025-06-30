'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the client component with dynamic import to avoid SSR
const ProfileList = dynamic(() => import('./ProfileList'), { ssr: false });

/**
 * ProfileListWrapper component
 *
 * This is a client component wrapper for the ProfileList component.
 * It handles the dynamic import with ssr: false, which is not allowed in Server Components.
 */
export default function ProfileListWrapper() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center p-8" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading profiles...</span>
      </div>
    }>
      <ProfileList />
    </Suspense>
  );
}