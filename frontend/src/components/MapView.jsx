import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
} from "react-leaflet";

import locations from "../data/locations";

function MapView({ onLocationSelect }) {
  return (
    <div
      style={{
        width: "70%",
        height: "100%",
      }}
    >
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
            center={location.position}
            radius={12}
            pathOptions={{
              color: location.color,
              fillColor: location.color,
              fillOpacity: 0.8,
            }}
            eventHandlers={{
              click: () => {
                onLocationSelect(location);
              },
            }}
          >
            <Tooltip>
              <div>
                <strong>{location.name}</strong>

                <br />

                AQI : {location.aqi}

                <br />

                {location.cause}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;