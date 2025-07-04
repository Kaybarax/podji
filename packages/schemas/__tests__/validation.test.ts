// Tests for validateProfile utility function
import { validateProfile } from '../lib/schemas/validation';

describe('validateProfile', () => {
  it('should return success true and validated data for a valid profile', () => {
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
    const result = validateProfile(validProfile);

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validProfile);
    expect(result.error).toBeUndefined();
  });

  it('should return success false and error message when id is missing', () => {
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

    // Act
    const result = validateProfile(invalidProfile);

    // Assert
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(typeof result.error).toBe('string');
  });

  it('should return success false and error message when image is not a valid URL', () => {
    // Arrange
    const invalidProfile = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      username: 'johndoe',
      image: 'not-a-valid-url',
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
    const result = validateProfile(invalidProfile);

    // Assert
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(typeof result.error).toBe('string');
  });

  it('should return success false and error message for non-object input', () => {
    // Arrange
    const invalidInput = 'not an object';

    // Act
    const result = validateProfile(invalidInput);

    // Assert
    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.error).toBeDefined();
    expect(typeof result.error).toBe('string');
  });
});
