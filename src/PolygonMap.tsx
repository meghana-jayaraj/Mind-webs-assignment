import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import Sidebar from './Sidebar';

const center: [number, number] = [17.385044, 78.486671];
const datasources = ['Crop Field', 'Waterbody'];

// NEW: Threshold Rule Type
type Rule = {
  color: string;
  operator: '<' | '>' | '<=' | '>=' | '=';
  value: number;
};


// MODIFIED: Added appliedColor
interface PolygonData {
  latlngs: LatLngExpression[];
  metadata: { source: string };
  appliedColor?: string;
}

const PolygonDrawer = ({
  drawnItemsRef,
  addPolygon,
  getColorForValue,
}: {
  drawnItemsRef: React.RefObject<L.FeatureGroup>;
  addPolygon: (polygon: PolygonData) => void;
  getColorForValue: (value: number) => string;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const drawnItems = drawnItemsRef.current!;
    map.addLayer(drawnItems);

    const existingControls = (map as any)._controlContainer.querySelectorAll('.leaflet-draw-toolbar-top');
    if (existingControls.length === 0) {
      const drawControl = new L.Control.Draw({
        draw: {
          polygon: {
            allowIntersection: false,
            shapeOptions: { color: 'purple' },
            showArea: true,
            maxPoints: 12,
          },
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: drawnItems,
        }
      });
      map.addControl(drawControl);
    }

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;

      let selectedSource =
        datasources.length === 1
          ? datasources[0]
          : prompt(`Select a data source:\n${datasources.join('\n')}`, datasources[0]);

      if (!selectedSource) selectedSource = datasources[0];

      const rawLatLngs = layer.getLatLngs();
      let latlngs: LatLngExpression[] = [];

      if (Array.isArray(rawLatLngs[0])) {
        latlngs = (rawLatLngs[0] as L.LatLng[]).map((point) => [point.lat, point.lng]);
      } else {
        latlngs = (rawLatLngs as L.LatLng[]).map((point) => [point.lat, point.lng]);
      }

      const dummyValue = Math.floor(Math.random() * 50); // simulate
      const color = getColorForValue(dummyValue);
      layer.setStyle({ color });

      addPolygon({ latlngs, metadata: { source: selectedSource }, appliedColor: color });

      drawnItems.addLayer(layer);
    });

    return () => {
      map.off(L.Draw.Event.CREATED);
    };
  }, [map, drawnItemsRef, addPolygon, getColorForValue]);

  return null;
};

const PolygonMap: React.FC = () => {
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const mapRef = useRef<L.Map | null>(null);
  const [polygonData, setPolygonData] = useState<PolygonData[]>([]);
  const [thresholdRules, setThresholdRules] = useState<Rule[]>([{
    color: 'red', operator: '<', value: 10
  }, {
    color: 'blue', operator: '<', value: 25
  }, {
    color: 'green', operator: '>=', value: 25
  }]);

  const getColorForValue = (inputValue: number): string => {
    for (const rule of thresholdRules) {
      const { operator, value, color } = rule;
  
      const match =
        (operator === '<' && inputValue < value) ||
        (operator === '<=' && inputValue <= value) ||
        (operator === '=' && inputValue === value) ||
        (operator === '>' && inputValue > value) ||
        (operator === '>=' && inputValue >= value);
  
      if (match) return color;  // ✅ First match is applied
    }
  
    return 'purple'; // fallback color
  };
  

  const addPolygon = useCallback((poly: PolygonData) => {
    setPolygonData((prev) => [...prev, poly]);
  }, []);

  const handleSourceChange = (id: number, source: string) => {
    setPolygonData(prev =>
      prev.map((poly, index) => index === id - 1 ? { ...poly, metadata: { source } } : poly)
    );
  };

  const handleThresholdChange = (index: number, rule: Rule) => {
    const updated = [...thresholdRules];
    updated[index] = rule;
    setThresholdRules(updated);
  };

  const handleDeleteAll = () => {
    drawnItemsRef.current.clearLayers();
    setPolygonData([]);
  };

  const handleViewPolygons = () => {
    if (polygonData.length === 0) {
      alert('You have no polygons to display.');
      return;
    }

    const names = polygonData.map((poly, i) => `${i + 1}. ${poly.metadata.source}`).join('\n');
    alert(`You have drawn ${polygonData.length} polygon(s):\n\n${names}`);
  };

  const handleDeleteOne = () => {
    if (polygonData.length === 0) {
      alert('No polygons to delete.');
      return;
    }

    const names = polygonData.map((poly, i) => `${i + 1}. ${poly.metadata.source}`).join('\n');
    const input = prompt(`Which polygon to delete?\n${names}`, '1');

    const index = parseInt(input || '', 10);
    if (!isNaN(index) && index > 0 && index <= polygonData.length) {
      const updated = polygonData.filter((_, i) => i !== index - 1);
      setPolygonData(updated);
      drawnItemsRef.current.clearLayers();

      updated.forEach((poly) => {
        const layer = L.polygon(poly.latlngs, { color: poly.appliedColor || 'purple' });
        drawnItemsRef.current.addLayer(layer);
      });

      if (updated.length > 0) {
        const allPoints = updated.flatMap(p => p.latlngs) as [number, number][];
        const bounds = L.latLngBounds(allPoints);
        mapRef.current?.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  };

  const handleResetCenter = () => {
    if (polygonData.length > 0) {
      const allPoints = polygonData.flatMap(p => p.latlngs) as [number, number][];
      const bounds = L.latLngBounds(allPoints);
      mapRef.current?.fitBounds(bounds, { padding: [40, 40] });
    } else {
      mapRef.current?.setView(center);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleDragEnd = () => {
      if (polygonData.length > 0) {
        const allPoints = polygonData.flatMap(p => p.latlngs) as [number, number][];
        const bounds = L.latLngBounds(allPoints);
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    };

    map.on('dragend', handleDragEnd);
    return () => {
      map.off('dragend', handleDragEnd);
    };
  }, [polygonData]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
  polygons={polygonData.map((p, i) => ({ id: i + 1, source: p.metadata.source }))}
  dataSources={datasources}
  thresholdRules={thresholdRules}
  onSourceChange={handleSourceChange}
  onThresholdChange={handleThresholdChange}
/>
      <div style={{ marginTop: '30px', flexGrow: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <button onClick={handleViewPolygons}>View All</button>
          <button onClick={handleDeleteAll} style={{ marginLeft: 10 }}>
            Delete All
          </button>
          <button onClick={handleDeleteOne} style={{ marginLeft: 10 }}>
            Delete One
          </button>
          <button onClick={handleResetCenter} style={{ marginLeft: 10 }}>
            Reset Center
          </button>
        </div>

        <MapContainer
          center={center}
          zoom={17}
          minZoom={17}
          maxZoom={17}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          zoomControl={false}
          dragging={true}
          style={{ height: '400px', width: '100%' }}
          ref={(node) => {
            if (node !== null) {
              mapRef.current = node;
            }
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <FeatureGroup ref={drawnItemsRef} />
          <PolygonDrawer drawnItemsRef={drawnItemsRef} addPolygon={addPolygon} getColorForValue={getColorForValue} />
        </MapContainer>
      </div>
    </div>
  );
};

export default PolygonMap;
