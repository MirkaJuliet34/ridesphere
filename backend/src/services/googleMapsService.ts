import axios from 'axios';

export const getRouteDetails = async (origin: string, destination: string) => {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error('API key not found');
    throw new Error('Google API key is missing');
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: { origin, destination, key: apiKey },
    });

    console.log('Google Maps API response:', response.data);

    if (!response.data.routes.length) {
      console.warn('No routes found for the given origin and destination');
      throw new Error('No routes found');
    }

    const { distance, duration } = response.data.routes[0].legs[0];
    return {
      distance: distance.value,
      duration: duration.value,
      text: {
        distance: distance.text,
        duration: duration.text,
      },
    };
  } catch (error) {
    console.error('Error fetching route details:', error);
    throw new Error('Error fetching route details');
  }
};
