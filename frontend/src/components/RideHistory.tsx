import React, { useState } from 'react';
import { getRideHistory, RideHistoryResponse } from '../services/apiService';

export interface Ride {
  id: number;
  date: string;
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


const RideHistory: React.FC = () => {
  const [history, setHistory] = useState<Ride[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [driverId, setDriverId] = useState<string | undefined>(undefined);

  const fetchHistory = async () => {
    try {
      const response: RideHistoryResponse = await getRideHistory(customerId, driverId);
      setHistory(response.rides); // Atualiza o estado com apenas a lista de viagens
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={fetchHistory}>Apply Filter</button>
      <ul>
        {history.map((ride) => (
          <li key={ride.id}>
            {ride.date}: {ride.origin} → {ride.destination} with {ride.driver.name} (${ride.value})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideHistory;
