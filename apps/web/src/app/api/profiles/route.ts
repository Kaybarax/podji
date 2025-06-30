import { NextResponse } from 'next/server';

/**
 * API route to proxy requests to the external API
 * This helps avoid CORS issues by making the request from the server
 */
export async function GET() {
  try {
    // Make the request to the external API
    const response = await fetch('https://dummyjson.com/docs/users', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}
