import {
  Satellite,
  MapPin,
  Wind,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
  ShieldCheck,
} from "lucide-react";
import "../styles/panel.css";

function getAqiTone(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  return "poor";
}

function LocationDashboard({ location }) {
  if (!location) {
    return (
      <div className="dashboard-panel">
        <div className="panel-header">
          <div className="panel-header-icon">
            <Satellite size={20} strokeWidth={2} />
          </div>
          <div>
            <h2 className="panel-title">AirIntel Insights</h2>
            <p className="panel-subtitle">
              AI-generated environmental analysis
            </p>
          </div>
        </div>

        <div className="panel-empty">
          <div className="panel-empty-icon">
            <MapPin size={30} strokeWidth={1.6} />
          </div>
          <h3>No Location Selected</h3>
          <p>
            Click on any AQI marker to view AI-generated insights, pollution
            sources, forecast and recommendations.
          </p>
        </div>
      </div>
    );
  }

  const tone = getAqiTone(location.aqi);

  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <div className="panel-header-icon">
          <Satellite size={20} strokeWidth={2} />
        </div>
        <div>
          <h2 className="panel-title">AirIntel Insights</h2>
          <p className="panel-subtitle">AI-generated environmental analysis</p>
        </div>
      </div>

      <div className="panel-location">
        <div className="panel-location-name">
          <MapPin size={16} strokeWidth={2} />
          <h2>{location.name}</h2>
        </div>
        <span className={`aqi-badge aqi-badge--${tone}`}>
          {location.status}
        </span>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">AQI</span>
          <span className={`stat-value stat-value--${tone}`}>
            {location.aqi}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">Status</span>
          <span className="stat-value stat-value--small">
            {location.status}
          </span>
        </div>

        <div className="stat-card stat-card--wide">
          <span className="stat-label">
            <Wind size={14} strokeWidth={2} />
            Major Cause
          </span>
          <span className="stat-value stat-value--small">
            {location.cause}
          </span>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <Sparkles size={16} strokeWidth={2} />
          <h3>AI Summary</h3>
        </div>
        <p className="panel-text">
          Air quality in <strong>{location.name}</strong> is currently{" "}
          <strong className={`highlight--${tone}`}>{location.status}</strong>.
          Pollution is mainly influenced by <strong>{location.cause}</strong>.
        </p>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <Sun size={16} strokeWidth={2} />
          <h3>24-Hour Forecast</h3>
        </div>
        <div className="forecast-row">
          <div className="forecast-item">
            <Sunrise size={18} strokeWidth={2} />
            <span className="forecast-label">Morning</span>
            <span className="forecast-value">{location.aqi - 8}</span>
          </div>
          <div className="forecast-item">
            <Sun size={18} strokeWidth={2} />
            <span className="forecast-label">Afternoon</span>
            <span className="forecast-value">{location.aqi}</span>
          </div>
          <div className="forecast-item">
            <Sunset size={18} strokeWidth={2} />
            <span className="forecast-label">Evening</span>
            <span className="forecast-value">{location.aqi + 10}</span>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <ShieldCheck size={16} strokeWidth={2} />
          <h3>Health Advice</h3>
        </div>
        <ul className="advice-list">
          <li>Wear a mask outdoors.</li>
          <li>Avoid prolonged outdoor activities.</li>
          <li>Stay hydrated.</li>
        </ul>
      </div>
    </div>
  );
}

export default LocationDashboard;
