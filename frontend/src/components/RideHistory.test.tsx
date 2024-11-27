import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RideHistory from './RideHistory';
import * as apiService from '../services/apiService';

jest.mock('../services/apiService');

describe('RideHistory Component', () => {
  const mockRides: apiService.RideHistoryResponse = {
    customer_id: '123',
    rides: [
      {
        id: 1,
        date: '2023-11-01T12:00:00Z',
        origin: 'Address A',
        destination: 'Address B',
        distance: 10,
        duration: '15 mins',
        driver: { id: 1, name: 'Homer Simpson' },
        value: 25,
      },
    ],
  };

  test('fetches and displays ride history', async () => {
    jest.spyOn(apiService, 'getRideHistory').mockResolvedValue(mockRides);

    render(<RideHistory />);

    fireEvent.change(screen.getByPlaceholderText(/customer id/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /apply filter/i }));

    await waitFor(() => {
      expect(screen.getByText(/homer simpson/i)).toBeInTheDocument();
      expect(screen.getByText(/address a/i)).toBeInTheDocument();
      expect(screen.getByText(/10 km/i)).toBeInTheDocument();
    });
  });
});
