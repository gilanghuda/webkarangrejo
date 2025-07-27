import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    // Check if the map container exists
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([112.25, -7.75], 12); // Updated to approximate Desa Karangrejo centroid
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }

    // Load GeoJSON for Desa Karangrejo boundary
    fetch('/karangrejo-boundary.geojson')
      .then(response => response.json())
      .then(data => {
        if (mapInstance.current) {
          const geojsonLayer = L.geoJSON(data, {
            style: {
              color: '#4E6922',
              weight: 2,
              fillColor: '#D7E9AD',
              fillOpacity: 0.5,
            },
            onEachFeature: (feature, layer) => {
              layer.bindPopup('Batas Wilayah Desa Karangrejo');
            },
          }).addTo(mapInstance.current);

          // Fit map to GeoJSON bounds
          mapInstance.current.fitBounds(geojsonLayer.getBounds());
        }
      })
      .catch(error => console.error('Error loading GeoJSON:', error));

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow-md"></div>;
};

export default LeafletMap;