import { capitalize } from '../lib/utils';

describe('string utils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should return an empty string when given an empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should lowercase the rest of the string', () => {
      expect(capitalize('hELLO')).toBe('Hello');
    });
  });
});
