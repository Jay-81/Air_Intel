function LocationDashboard({ location }) {
  if (!location) {
    return (
      <div
        style={{
          width: "30%",
          background: "#0F172A",
          color: "white",
          padding: "25px",
          overflowY: "auto",
        }}
      >
        <h2>🛰 AirIntel Insights</h2>
        <hr />

        <h3>No Location Selected</h3>

        <p>
          Click on any AQI marker to view AI-generated insights,
          pollution sources, forecast and recommendations.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "30%",
        background: "#0F172A",
        color: "white",
        padding: "25px",
        overflowY: "auto",
      }}
    >
      <h2>🛰 AirIntel Insights</h2>

      <hr />

      <h2>{location.name}</h2>

      <p>
        <strong>AQI:</strong> {location.aqi}
      </p>

      <p>
        <strong>Status:</strong> {location.status}
      </p>

      <p>
        <strong>Major Cause:</strong> {location.cause}
      </p>

      <hr />

      <h3>🤖 AI Summary</h3>

      <p>
        Air quality in <strong>{location.name}</strong> is currently{" "}
        <strong>{location.status}</strong>. Pollution is mainly influenced by{" "}
        <strong>{location.cause}</strong>.
      </p>

      <hr />

      <h3>📈 24-Hour Forecast</h3>

      <ul>
        <li>Morning : {location.aqi - 8}</li>
        <li>Afternoon : {location.aqi}</li>
        <li>Evening : {location.aqi + 10}</li>
      </ul>

      <hr />

      <h3>❤️ Health Advice</h3>

      <ul>
        <li>Wear a mask outdoors.</li>
        <li>Avoid prolonged outdoor activities.</li>
        <li>Stay hydrated.</li>
      </ul>
    </div>
  );
}

export default LocationDashboard;