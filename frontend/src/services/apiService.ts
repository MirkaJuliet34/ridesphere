import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Substitua pela URL correta do backend

// Interface que descreve a resposta da API para estimativa de viagem
export interface RideEstimateResponse {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: { rating: number; comment: string };
    value: number;
  }[];
}

// Interface para os dados de confirmação de viagem
export interface RideConfirmData {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

// Interface para a resposta da confirmação
export interface RideConfirmResponse {
  success: boolean;
}

// Interface para a resposta do histórico de viagens
export interface RideHistoryResponse {
  customer_id: string;
  rides: {
    id: number;
    date: string; // Use 'Date' se a API devolver objetos de data padrão
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
}

// Criação de uma instância do Axios com baseURL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Função para obter a estimativa de viagem
export const getRideEstimate = async (
  customerId: string,
  origin: string,
  destination: string
): Promise<RideEstimateResponse> => {
  const response = await api.post<RideEstimateResponse>('/ride/estimate', {
    customer_id: customerId,
    origin,
    destination,
  });

  return response.data;
};

// Função para confirmar uma viagem
export const getRideConfirm = async (
  rideData: RideConfirmData
): Promise<RideConfirmResponse> => {
  const response = await api.patch<RideConfirmResponse>('/ride/confirm', rideData);
  return response.data;
};

// Função para obter o histórico de viagens
export const getRideHistory = async (
  customerId: string,
  driverId?: string
): Promise<RideHistoryResponse> => {
  try {
    const params = driverId ? { driver_id: driverId } : {};
    const response = await api.get<RideHistoryResponse>(`/ride/${customerId}`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar histórico de viagens:', error);
    throw error;
  }
};
