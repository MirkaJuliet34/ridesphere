import React from 'react';

const StaticMap = ({ polyline }) => {
  const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x300&path=enc:${polyline}&key=${googleApiKey}`;

  return (
    <div className="map-container">
      <img src={mapUrl} alt="Map showing route" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default StaticMap;
