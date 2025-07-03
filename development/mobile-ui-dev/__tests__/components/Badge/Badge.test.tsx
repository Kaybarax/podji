import * as React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '../../../lib/components/Badge/Badge';
import { Text } from 'react-native';

describe('Badge Component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <Badge testID="test-badge" content={5}>
        <Text>Content</Text>
      </Badge>
    );
    expect(getByTestId('test-badge')).toBeTruthy();
  });

  it('renders content correctly', () => {
    const { getByText } = render(
      <Badge content={5}>
        <Text>Content</Text>
      </Badge>
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('formats content when it exceeds max', () => {
    const { getByText } = render(
      <Badge content={150} max={99}>
        <Text>Content</Text>
      </Badge>
    );
    expect(getByText('99+')).toBeTruthy();
  });

  it('does not render content when dot is true', () => {
    const { queryByText } = render(
      <Badge content={5} dot>
        <Text>Content</Text>
      </Badge>
    );
    expect(queryByText('5')).toBeNull();
  });

  it('does not render badge when visible is false', () => {
    const { getByText, queryByTestId } = render(
      <Badge content={5} visible={false} testID="test-badge">
        <Text>Content</Text>
      </Badge>
    );
    expect(getByText('Content')).toBeTruthy();
    expect(queryByTestId('test-badge')).toBeNull();
  });

  it('applies custom style', () => {
    const { getByTestId } = render(
      <Badge content={5} style={{ backgroundColor: 'red' }} testID="test-badge">
        <Text>Content</Text>
      </Badge>
    );
    
    const badgeElement = getByTestId('test-badge');
    expect(badgeElement.props.style).toEqual(
      expect.arrayContaining([
        expect.anything(),
        { backgroundColor: 'red' }
      ])
    );
  });

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    
    variants.forEach(variant => {
      const { getByTestId } = render(
        <Badge 
          content={5} 
          variant={variant as any} 
          testID={`test-badge-${variant}`}
        >
          <Text>Content</Text>
        </Badge>
      );
      expect(getByTestId(`test-badge-${variant}`)).toBeTruthy();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      const { getByTestId } = render(
        <Badge 
          content={5} 
          size={size as any} 
          testID={`test-badge-${size}`}
        >
          <Text>Content</Text>
        </Badge>
      );
      expect(getByTestId(`test-badge-${size}`)).toBeTruthy();
    });
  });
});