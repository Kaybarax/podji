import { API_BASE_URL } from './constants';

describe('Constants', () => {
  it('should export API_BASE_URL constant', () => {
    expect(API_BASE_URL).toBeDefined();
    expect(typeof API_BASE_URL).toBe('string');
    expect(API_BASE_URL).toBe('https://api.monorepo.app');
  });
});
