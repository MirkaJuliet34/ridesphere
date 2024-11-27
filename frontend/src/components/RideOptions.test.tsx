import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RideOptions from './RideOptions';

describe('RideOptions Component', () => {
  const mockDrivers = [
    {
      id: 1,
      name: 'Homer Simpson',
      description: 'Friendly driver with a pink car.',
      vehicle: 'Plymouth Valiant 1973',
      review: { rating: 2, comment: 'Funny but unreliable.' },
      value: 50,
    },
  ];
  const mockSelectDriver = jest.fn();

  test('renders driver options and calls onSelectDriver on button click', () => {
    render(<RideOptions drivers={mockDrivers} onSelectDriver={mockSelectDriver} routeMapUrl="mock-url" />);

    expect(screen.getByText(/homer simpson/i)).toBeInTheDocument();
    expect(screen.getByText(/friendly driver/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /choose/i }));
    expect(mockSelectDriver).toHaveBeenCalledWith(mockDrivers[0]);
  });
});
