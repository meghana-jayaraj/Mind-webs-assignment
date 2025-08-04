import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CENTER: [number, number] = [17.385044, 78.486671]; // Hyderabad coords

const LockMap: React.FC = () => {
  const map = useMap();

  // Prevent zoom & drag
  map.dragging.disable();
  map.scrollWheelZoom.disable();
  map.doubleClickZoom.disable();
  map.touchZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();

  return null;
};

const InteractiveMap: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', marginTop: '30px' }}>
      <MapContainer
        center={CENTER}
        zoom={16} // Approx. 2 sq km
        style={{ height: '100%', width: '100%' }}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />
        <LockMap />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
