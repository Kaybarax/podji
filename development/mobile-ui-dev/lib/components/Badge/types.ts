/**
 * BadgeProps interface for shared badge component properties
 * This interface defines the common properties that can be used by both web and mobile badge components
 */
export interface BadgeProps {
  /**
   * The badge's visual variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * The badge's size
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The content to display inside the badge
   * Can be a number, string, or a component
   */
  content?: React.ReactNode;

  /**
   * Whether the badge is visible
   */
  visible?: boolean;

  /**
   * Maximum count to show (if content is a number)
   * If the count exceeds this number, it will show `${max}+`
   */
  max?: number;

  /**
   * Whether the badge is a dot (no content)
   */
  dot?: boolean;

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
   * The content that the badge is attached to
   */
  children?: React.ReactNode;
}

/**
 * Default badge props
 */
export const defaultBadgeProps: Partial<BadgeProps> = {
  variant: 'primary',
  size: 'medium',
  visible: true,
  max: 99,
  dot: false,
};
