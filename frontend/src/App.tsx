import React, { useState } from 'react';
import RideForm from './components/RideForm';
import RideOptions from './components/RideOptions';
import RideHistory from './components/RideHistory';

const App = () => {
  const [step, setStep] = useState('form');
  const [drivers, setDrivers] = useState([]);
  const [routeMapUrl, setRouteMapUrl] = useState('');

  const handleFormSubmit = (data: any) => {
    setDrivers(data.options);
    setRouteMapUrl(data.routeMapUrl);
    setStep('options');
  };

  const handleDriverSelect = (driver: any) => {
    console.log('Driver Selected:', driver);
    setStep('history');
  };

  return (
    <div>
      {step === 'form' && <RideForm onSubmit={handleFormSubmit} />}
      {step === 'options' && <RideOptions drivers={drivers} routeMapUrl={routeMapUrl} onSelectDriver={handleDriverSelect} />}
      {step === 'history' && <RideHistory />}
    </div>
  );
};

export default App;
