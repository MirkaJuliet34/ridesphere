import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaticMap from '../components/StaticMap';
import '../styles/RideOptions.css';

toast.configure();

const RideOptions = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [polyline, setPolyline] = useState('');

  const handleEstimateRide = async () => {
    try {
      const response = await axios.post('/ride/estimate', { origin, destination });
      setPolyline(response.data.routeResponse.routes[0].overview_polyline.points);
      toast.success('Rota carregada com sucesso!');
    } catch (error) {
      toast.error(error.response?.data?.error_description || 'Erro ao calcular rota!');
    }
  };

  return (
    <div className="container">
      <h1>Planejar Viagem</h1>
      <input
        type="text"
        placeholder="Origem"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleEstimateRide}>Calcular Rota</button>
      {polyline && <StaticMap polyline={polyline} />}
    </div>
  );
};

export default RideOptions;
