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

function getStatus(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
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
            Click on any AQI marker to view AI-generated insights,
            pollution analysis, forecasts and health recommendations.
          </p>
        </div>
      </div>
    );
  }

  const aqi = Math.round(location.current_aqi || 0);

  const tone = getAqiTone(aqi);

  const analysis = location.analysis || {};

  const forecast = location.forecast || {};

  const pollution = location.pollution_components || {};

  const status =
    analysis.risk_level || getStatus(aqi);

  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <div className="panel-header-icon">
          <Satellite size={20} strokeWidth={2} />
        </div>

        <div>
          <h2 className="panel-title">
            AirIntel Insights
          </h2>

          <p className="panel-subtitle">
            AI-generated environmental analysis
          </p>
        </div>
      </div>

      <div className="panel-location">
        <div className="panel-location-name">
          <MapPin size={16} strokeWidth={2} />

          <h2>{location.city}</h2>
        </div>

        <span
          className={`aqi-badge aqi-badge--${tone}`}
        >
          {status}
        </span>
      </div>

      <div className="stat-grid">

        <div className="stat-card">
          <span className="stat-label">
            Current AQI
          </span>

          <span
            className={`stat-value stat-value--${tone}`}
          >
            {aqi}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-label">
            Status
          </span>

          <span className="stat-value stat-value--small">
            {status}
          </span>
        </div>

        <div className="stat-card stat-card--wide">
          <span className="stat-label">
            <Wind size={14} strokeWidth={2} />
            PM2.5
          </span>

          <span className="stat-value stat-value--small">
            {pollution.pm2_5 ?? "--"} µg/m³
          </span>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-section-title">
          <Sparkles size={16} strokeWidth={2} />
          <h3>AI Summary</h3>
        </div>

        <p className="panel-text">
          {analysis.summary || "No AI summary available."}
        </p>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <Sun size={16} strokeWidth={2} />
          <h3>3-Day AQI Forecast</h3>
        </div>

        <div className="forecast-row">
          <div className="forecast-item">
            <Sunrise size={18} strokeWidth={2} />

            <span className="forecast-label">
              24 Hours
            </span>

            <span className="forecast-value">
              {forecast["24_hours"] ?? "--"}
            </span>
          </div>

          <div className="forecast-item">
            <Sun size={18} strokeWidth={2} />

            <span className="forecast-label">
              48 Hours
            </span>

            <span className="forecast-value">
              {forecast["48_hours"] ?? "--"}
            </span>
          </div>

          <div className="forecast-item">
            <Sunset size={18} strokeWidth={2} />

            <span className="forecast-label">
              72 Hours
            </span>

            <span className="forecast-value">
              {forecast["72_hours"] ?? "--"}
            </span>
          </div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <Wind size={16} strokeWidth={2} />
          <h3>Pollution Components</h3>
        </div>

        <div className="stat-grid">

          <div className="stat-card">
            <span className="stat-label">PM2.5</span>
            <span className="stat-value stat-value--small">
              {pollution.pm2_5 ?? "--"}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">PM10</span>
            <span className="stat-value stat-value--small">
              {pollution.pm10 ?? "--"}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">CO</span>
            <span className="stat-value stat-value--small">
              {pollution.co ?? "--"}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">NO₂</span>
            <span className="stat-value stat-value--small">
              {pollution.no2 ?? "--"}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">SO₂</span>
            <span className="stat-value stat-value--small">
              {pollution.so2 ?? "--"}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">O₃</span>
            <span className="stat-value stat-value--small">
              {pollution.o3 ?? "--"}
            </span>
          </div>

        </div>
      </div>
      <div className="panel-section">
        <div className="panel-section-title">
          <ShieldCheck size={16} strokeWidth={2} />
          <h3>Health Advice</h3>
        </div>

        <ul className="advice-list">
          {Array.isArray(analysis.health_advice) &&
          analysis.health_advice.length > 0 ? (
            analysis.health_advice.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))
          ) : (
            <li>No health advice available.</li>
          )}
        </ul>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">
          <Sparkles size={16} strokeWidth={2} />
          <h3>AI Recommendations</h3>
        </div>

        <div className="stat-grid">

          <div className="stat-card stat-card--wide">
            <span className="stat-label">
              Outdoor Activity
            </span>

            <span className="stat-value stat-value--small">
              {analysis.outdoor_activity || "--"}
            </span>
          </div>

          <div className="stat-card stat-card--wide">
            <span className="stat-label">
              Mask Recommendation
            </span>

            <span className="stat-value stat-value--small">
              {analysis.mask_recommendation || "--"}
            </span>
          </div>

          <div className="stat-card stat-card--wide">
            <span className="stat-label">
              Sensitive Groups
            </span>

            <span className="stat-value stat-value--small">
              {analysis.sensitive_groups || "--"}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LocationDashboard;