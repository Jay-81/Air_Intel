import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";

import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/map.css";

function getMarkerColor(aqi) {
  if (aqi <= 50) return "green";
  if (aqi <= 100) return "orange";
  return "red";
}

function MapView({ onLocationSelect }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await api.get("/locations");
        console.log(response.data);
        setLocations(response.data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    }

    fetchLocations();
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[13.0827, 80.2707]}
        zoom={11}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <CircleMarker
            key={location.id}
            center={location.coordinates}
            radius={12}
            pathOptions={{
              color: getMarkerColor(location.aqi),
              fillColor: getMarkerColor(location.aqi),
              fillOpacity: 0.8,
            }}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Tooltip>
              <div className="map-tooltip">
                <strong className="map-tooltip-name">{location.name}</strong>

                <div className="map-tooltip-row">
                  <span className="map-tooltip-label">AQI</span>
                  <span
                    className={`map-tooltip-aqi map-tooltip-aqi--${getMarkerColor(
                      location.aqi
                    )}`}
                  >
                    {location.aqi}
                  </span>
                </div>

                <div className="map-tooltip-row">
                  <span className="map-tooltip-label">Status</span>
                  <span>{location.status}</span>
                </div>

                <div className="map-tooltip-cause">{location.cause}</div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="map-legend">
        <span className="map-legend-title">AQI Scale</span>
        <div className="map-legend-item">
          <span className="map-legend-dot map-legend-dot--green"></span>
          Good (0–50)
        </div>
        <div className="map-legend-item">
          <span className="map-legend-dot map-legend-dot--orange"></span>
          Moderate (51–100)
        </div>
        <div className="map-legend-item">
          <span className="map-legend-dot map-legend-dot--red"></span>
          Unhealthy (100+)
        </div>
      </div>
    </div>
  );
}

export default MapView;
