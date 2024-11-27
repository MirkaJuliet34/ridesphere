import React, { useState } from 'react';
import { getRideEstimate, RideEstimateResponse } from '../services/apiService';
import './RideForm.css';

interface RideFormProps {
  onSubmit: (data: any) => void;
}

const fetchEstimate = async () => {
  try {
    const response = await fetch('/estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: 'Origin address',
        destination: 'Destination address',
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching estimate:', error);
  }
};

const RideForm: React.FC<RideFormProps> = ({ onSubmit }) => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [estimate, setEstimate] = useState<RideEstimateResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = { customerId, origin, destination };
    onSubmit(formData);

    try {
      const data = await getRideEstimate(customerId, origin, destination);
      setEstimate(data);
    } catch (error) {
      console.error('Erro ao obter estimativa:', error);
    }
  };

  return (
    <div className="ride-form-container">
      {/* Adicionado o nome da aplicação */}
      <header className="app-header">
        <h1>RideSphere</h1>
        <p>Planeje sua viagem com as melhores estimativas!</p>
      </header>

      <form className="ride-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID do Usuário"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de Origem"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button type="submit">Obter Estimativa</button>
      </form>

      {estimate && (
        <div className="ride-estimate">
          <h3>Estimativa de Viagem</h3>
          <p><strong>Distância:</strong> {estimate.distance} km</p>
          <p><strong>Duração:</strong> {estimate.duration}</p>
          <ul>
            {estimate.options.map((option) => (
              <li key={option.id}>
                {option.name}: R$ {option.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RideForm;
