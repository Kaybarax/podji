import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProfiles } from '@podji/services';
import { validateProfile } from '@podji/schemas';
import { Link } from 'expo-router';

const PROFILES_PER_PAGE = 10;

interface ProfileListProps {
  HeaderComponent?: React.ComponentType;
}

export default function ProfileList({ HeaderComponent }: ProfileListProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
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
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (status === 'pending') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading profiles...</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading profiles: {error.message}</Text>
      </View>
    );
  }

  const profiles = data?.pages.flatMap((page) => page.profiles) || [];

  if (profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No profiles found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={profiles}
      keyExtractor={(item) => item?.id?.toString() || ""}
      ListHeaderComponent={HeaderComponent}
      renderItem={({ item: profile }) => {
        if (!profile) {
          return null;
        }

        return (
          <View style={styles.profileCard}>
            <Text style={styles.profileName}>{profile.firstName} {profile.lastName}</Text>

            <View style={styles.profileDetail}>
              <Text style={styles.profileLabel}>Age:</Text>
              <Text>{profile.age}</Text>
            </View>

            <View style={styles.profileDetail}>
              <Text style={styles.profileLabel}>Username:</Text>
              <Text>{profile.username}</Text>
            </View>

            <View style={styles.profileDetail}>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text>{profile.email}</Text>
            </View>

            <View style={styles.profileDetail}>
              <Text style={styles.profileLabel}>Phone:</Text>
              <Text>{profile.phone}</Text>
            </View>

            {profile.address && (
              <View style={styles.profileDetail}>
                <Text style={styles.profileLabel}>Address:</Text>
                <Text>{profile.address.address}, {profile.address.city}, {profile.address.state}, {profile.address.country}</Text>
              </View>
            )}

            {profile.company && (
              <View style={styles.profileDetail}>
                <Text style={styles.profileLabel}>Company:</Text>
                <Text>{profile.company.name} - {profile.company.title}</Text>
              </View>
            )}

            {profile.image && (
              <Image 
                source={{ uri: profile.image }} 
                style={styles.profileImage} 
                resizeMode="cover"
              />
            )}
          </View>
        );
      }}
      contentContainerStyle={styles.listContent}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() => (
        <View style={styles.footer}>
          {isFetchingNextPage ? (
            <View style={styles.loadingMore}>
              <ActivityIndicator size="small" color="#3b82f6" />
              <Text style={styles.loadingMoreText}>Loading more profiles...</Text>
            </View>
          ) : hasNextPage ? (
            <TouchableOpacity 
              style={styles.loadMoreButton}
              onPress={() => fetchNextPage()}
            >
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.noMoreText}>No more profiles to load</Text>
          )}

          <Link href="/" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
  },
  emptyContainer: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileDetail: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  profileLabel: {
    color: '#666',
    marginRight: 8,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  loadingMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  loadMoreButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  noMoreText: {
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    marginTop: 16,
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 16,
  },
});
