import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

export interface SimpleFeedCardProps {
  title: string;
  creator: string;
  coverImage: ImageSourcePropType;
  likes?: number;
  comments?: number;
  shares?: number;
  isLiked?: boolean;
  onPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onSharePress?: () => void;
  style?: any;
}

export const SimpleFeedCard: React.FC<SimpleFeedCardProps> = ({
  title,
  creator,
  coverImage,
  likes = 0,
  comments = 0,
  shares = 0,
  isLiked = false,
  onPress,
  onLikePress,
  onCommentPress,
  onSharePress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={coverImage} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.creator}>by {creator}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onLikePress}>
            <Text>{isLiked ? '❤️' : '🤍'}</Text>
            <Text style={[styles.actionText, isLiked && styles.likedText]}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
            <Text>💬</Text>
            <Text style={styles.actionText}>{comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
            <Text>🔄</Text>
            <Text style={styles.actionText}>{shares}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export interface SimpleFloatingActionButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  position?: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
  size?: 'small' | 'medium' | 'large';
  style?: any;
}

export const SimpleFloatingActionButton: React.FC<SimpleFloatingActionButtonProps> = ({
  icon,
  onPress,
  position = 'bottomRight',
  size = 'medium',
  style,
}) => {
  const sizeStyles = {
    small: { width: 40, height: 40 },
    medium: { width: 56, height: 56 },
    large: { width: 72, height: 72 },
  };

  const positionStyles = {
    bottomRight: { bottom: 20, right: 20 },
    bottomLeft: { bottom: 20, left: 20 },
    topRight: { top: 20, right: 20 },
    topLeft: { top: 20, left: 20 },
  };

  return (
    <TouchableOpacity
      style={[styles.fab, sizeStyles[size], positionStyles[position], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {typeof icon === 'string' ? <Text style={styles.fabIcon}>{icon}</Text> : <>{icon}</>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  creator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  likedText: {
    color: '#FF7077',
  },
  fab: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    position: 'absolute',
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
  },
});
