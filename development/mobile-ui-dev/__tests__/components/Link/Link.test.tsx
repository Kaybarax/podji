import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Link } from '../../../lib/components/Link/Link';

describe('Link Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Link href="https://example.com">Test Link</Link>);
    expect(getByText('Test Link')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Link href="https://example.com" onPress={onPressMock}>
        Test Link
      </Link>
    );
    
    fireEvent.press(getByText('Test Link'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Link href="https://example.com" onPress={onPressMock} disabled>
        Test Link
      </Link>
    );
    
    fireEvent.press(getByText('Test Link'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const { getByText } = render(
      <Link href="https://example.com" style={{ color: 'red' }}>
        Test Link
      </Link>
    );
    
    const linkElement = getByText('Test Link');
    expect(linkElement.props.style).toEqual(
      expect.arrayContaining([
        expect.anything(),
        { color: 'red' }
      ])
    );
  });

  it('applies testID', () => {
    const { getByTestId } = render(
      <Link href="https://example.com" testID="test-link">
        Test Link
      </Link>
    );
    
    expect(getByTestId('test-link')).toBeTruthy();
  });
});