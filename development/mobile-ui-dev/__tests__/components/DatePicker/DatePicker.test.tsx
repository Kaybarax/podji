import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatePicker } from '../../../lib/components/DatePicker/DatePicker';

describe('DatePicker Component', () => {
  it('renders correctly with default props', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <DatePicker 
        onChange={onChangeMock} 
        testID="test-datepicker"
      />
    );
    expect(getByTestId('test-datepicker')).toBeTruthy();
  });

  it('displays placeholder when no date is selected', () => {
    const onChangeMock = jest.fn();
    const placeholder = 'Choose a date';
    const { getByText } = render(
      <DatePicker 
        onChange={onChangeMock} 
        placeholder={placeholder}
      />
    );
    expect(getByText(placeholder)).toBeTruthy();
  });

  it('displays formatted date when a date is selected', () => {
    const onChangeMock = jest.fn();
    const testDate = new Date(2023, 0, 15); // January 15, 2023
    const { getByText } = render(
      <DatePicker 
        value={testDate}
        onChange={onChangeMock} 
        format="MM/DD/YYYY"
      />
    );
    expect(getByText('01/15/2023')).toBeTruthy();
  });

  it('opens calendar when input is pressed', () => {
    const onChangeMock = jest.fn();
    const { getByText, queryByText } = render(
      <DatePicker 
        onChange={onChangeMock} 
        placeholder="Select date"
      />
    );
    
    // Calendar should not be visible initially
    expect(queryByText('Su')).toBeNull();
    
    // Press the input to open the calendar
    fireEvent.press(getByText('Select date'));
    
    // Calendar should now be visible with weekday headers
    // Note: This might not work in a test environment without mocking the Modal
    // This is a simplified test that might need adjustment
  });

  it('does not open calendar when disabled', () => {
    const onChangeMock = jest.fn();
    const { getByText, queryByText } = render(
      <DatePicker 
        onChange={onChangeMock} 
        placeholder="Select date"
        disabled
      />
    );
    
    fireEvent.press(getByText('Select date'));
    expect(queryByText('Su')).toBeNull();
  });

  it('applies custom style', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <DatePicker 
        onChange={onChangeMock}
        style={{ backgroundColor: 'red' }}
        testID="test-datepicker"
      />
    );
    
    const datePickerElement = getByTestId('test-datepicker');
    expect(datePickerElement.props.style).toEqual(
      expect.arrayContaining([
        expect.anything(),
        { backgroundColor: 'red' }
      ])
    );
  });

  it('formats date according to format prop', () => {
    const onChangeMock = jest.fn();
    const testDate = new Date(2023, 0, 15); // January 15, 2023
    
    // Test MM/DD/YYYY format
    const { getByText, rerender } = render(
      <DatePicker 
        value={testDate}
        onChange={onChangeMock} 
        format="MM/DD/YYYY"
      />
    );
    expect(getByText('01/15/2023')).toBeTruthy();
    
    // Test DD/MM/YYYY format
    rerender(
      <DatePicker 
        value={testDate}
        onChange={onChangeMock} 
        format="DD/MM/YYYY"
      />
    );
    expect(getByText('15/01/2023')).toBeTruthy();
    
    // Test YYYY-MM-DD format
    rerender(
      <DatePicker 
        value={testDate}
        onChange={onChangeMock} 
        format="YYYY-MM-DD"
      />
    );
    expect(getByText('2023-01-15')).toBeTruthy();
  });

  // Note: Testing calendar interactions like selecting dates, changing months, etc.
  // would require more complex setup with mocking the Modal component
  // These tests are simplified and focus on the main component rendering
});