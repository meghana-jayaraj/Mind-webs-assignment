import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const CENTER: [number, number] = [17.385044, 78.486671]; // Hyderabad

const LockMap: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  }, [map]);

  return null;
};

const InteractiveMap: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', marginTop: '30px' }}>
      <MapContainer
        center={CENTER}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={CENTER}>
          <Popup>Default Location (Hyderabad)</Popup>
        </Marker>
        <LockMap />
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
