/**
 * LinkProps interface for shared link component properties
 * This interface defines the common properties that can be used by both web and mobile link components
 */
export interface LinkProps {
  /**
   * The link's text content
   */
  children: React.ReactNode;

  /**
   * The URL to navigate to when the link is pressed
   */
  href: string;

  /**
   * The link's visual variant
   */
  variant?: 'primary' | 'secondary';

  /**
   * Whether the link is disabled
   */
  disabled?: boolean;

  /**
   * Function to call when the link is pressed
   */
  onPress?: () => void;

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
 * Default link props
 */
export const defaultLinkProps: Partial<LinkProps> = {
  variant: 'primary',
  disabled: false,
};
