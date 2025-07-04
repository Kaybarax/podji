import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationBar as UINavigationBar } from '@podji/mobile-ui';

interface NavigationBarProps {
  title: string;
  showNotification?: boolean;
  showSearch?: boolean;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  showNotification = true,
  showSearch = true,
  onNotificationPress,
  onSearchPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: Math.max(insets.top - 8, 0) }]}>
      <UINavigationBar
        title={title}
        showNotification={showNotification}
        showSearch={showSearch}
        onNotificationPress={onNotificationPress}
        onSearchPress={onSearchPress}
      />
    </View>
  );
};

export default NavigationBar;
