import { Request, Response } from 'express';
import axios from 'axios';
import Driver from '../models/Driver';

// Controlador para estimativa de viagem
export const estimateRide = async (req: Request, res: Response): Promise<void> => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'O ID do cliente, origem e destino são obrigatórios.',
    });
    return;
  }

  if (origin === destination) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'A origem e o destino não podem ser iguais.',
    });
    return;
  }

  try {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    if (!googleApiKey) {
      throw new Error('Chave da API do Google Maps não configurada.');
    }

    const routeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin,
          destination,
          key: googleApiKey,
        },
      }
    );

    const { routes } = routeResponse.data;
    if (!routes || routes.length === 0) {
      res.status(404).json({
        error_code: 'ROUTE_NOT_FOUND',
        error_description: 'Nenhuma rota encontrada entre os pontos fornecidos.',
      });
      return;
    }

    const { legs } = routes[0];
    const { distance, duration } = legs[0];

    const drivers = await Driver.findAll();
    if (!drivers || drivers.length === 0) {
      res.status(404).json({
        error_code: 'NO_DRIVERS_AVAILABLE',
        error_description: 'Nenhum motorista disponível no momento.',
      });
      return;
    }

    const options = drivers
      .map(driver => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.rating,
          comment: driver.review,
        },
        value: (distance.value / 1000) * driver.price_per_km,
      }))
      .sort((a, b) => a.value - b.value);

    res.json({
      origin: {
        latitude: legs[0].start_location.lat,
        longitude: legs[0].start_location.lng,
      },
      destination: {
        latitude: legs[0].end_location.lat,
        longitude: legs[0].end_location.lng,
      },
      distance: distance.value / 1000,
      duration: duration.text,
      options,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};

// Controlador para confirmar viagem
export const confirmRide = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'O ID da viagem é obrigatório.',
      });
      return;
    }

    // Exemplo de confirmação de viagem
    res.json({ message: 'Viagem confirmada com sucesso!', rideId });
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};

// Controlador para histórico de viagens
export const getRideHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer_id } = req.params;

    if (!customer_id) {
      res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'O ID do cliente é obrigatório.',
      });
      return;
    }

    // Exemplo de retorno de histórico
    res.json({ message: 'Histórico de viagens retornado com sucesso!', customer_id });
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: error instanceof Error ? error.message : 'Erro desconhecido.',
    });
  }
};
