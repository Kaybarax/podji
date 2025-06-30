/**
 * Constructs a valid image URL from a URL token.
 * If the token is already a full URL, it returns it unchanged.
 * If the token is empty, it returns the base URL with a trailing slash.
 * @param urlToken - The URL token to construct an image URL from
 * @returns The constructed image URL
 */
export function constructImageUrl(urlToken: string): string {
  // If the token is already a full URL, return it unchanged
  if (urlToken.startsWith('http://') || urlToken.startsWith('https://')) {
    return urlToken;
  }

  // Base URL for images
  const baseUrl = 'https://dummyjson.com/docs/image/';

  // Return the constructed URL
  return `${baseUrl}${urlToken}`;
}
