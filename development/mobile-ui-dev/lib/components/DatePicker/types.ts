/**
 * DatePickerProps interface for shared date picker component properties
 * This interface defines the common properties that can be used by both web and mobile date picker components
 */
export interface DatePickerProps {
  /**
   * The currently selected date
   */
  value?: Date;

  /**
   * Function to call when a date is selected
   */
  onChange: (date: Date) => void;

  /**
   * The minimum selectable date
   */
  minDate?: Date;

  /**
   * The maximum selectable date
   */
  maxDate?: Date;

  /**
   * Placeholder text to display when no date is selected
   */
  placeholder?: string;

  /**
   * Format to display the selected date
   */
  format?: string;

  /**
   * Whether the date picker is disabled
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
 * Default date picker props
 */
export const defaultDatePickerProps: Partial<DatePickerProps> = {
  placeholder: 'Select date',
  format: 'MM/DD/YYYY',
  disabled: false,
};
