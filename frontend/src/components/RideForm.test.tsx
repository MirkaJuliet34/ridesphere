import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RideForm from './RideForm';
import * as apiService from '../services/apiService';

jest.mock('../services/apiService');

describe('RideForm Component', () => {
  const mockOnSubmit = jest.fn(); // Mock da função onSubmit

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form correctly', () => {
    render(<RideForm onSubmit={mockOnSubmit} />); // Passa o mock para a prop onSubmit

    expect(screen.getByPlaceholderText(/ID do Usuário/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Endereço de Origem/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Endereço de Destino/i)).toBeInTheDocument();
  });

  it('should call getRideEstimate and display results', async () => {
    const mockEstimate = {
      origin: { latitude: 1, longitude: 1 },
      destination: { latitude: 2, longitude: 2 },
      distance: 10,
      duration: '15 mins',
      options: [{ id: 1, name: 'Option 1', description: '', vehicle: '', review: { rating: 5, comment: '' }, value: 20 }],
    };

    jest.spyOn(apiService, 'getRideEstimate').mockResolvedValueOnce(mockEstimate);

    render(<RideForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/ID do Usuário/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Endereço de Origem/i), { target: { value: 'Origem' } });
    fireEvent.change(screen.getByPlaceholderText(/Endereço de Destino/i), { target: { value: 'Destino' } });
    fireEvent.click(screen.getByText(/Obter Estimativa/i));

    await waitFor(() => {
      expect(screen.getByText(/Distância: 10 km/i)).toBeInTheDocument();
      expect(screen.getByText(/Duração: 15 mins/i)).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    jest.spyOn(apiService, 'getRideEstimate').mockRejectedValueOnce(new Error('Erro na API'));

    render(<RideForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/ID do Usuário/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Endereço de Origem/i), { target: { value: 'Origem' } });
    fireEvent.change(screen.getByPlaceholderText(/Endereço de Destino/i), { target: { value: 'Destino' } });
    fireEvent.click(screen.getByText(/Obter Estimativa/i));

    await waitFor(() => {
      expect(screen.queryByText(/Distância:/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Duração:/i)).not.toBeInTheDocument();
    });
  });
});
