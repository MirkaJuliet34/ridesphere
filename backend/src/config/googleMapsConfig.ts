import axios from 'axios';

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
export const GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/directions/json";

// Adicionando a função calculateRoute
export async function calculateRoute(origin: string, destination: string) {
  try {
    const response = await axios.get(GOOGLE_MAPS_URL, {
      params: {
        origin,
        destination,
        key: GOOGLE_MAPS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao calcular a rota:", error);
    throw error;
  }
}
