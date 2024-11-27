import { getRouteDetails } from "c:/RideSphere/backend/src/services/googleMapsService";
import axios from 'axios';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

// Mock do Axios
jest.mock('axios');

describe('Google Maps Service', () => {
  it('should fetch route details with valid response', async () => {
    // Mock do retorno da API do Google Maps
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        routes: [
          {
            legs: [
              {
                distance: { value: 10000, text: '10 km' },
                duration: { value: 900, text: '15 mins' },
              },
            ],
          },
        ],
      },
    });

    // Chamada à função com origem e destino reais
    const data = await getRouteDetails('Origin', 'Destination');

    // Expectativa do resultado
    expect(data).toEqual({
      distance: 10000, // Em metros
      duration: 900, // Em segundos
      text: {
        distance: '10 km',
        duration: '15 mins',
      },
    });

    // Verificar se o axios foi chamado corretamente
    expect(axios.get).toHaveBeenCalledWith(
      'https://maps.googleapis.com/maps/api/directions/json',
      {
        params: {
          origin: 'Origin',
          destination: 'Destination',
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
  });

  it('should throw an error if no routes are found', async () => {
    // Mock de resposta sem rotas
    (axios.get as jest.Mock).mockResolvedValue({
      data: { routes: [] },
    });

    await expect(getRouteDetails('InvalidOrigin', 'InvalidDestination')).rejects.toThrow(
      'No routes found'
    );
  });

  it('should throw an error if the API key is missing', async () => {
    // Salvar a chave atual para restaurar depois
    const originalApiKey = process.env.GOOGLE_API_KEY;
    delete process.env.GOOGLE_API_KEY;

    await expect(getRouteDetails('Origin', 'Destination')).rejects.toThrow(
      'Google API key is missing'
    );

    // Restaurar a chave da API
    process.env.GOOGLE_API_KEY = originalApiKey;
  });
});
