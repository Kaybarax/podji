// Import the ProfileSchema
import { Profile, parseProfile } from '../lib/schemas/ProfileSchema';

describe('ProfileSchema', () => {
  it('should successfully parse a valid profile object', () => {
    // Arrange
    const validProfile: Profile = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act & Assert
    expect(() => {
      const result = parseProfile(validProfile);
      expect(result).toEqual(validProfile);
    }).not.toThrow();
  });

  // T3007: Tests for missing or invalid data
  it('should throw an error when id is missing', () => {
    // Arrange
    const invalidProfile = {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act & Assert
    expect(() => {
      parseProfile(invalidProfile);
    }).toThrow();
  });

  it('should throw an error when firstName is missing', () => {
    // Arrange
    const invalidProfile = {
      id: 1,
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act & Assert
    expect(() => {
      parseProfile(invalidProfile);
    }).toThrow();
  });

  it('should throw an error when age is not a number', () => {
    // Arrange
    const invalidProfile = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: '30', // String instead of number
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act & Assert
    expect(() => {
      parseProfile(invalidProfile);
    }).toThrow();
  });

  it('should throw an error when image is not a valid URL', () => {
    // Arrange
    const invalidProfile = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'not-a-valid-url', // Invalid URL
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act & Assert
    expect(() => {
      parseProfile(invalidProfile);
    }).toThrow();
  });
});

describe('parseProfile', () => {
  it('should successfully parse a valid profile object', () => {
    // Arrange
    const validProfile = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act
    const result = parseProfile(validProfile);

    // Assert
    expect(result).toEqual(validProfile);
  });

  it('should throw an error for an invalid profile object', () => {
    // Arrange
    const invalidProfile = {
      id: '1', // Invalid type
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'https://example.com/image.jpg',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'USA',
      },
      company: {
        name: 'Acme Inc.',
        title: 'Software Engineer',
      },
    };

    // Act & Assert
    expect(() => parseProfile(invalidProfile)).toThrow();
  });
});
