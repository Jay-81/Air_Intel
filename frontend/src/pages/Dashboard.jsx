import { useState } from "react";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import LocationDashboard from "../components/LocationDashboard";

import "../styles/dashboard.css";

function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard">
        <div className="map-section">
          <MapView onLocationSelect={setSelectedLocation} />
        </div>

        <div className="side-panel">
          <LocationDashboard location={selectedLocation} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
