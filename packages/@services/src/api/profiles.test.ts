import { fetchProfiles } from './profiles';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('profiles api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchProfiles', () => {
    it('should resolve with an empty array', async () => {
      // Mock an empty array response
      (axios.get as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: [],
      });

      const profiles = await fetchProfiles();
      expect(profiles).toEqual([]);
    });

    it('should handle successful response with data', async () => {
      const mockData = [{ id: 1, name: 'Test User' }];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockData,
      });

      const profiles = await fetchProfiles();

      // Expect the data to be validated with the 'validated' property added
      expect(profiles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 1,
            name: 'Test User',
            validated: true,
          }),
        ]),
      );
    });

    it('should handle network error (non-2xx response)', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: {
          status: 500,
          statusText: 'Internal Server Error',
        },
      });

      const profiles = await fetchProfiles();

      // Expect a specific error message
      expect(profiles).toEqual({ error: 'Failed to fetch profiles' });
    });

    it('should implement a retry mechanism for failed requests', async () => {
      // The first call fails
      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: {
          status: 500,
          statusText: 'Internal Server Error',
        },
      });

      // The second call succeeds
      const mockData = [{ id: 1, name: 'Test User' }];
      (axios.get as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockData,
      });

      const profiles = await fetchProfiles();

      // Expect axios.get to be called twice and return the raw data without validation
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(profiles).toEqual(mockData);
    });
  });
});
