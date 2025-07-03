/**
 * PaginationProps interface for shared pagination component properties
 * This interface defines the common properties that can be used by both web and mobile pagination components
 */
export interface PaginationProps {
  /**
   * The total number of pages
   */
  totalPages: number;

  /**
   * The current active page (1-based)
   */
  currentPage: number;

  /**
   * Function to call when a page is selected
   */
  onPageChange: (page: number) => void;

  /**
   * Whether to show the previous and next buttons
   */
  showPrevNext?: boolean;

  /**
   * Whether to show the first and last buttons
   */
  showFirstLast?: boolean;

  /**
   * The maximum number of page buttons to show
   */
  maxVisiblePages?: number;

  /**
   * Whether the pagination is disabled
   */
  disabled?: boolean;

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
 * Default pagination props
 */
export const defaultPaginationProps: Partial<PaginationProps> = {
  showPrevNext: true,
  showFirstLast: false,
  maxVisiblePages: 5,
  disabled: false,
};
