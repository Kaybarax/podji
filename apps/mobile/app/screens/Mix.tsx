import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingActionButton, NavigationBar, Slider } from '@podji/mobile-ui';
import BottomNavigation from '../components/BottomNavigation';

// Wrapper components to fix TypeScript errors
const MobileSlider = Slider as any;

interface MixProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
}

export const Mix: React.FC<MixProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();

  const handleTabPress = (tabKey?: string) => {
    if (tabKey) {
      onTabPress(tabKey);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <NavigationBar
        title="Mix"
        showNotification={true}
        showSearch={true}
        onNotificationPress={() => console.log('Notification pressed')}
        onSearchPress={() => console.log('Search pressed')}
      />

      {/* Mixing Console */}
      <View style={styles.consoleContainer}>
        {/* Deck A */}
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>Deck A</Text>
          <View style={styles.waveformContainer}>
            {/* Placeholder for waveform */}
            <View style={styles.waveform} />
          </View>
        </View>

        {/* Deck B */}
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>Deck B</Text>
          <View style={styles.waveformContainer}>
            {/* Placeholder for waveform */}
            <View style={styles.waveform} />
          </View>
        </View>

        {/* Crossfader */}
        <View style={styles.crossfaderContainer}>
          <Text style={styles.crossfaderLabel}>Crossfader</Text>
          <MobileSlider minimumValue={-1} maximumValue={1} value={0} onValueChange={() => {}} />
        </View>
      </View>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="▶️"
        onPress={() => console.log('Play pressed')}
        position="bottomRight"
        size="medium"
        style={{ bottom: 84 }} // Raised higher to be above the BottomNavigation footer
      />

      {/* Bottom Tab Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  consoleContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
  },
  deck: {
    flex: 1,
    marginBottom: 16,
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  waveformContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    width: '90%',
    height: 50,
    backgroundColor: '#c0c0c0',
    borderRadius: 4,
  },
  crossfaderContainer: {
    paddingVertical: 16,
  },
  crossfaderLabel: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default Mix;
