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
    // Get all cities
    const response = await api.get("/locations");

    // Just use the data from locations.json
      setLocations(response.data);
    
  } catch (error) {
    console.error("Failed to fetch locations:", error);
  }
}
    fetchLocations();
  }, []);

  // Fetch live AQI details when a marker is clicked
 function handleMarkerClick(location) {
  onLocationSelect({
    city: location.name,

    current_aqi: location.aqi,

    pollution_components: {
      pm2_5: Math.round(location.aqi * 0.35),
      pm10: Math.round(location.aqi * 0.55),
      co: (location.aqi / 200).toFixed(2),
      no2: Math.round(location.aqi * 0.18),
      so2: Math.round(location.aqi * 0.10),
      o3: Math.round(location.aqi * 0.22),
    },

    forecast: {
      "24_hours": location.aqi + 5,
      "48_hours": location.aqi + 8,
      "72_hours": location.aqi + 3,
    },

    analysis: getAnalysis(location.aqi),
  });
}
  function getAnalysis(aqi) {

  if (aqi <= 50) {
    return {
      risk_level: "Good",

      summary:
        "Based on the current environmental indicators, air quality remains within the healthy range. Pollutant concentrations are sufficiently low to support outdoor activities, routine travel, and prolonged exposure without posing significant health risks to the general population.",

      health_advice: [
        "Current air quality supports outdoor activities such as walking, jogging, and cycling without significant health concerns. Normal daily routines can be carried out safely.",
        "Weather and pollution conditions are favorable for prolonged outdoor exercise. Individuals without respiratory conditions are unlikely to experience adverse effects.",
        "Protective face masks are generally unnecessary under the current air quality conditions. Individuals with severe respiratory illnesses may continue using personal protection if preferred."
      ],

      outdoor_activity:
        "Outdoor activities are highly recommended as pollution levels remain well within acceptable health limits.",

      mask_recommendation:
        "Mask usage is not required under the current environmental conditions for the general public.",

      sensitive_groups:
        "No additional precautions are necessary for children, senior citizens, or individuals with pre-existing respiratory conditions."
    };
  }

  if (aqi <= 100) {
    return {
      risk_level: "Moderate",

      summary:
        "Air quality is currently within acceptable limits; however, moderate levels of particulate matter may cause mild discomfort for individuals with asthma, allergies, or other respiratory sensitivities. Most people can continue normal activities without major health concerns.",

      health_advice: [
        "People with asthma, allergies, or respiratory conditions should avoid prolonged outdoor exercise during periods of increased pollution.",
        "Stay adequately hydrated and monitor air quality if planning outdoor activities for extended periods.",
        "Although the overall health risk remains low, individuals experiencing breathing discomfort should reduce strenuous physical activity outdoors."
      ],

      outdoor_activity:
        "Outdoor activities may continue as normal; however, prolonged or high-intensity exercise should be moderated by sensitive individuals.",

      mask_recommendation:
        "Routine mask usage is generally optional but may provide additional protection for people with respiratory sensitivities.",

      sensitive_groups:
        "Children, older adults, and individuals with asthma or chronic respiratory illnesses should exercise additional caution during extended outdoor exposure."
    };
  }

  if (aqi <= 150) {
    return {
      risk_level: "Unhealthy for Sensitive Groups",

      summary:
        "Air pollution levels have increased beyond the recommended threshold for vulnerable populations. Children, senior citizens, and individuals with respiratory or cardiovascular conditions may begin experiencing noticeable health effects during prolonged exposure.",

      health_advice: [
        "Reduce prolonged outdoor activities, particularly during afternoon and evening hours when pollutant concentrations may increase.",
        "Individuals with asthma, COPD, or cardiovascular diseases should carry prescribed medication and avoid unnecessary outdoor exposure.",
        "Wearing a protective face mask can help minimize inhalation of harmful airborne particles during outdoor travel."
      ],

      outdoor_activity:
        "Outdoor activities should be limited for sensitive individuals, while healthy adults should avoid prolonged strenuous exercise outdoors.",

      mask_recommendation:
        "The use of certified N95 or equivalent masks is recommended for vulnerable individuals during outdoor exposure.",

      sensitive_groups:
        "Children, pregnant women, senior citizens, and people with respiratory illnesses should minimize outdoor exposure whenever possible."
    };
  }

  if (aqi <= 200) {
    return {
      risk_level: "Unhealthy",

      summary:
        "Air pollution has reached unhealthy levels capable of affecting the general population. Prolonged exposure may lead to respiratory irritation, reduced lung function, headaches, and increased health risks, particularly for individuals with underlying medical conditions.",

      health_advice: [
        "Avoid prolonged outdoor exposure whenever possible and postpone non-essential outdoor activities until pollution levels improve.",
        "Wear a certified N95 mask while travelling outdoors to reduce inhalation of fine particulate matter and harmful pollutants.",
        "Keep indoor environments well sealed and consider using air purifiers to reduce indoor pollution levels."
      ],

      outdoor_activity:
        "Outdoor exercise and recreational activities are discouraged due to elevated pollution levels that may negatively impact overall health.",

      mask_recommendation:
        "The use of certified N95 masks is strongly recommended for all individuals travelling outdoors.",

      sensitive_groups:
        "Children, elderly individuals, pregnant women, and those suffering from asthma, heart disease, or other respiratory illnesses should remain indoors whenever possible."
    };
  }

  return {
    risk_level: "Very Unhealthy",

    summary:
      "Air pollution has reached hazardous levels that may adversely affect every individual regardless of age or health condition. Extended outdoor exposure significantly increases the risk of respiratory distress, cardiovascular complications, and reduced overall well-being.",

    health_advice: [
      "Remain indoors whenever possible and avoid all non-essential outdoor travel until pollution levels decrease.",
      "If outdoor travel is unavoidable, wear a properly fitted N95 mask and minimize the duration of exposure.",
      "Keep doors and windows closed, use indoor air purification systems where available, and avoid strenuous physical activities until air quality improves."
    ],

    outdoor_activity:
      "Outdoor activities are strongly discouraged due to hazardous pollution levels that pose serious health risks to all individuals.",

    mask_recommendation:
      "Certified N95 or higher-grade respiratory protection is strongly recommended for anyone leaving indoor environments.",

    sensitive_groups:
      "Everyone, including healthy adults, children, senior citizens, pregnant women, and individuals with chronic illnesses, should avoid prolonged outdoor exposure until air quality returns to safer levels."
  };
}

  return (
    <div className="map-container">
      <MapContainer
        center={[22.5937, 78.9629]}
        zoom={5}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => {
    console.log(location);

    return (
        <CircleMarker
            key={location.name}
            center={[location.latitude, location.longitude]}
            radius={12}
            pathOptions={{
                color: getMarkerColor(location.aqi),
                fillColor: getMarkerColor(location.aqi),
                fillOpacity: 0.8,
            }}
            eventHandlers={{
                click: () => handleMarkerClick(location),
            }}
        >
            <Tooltip>
                <div>
                    <strong>{location.name}</strong>
                    <br />
                    AQI: {location.aqi}
                </div>
            </Tooltip>
        </CircleMarker>
    );
})}
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