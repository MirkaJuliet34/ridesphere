import React from 'react';

interface DriverOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface RideOptionsProps {
  drivers?: DriverOption[];
  onSelectDriver: (driver: DriverOption) => void;
  routeMapUrl: string;
}

const RideOptions: React.FC<RideOptionsProps> = ({ drivers = [], onSelectDriver, routeMapUrl }) => {
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div>
      <h2>Choose a Driver</h2>
      {isValidUrl(routeMapUrl) ? (
        <img src={routeMapUrl} alt="Route Map" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      ) : (
        <p style={{ color: 'red' }}>Route map not available</p>
      )}
      <ul>
        {drivers.map((driver) => (
          <li key={driver.id}>
            <h3>{driver.name}</h3>
            <p>{driver.description}</p>
            <p>Vehicle: {driver.vehicle}</p>
            <p>Rating: {driver.review.rating}/5 - {driver.review.comment}</p>
            <p>Price: ${driver.value.toFixed(2)}</p>
            <button onClick={() => onSelectDriver(driver)}>Choose</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideOptions;
