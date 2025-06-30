/**
 * AvatarProps interface for shared avatar component properties
 * This interface defines the common properties that can be used by both web and mobile avatar components
 */
export interface AvatarProps {
  /**
   * The avatar's visual variant
   */
  variant?: 'circle' | 'square' | 'rounded';

  /**
   * The avatar's size
   */
  size?: 'small' | 'medium' | 'large' | number;

  /**
   * The image source for the avatar
   */
  src?: string;

  /**
   * The alt text for the image (for web)
   */
  alt?: string;

  /**
   * The fallback text to display when image fails to load or no image is provided
   * Typically initials of a person's name
   */
  fallback?: string;

  /**
   * Whether the avatar is clickable
   */
  clickable?: boolean;

  /**
   * Optional callback for when the avatar is pressed/clicked
   */
  onPress?: () => void;

  /**
   * Optional additional class name (for web)
   */
  className?: string;

  /**
   * Optional additional style (for React Native)
   */
  style?: any;

  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Default avatar props
 */
export const defaultAvatarProps: Partial<AvatarProps> = {
  variant: 'circle',
  size: 'medium',
  clickable: false,
};
