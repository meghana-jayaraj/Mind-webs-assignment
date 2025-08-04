import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const MapComponent: React.FC = () => {
  const center: [number, number] = [17.385044, 78.486671]; // Hyderabad coords

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
     <MapContainer
  center={center as [number, number]}
  zoom={15}
  scrollWheelZoom={false}
  style={{ height: '100%', width: '100%' }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  />

        <Marker position={center}>
          <Popup>Default Location (Hyderabad)</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
