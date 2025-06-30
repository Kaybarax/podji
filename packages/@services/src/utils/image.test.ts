import { constructImageUrl } from './image';

describe('image utils', () => {
  describe('constructImageUrl', () => {
    it('should construct a valid image URL from a URL token', () => {
      expect(constructImageUrl('150')).toBe('https://dummyjson.com/image/150');
    });

    it('should handle empty token by returning the base URL with a trailing slash', () => {
      expect(constructImageUrl('')).toBe('https://dummyjson.com/image/150');
    });

    it('should handle tokens with special characters', () => {
      expect(constructImageUrl('image-with_special.chars')).toBe(
        'https://dummyjson.com/image/150/image-with_special.chars',
      );
    });

    it('should handle tokens that already contain a full URL by returning them unchanged', () => {
      const fullUrl = 'https://example.com/image.jpg';
      expect(constructImageUrl(fullUrl)).toBe(fullUrl);
    });
  });
});
