import { render, fireEvent } from '@testing-library/react-native';
import { FeedCard } from '@/lib/components/FeedCard';

// Mock the getMobileTheme function from @podji/design-tokens
jest.mock('@podji/design-tokens', () => ({
  getMobileTheme: jest.fn().mockResolvedValue({
    light: {
      color: {
        primitive: {
          black: '#000000',
        },
        semantic: {
          background: {
            surface: '#FFFFFF',
          },
          border: {
            base: '#E0E0E0',
          },
          text: {
            primary: '#000000',
            secondary: '#757575',
          },
        },
        theme: {
          secondary: '#FF7077',
        },
      },
      spacing: {
        xs: 4,
        md: 16,
      },
      typography: {
        fontSize: {
          sm: 12,
          md: 14,
          lg: 18,
        },
        fontWeight: {
          bold: '700',
        },
      },
      borderRadius: {
        md: 8,
      },
    },
    dark: {
      // Dark theme values would go here
    },
  }),
}));

describe('FeedCard', () => {
  const mockProps = {
    title: 'Summer Vibes Mix',
    creator: 'DJ Cool',
    coverImage: { uri: 'https://example.com/image.jpg' },
    likes: 42,
    comments: 7,
    shares: 3,
  };

  it('renders correctly with all props', () => {
    const { getByText } = render(<FeedCard {...mockProps} />);
    
    expect(getByText('Summer Vibes Mix')).toBeTruthy();
    expect(getByText('by DJ Cool')).toBeTruthy();
    expect(getByText('42')).toBeTruthy();
    expect(getByText('7')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('renders heart icon when liked', () => {
    const { getByText } = render(<FeedCard {...mockProps} isLiked={true} />);
    
    expect(getByText('❤️')).toBeTruthy();
  });

  it('renders empty heart icon when not liked', () => {
    const { getByText } = render(<FeedCard {...mockProps} isLiked={false} />);
    
    expect(getByText('🤍')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<FeedCard {...mockProps} onPress={onPressMock} />);
    
    fireEvent.press(getByText('Summer Vibes Mix'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onLikePress when like button is pressed', () => {
    const onLikePressMock = jest.fn();
    const { getByText } = render(<FeedCard {...mockProps} onLikePress={onLikePressMock} />);
    
    fireEvent.press(getByText('🤍'));
    expect(onLikePressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onCommentPress when comment button is pressed', () => {
    const onCommentPressMock = jest.fn();
    const { getByText } = render(<FeedCard {...mockProps} onCommentPress={onCommentPressMock} />);
    
    fireEvent.press(getByText('💬'));
    expect(onCommentPressMock).toHaveBeenCalledTimes(1);
  });

  it('calls onSharePress when share button is pressed', () => {
    const onSharePressMock = jest.fn();
    const { getByText } = render(<FeedCard {...mockProps} onSharePress={onSharePressMock} />);
    
    fireEvent.press(getByText('🔄'));
    expect(onSharePressMock).toHaveBeenCalledTimes(1);
  });
});