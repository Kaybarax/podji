import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown, Modal, Slider, TextInput } from '@podji/mobile-ui';
import NavigationBar from '../components/NavigationBar';
import BottomNavigation from '../components/BottomNavigation';

// Define track interface
interface Track {
  id: string;
  title: string;
  artist: string;
  coverArt: { uri: string };
  duration: string;
  bpm: number;
}

interface TrackItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
}

// Extracted TrackItem component
const TrackItem: React.FC<TrackItemProps> = ({ track, onTrackSelect }) => {
  const handleTrackPress = () => onTrackSelect(track);

  return (
    <TouchableOpacity onPress={handleTrackPress}>
      <View style={styles.trackCard}>
        <View style={styles.trackInfo}>
          <View style={styles.coverArt}>
            <View
              style={[
                styles.coverArtPlaceholder,
                { backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16) },
              ]}
            />
          </View>
          <View style={styles.trackDetails}>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackArtist}>{track.artist}</Text>
            <View style={styles.trackMetadata}>
              <Text style={styles.trackDuration}>{track.duration}</Text>
              <Text style={styles.trackBpm}>{track.bpm} BPM</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.quickAddButton} onPress={handleTrackPress}>
            <Text style={styles.quickAddButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.waveformContainer}>
          {/* @ts-ignore - React version mismatch with mobile-ui */}
          <Slider value={0.5} minimumValue={0} maximumValue={1} onValueChange={() => {}} disabled={true} />
          <TouchableOpacity style={styles.previewButton}>
            <Text style={styles.previewButtonText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Sample data for track listings
const trackData = [
  {
    id: '1',
    title: 'Summer Vibes',
    artist: 'DJ Sunshine',
    coverArt: { uri: 'https://picsum.photos/id/1/100/100' },
    duration: '3:45',
    bpm: 128,
  },
  {
    id: '2',
    title: 'Chill Lounge',
    artist: 'MixMaster',
    coverArt: { uri: 'https://picsum.photos/id/2/100/100' },
    duration: '4:20',
    bpm: 110,
  },
  {
    id: '3',
    title: 'Hip Hop Classic',
    artist: 'Beat Wizard',
    coverArt: { uri: 'https://picsum.photos/id/3/100/100' },
    duration: '3:15',
    bpm: 95,
  },
  {
    id: '4',
    title: 'Electronic Dance',
    artist: 'Techno Queen',
    coverArt: { uri: 'https://picsum.photos/id/4/100/100' },
    duration: '5:10',
    bpm: 140,
  },
  {
    id: '5',
    title: 'Jazz Fusion',
    artist: 'Smooth Operator',
    coverArt: { uri: 'https://picsum.photos/id/5/100/100' },
    duration: '6:30',
    bpm: 85,
  },
  {
    id: '6',
    title: 'Rock Anthem',
    artist: 'Guitar Hero',
    coverArt: { uri: 'https://picsum.photos/id/6/100/100' },
    duration: '4:45',
    bpm: 120,
  },
];

// Filter options
const filterOptions = [
  { label: 'Artist', value: 'artist' },
  { label: 'Genre', value: 'genre' },
  { label: 'BPM', value: 'bpm' },
];

interface LibraryProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
}

const Library: React.FC<LibraryProps> = ({ activeTab, onTabPress }) => {
  const [searchText, setSearchText] = useState('');
  const [filterBy, setFilterBy] = useState('artist');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleSetFilterBy = (value: string | number) => {
    setFilterBy(value as string);
  };

  // Handle track selection
  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setShowActionSheet(true);
  };

  // Handle add to playlist
  const handleAddToPlaylist = () => {
    console.log('Add to playlist:', selectedTrack);
    setShowActionSheet(false);
  };

  // Handle add to queue
  const handleAddToQueue = () => {
    console.log('Add to queue:', selectedTrack);
    setShowActionSheet(false);
  };

  // Handle tab press
  const handleTabPress = (tabKey?: string) => {
    if (tabKey) {
      onTabPress(tabKey);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <NavigationBar
        title="Library"
        showNotification={true}
        showSearch={true}
        onNotificationPress={() => console.log('Notification pressed')}
        onSearchPress={() => console.log('Search pressed')}
      />

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        {/* @ts-ignore - React version mismatch with mobile-ui */}
        <TextInput
          placeholder="Search tracks, artists, albums..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        {/* @ts-ignore - React version mismatch with mobile-ui */}
        <Dropdown
          items={filterOptions}
          selectedValue={filterBy}
          onValueChange={handleSetFilterBy}
          placeholder="Filter by"
          width={156}
        />
      </View>

      {/* Track Listing */}
      <ScrollView style={styles.trackList}>
        {trackData.map(track => (
          <TrackItem key={track.id} track={track} onTrackSelect={handleTrackSelect} />
        ))}
      </ScrollView>

      {/* Action Sheet Modal */}
      {/* @ts-ignore - React version mismatch with mobile-ui */}
      <Modal visible={showActionSheet} onClose={() => setShowActionSheet(false)}>
        <View style={styles.actionSheet}>
          <Text style={styles.actionSheetTitle}>Track Options</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddToPlaylist}>
            <Text style={styles.actionButtonText}>Add to Playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddToQueue}>
            <Text style={styles.actionButtonText}>Add to Queue</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Bottom Tab Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 24,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  trackList: {
    flex: 1,
    padding: 16,
  },
  trackCard: {
    marginBottom: 16,
    padding: 12,
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverArt: {
    width: 60,
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  coverArtPlaceholder: {
    width: '100%',
    height: '100%',
  },
  trackDetails: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackArtist: {
    fontSize: 14,
    color: '#666',
  },
  trackMetadata: {
    flexDirection: 'row',
    marginTop: 4,
  },
  trackDuration: {
    fontSize: 12,
    color: '#888',
    marginRight: 8,
  },
  trackBpm: {
    fontSize: 12,
    color: '#888',
  },
  quickAddButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  waveformContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 24,
  },
  previewButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  previewButtonText: {
    color: 'white',
    fontSize: 12,
  },
  actionSheet: {
    padding: 16,
  },
  actionSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButton: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Library;
