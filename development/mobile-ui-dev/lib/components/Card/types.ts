/**
 * CardProps interface for shared card component properties
 * This interface defines the common properties that can be used by both web and mobile card components
 */
export interface CardProps {
  /**
   * The card's visual variant
   */
  variant?: 'elevated' | 'outlined' | 'filled';

  /**
   * The card's size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the card is clickable
   */
  clickable?: boolean;

  /**
   * Optional callback for when the card is pressed/clicked
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

  /**
   * The content of the card
   */
  children?: React.ReactNode;
}

/**
 * Default card props
 */
export const defaultCardProps: Partial<CardProps> = {
  variant: 'elevated',
  size: 'medium',
  clickable: false,
};
