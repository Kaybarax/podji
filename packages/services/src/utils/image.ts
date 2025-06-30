/**
 * Constructs a valid image URL from a URL token.
 * If the token is already a full URL, it returns it unchanged.
 * If the token is empty, it returns the default image URL.
 * @param urlToken - The URL token to construct an image URL from
 * @returns The constructed image URL
 */
export function constructImageUrl(urlToken: string): string {
  // If the token is already a full URL, return it unchanged
  if (urlToken.startsWith('http://') || urlToken.startsWith('https://')) {
    return urlToken;
  }

  // Base URL for images
  const baseUrl = 'https://dummyjson.com/image/';

  // If the token is empty, return the default image URL
  if (!urlToken) {
    return `${baseUrl}150`;
  }

  // If the token is a number (like "150"), return it directly
  if (/^\d+$/.test(urlToken)) {
    return `${baseUrl}${urlToken}`;
  }

  // For special characters, add the default size before the token
  return `${baseUrl}150/${urlToken}`;
}
