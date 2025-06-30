import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar, BottomTabNavigator, FeedCard, FloatingActionButton } from '@podji/mobile-ui';

// Sample data for feed cards
const feedData = [
  {
    id: '1',
    title: 'Summer Vibes Mix',
    creator: 'DJ Sunshine',
    coverImage: { uri: 'https://picsum.photos/id/1/400/200' },
    likes: 120,
    comments: 24,
    shares: 8,
    isLiked: true,
  },
  {
    id: '2',
    title: 'Chill Lounge Beats',
    creator: 'MixMaster',
    coverImage: { uri: 'https://picsum.photos/id/2/400/200' },
    likes: 85,
    comments: 12,
    shares: 5,
    isLiked: false,
  },
  {
    id: '3',
    title: 'Hip Hop Classics',
    creator: 'Beat Wizard',
    coverImage: { uri: 'https://picsum.photos/id/3/400/200' },
    likes: 210,
    comments: 45,
    shares: 18,
    isLiked: false,
  },
  {
    id: '4',
    title: 'Electronic Dance Party',
    creator: 'Techno Queen',
    coverImage: { uri: 'https://picsum.photos/id/4/400/200' },
    likes: 150,
    comments: 30,
    shares: 12,
    isLiked: true,
  },
];

// Tab items for bottom navigation
const tabItems = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'library', label: 'Library', icon: '🎧' },
  { key: 'mix', label: 'Mix', icon: '🎚️' },
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'chat', label: 'Chat', icon: '💬' },
];

const Home = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('home');
  const [refreshing, setRefreshing] = useState(false);

  // Handle tab press
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Handle FAB press
  const handleFabPress = () => {
    // This would navigate to the mixing console or create playlist screen
    console.log('FAB pressed');
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}

      <View style={[{ paddingTop: Math.max(insets.top - 8, 0) }]}>
        <NavigationBar
          title="PodJi"
          showNotification={true}
          showSearch={true}
          onNotificationPress={() => console.log('Notification pressed')}
          onSearchPress={() => console.log('Search pressed')}
        />
      </View>

      {/* Scrollable Feed */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.feedContainer}>
          {feedData.map(item => (
            <FeedCard
              key={item.id}
              title={item.title}
              creator={item.creator}
              coverImage={item.coverImage}
              likes={item.likes}
              comments={item.comments}
              shares={item.shares}
              isLiked={item.isLiked}
              onPress={() => console.log(`Card ${item.id} pressed`)}
              onLikePress={() => console.log(`Like ${item.id} pressed`)}
              onCommentPress={() => console.log(`Comment ${item.id} pressed`)}
              onSharePress={() => console.log(`Share ${item.id} pressed`)}
              style={styles.feedCard}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton 
        icon="🎵" 
        onPress={handleFabPress} 
        position="bottomRight" 
        size="medium"
        style={{ bottom: 84 }} // Raised higher to be above the BottomNavigation footer
      />

      {/* Bottom Tab Navigation */}
      <View style={[{ paddingBottom: Math.max(insets.bottom - 16, 0) }]}>
        <BottomTabNavigator tabs={tabItems} activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  feedContainer: {
    padding: 16,
  },
  feedCard: {
    marginBottom: 16,
  },
});

export default Home;
