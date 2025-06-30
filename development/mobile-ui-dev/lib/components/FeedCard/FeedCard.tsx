// @ts-ignore
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { getMobileTheme } from '@podji/design-tokens';

export interface FeedCardProps {
  /**
   * Title of the mix
   */
  title: string;
  /**
   * Creator of the mix
   */
  creator: string;
  /**
   * Cover image for the mix
   */
  coverImage: ImageSourcePropType;
  /**
   * Number of likes
   */
  likes?: number;
  /**
   * Number of comments
   */
  comments?: number;
  /**
   * Number of shares
   */
  shares?: number;
  /**
   * Is the mix liked by the current user
   */
  isLiked?: boolean;
  /**
   * Card press handler
   */
  onPress?: () => void;
  /**
   * Like press handler
   */
  onLikePress?: () => void;
  /**
   * Comment press handler
   */
  onCommentPress?: () => void;
  /**
   * Share press handler
   */
  onSharePress?: () => void;
  /**
   * Additional style
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Feed card component for displaying mixes in the home screen
 */
export const FeedCard = ({
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
}: FeedCardProps) => {
  const [themeStyles, setThemeStyles] = useState({
    container: {},
    coverImage: {},
    contentContainer: {},
    title: {},
    creator: {},
    actionsContainer: {},
    actionButton: {},
    actionText: {},
    likedText: {},
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await getMobileTheme();
        setThemeStyles({
          container: {
            backgroundColor: theme.light.color.semantic.background.surface,
            borderRadius: theme.light.borderRadius.md,
            shadowColor: theme.light.color.primitive.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            marginBottom: theme.light.spacing.md,
            overflow: 'hidden',
          },
          coverImage: {
            width: '100%',
            height: 200,
            resizeMode: 'cover',
          },
          contentContainer: {
            padding: theme.light.spacing.md,
          },
          title: {
            fontSize: theme.light.typography.fontSize.lg,
            fontWeight: theme.light.typography.fontWeight.bold,
            color: theme.light.color.semantic.text.primary,
            marginBottom: theme.light.spacing.xs,
          },
          creator: {
            fontSize: theme.light.typography.fontSize.md,
            color: theme.light.color.semantic.text.secondary,
            marginBottom: theme.light.spacing.md,
          },
          actionsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderTopColor: theme.light.color.semantic.border.base,
            paddingTop: theme.light.spacing.md,
          },
          actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          actionText: {
            marginLeft: theme.light.spacing.xs,
            fontSize: theme.light.typography.fontSize.sm,
            color: theme.light.color.semantic.text.secondary,
          },
          likedText: {
            color: theme.light.color.theme.secondary,
          },
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    loadTheme();
  }, []);

  return (
    <TouchableOpacity style={[themeStyles.container, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={coverImage} style={themeStyles.coverImage} />
      <View style={themeStyles.contentContainer}>
        <Text style={themeStyles.title}>{title}</Text>
        <Text style={themeStyles.creator}>by {creator}</Text>
        <View style={themeStyles.actionsContainer}>
          <TouchableOpacity style={themeStyles.actionButton} onPress={onLikePress}>
            <Text>{isLiked ? '❤️' : '🤍'}</Text>
            <Text style={[themeStyles.actionText, isLiked && themeStyles.likedText]}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themeStyles.actionButton} onPress={onCommentPress}>
            <Text>💬</Text>
            <Text style={themeStyles.actionText}>{comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={themeStyles.actionButton} onPress={onSharePress}>
            <Text>🔄</Text>
            <Text style={themeStyles.actionText}>{shares}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
