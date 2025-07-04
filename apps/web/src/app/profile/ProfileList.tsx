'use client';

import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProfiles } from '@podji/services';
import { validateProfile } from '@podji/schemas';

const PROFILES_PER_PAGE = 10;

export default function ProfileList() {
  // Check if we're running in a browser environment before using hooks
  const isBrowser = typeof window !== 'undefined';

  // Only use React Query if we're in a browser environment
  const queryResult = isBrowser
    ? useInfiniteQuery({
        queryKey: ['profiles'],
        queryFn: async ({ pageParam = 0 }) => {
          const skip = pageParam * PROFILES_PER_PAGE;
          const profilesData = await fetchProfiles(PROFILES_PER_PAGE, skip);

          if ('error' in profilesData) {
            throw new Error(profilesData.error);
          }

          // Validate each profile
          const validatedProfiles = profilesData
            .map((profile: any) => {
              const validationResult = validateProfile(profile);
              if (!validationResult.success) {
                console.warn(`Invalid profile data: ${validationResult.error}`);
                return null;
              }
              return validationResult.data;
            })
            .filter(Boolean); // Filter out null values

          return {
            profiles: validatedProfiles,
            nextPage: validatedProfiles.length === PROFILES_PER_PAGE ? pageParam + 1 : undefined,
          };
        },
        initialPageParam: 0,
        getNextPageParam: lastPage => lastPage.nextPage,
      })
    : {
        data: undefined,
        error: null,
        fetchNextPage: () => {},
        hasNextPage: false,
        isFetchingNextPage: false,
        status: 'loading',
      };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = queryResult;

  // Intersection Observer for infinite scrolling - only run in browser
  useEffect(() => {
    if (!isBrowser) return; // Skip effect during SSR

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    const loadMoreElement = document.getElementById('load-more');
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isBrowser]);

  if (status === 'pending') {
    return (
      <div className="flex justify-center items-center p-8" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading profiles...</span>
      </div>
    );
  }

  if (status === 'error' && error) {
    return (
      <div className="bg-red-100 p-6 rounded-lg shadow-md">
        <p className="text-lg text-red-600">Error loading profiles: {error.message}</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-100 p-6 rounded-lg shadow-md">
        <p className="text-lg text-red-600">Error loading profiles</p>
      </div>
    );
  }

  const profiles = data?.pages.flatMap(page => page.profiles) || [];

  if (profiles.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg">No profiles found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <div key={profile?.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">
              {profile?.firstName} {profile?.lastName}
            </h2>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Age:</span>
              <span>{profile?.age}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 mr-2">Username:</span>
              <span>{profile?.username}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 mr-2">Email:</span>
              <span>{profile?.email}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 mr-2">Phone:</span>
              <span>{profile?.phone}</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-1">Address:</p>
              <p>
                {profile?.address?.address}, {profile?.address?.city}, {profile?.address?.state},{' '}
                {profile?.address?.country}
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-1">Company:</p>
              <p>
                {profile?.company?.name} - {profile?.company?.title}
              </p>
            </div>
            {profile?.image && (
              <div className="mb-4">
                <img
                  src={profile.image}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-[120px] h-[120px] object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load more trigger element */}
      <div id="load-more" className="flex justify-center items-center p-4 mt-8">
        {isFetchingNextPage ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span>Loading more profiles...</span>
          </div>
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-500">No more profiles to load</p>
        )}
      </div>
    </>
  );
}
