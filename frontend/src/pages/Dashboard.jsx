import { useState } from "react";

import "../styles/dashboard.css";

import Navbar from "../components/Navbar";
import MapView from "../components/MapView";
import LocationDashboard from "../components/LocationDashboard";

function Dashboard() {

  const [selectedLocation,setSelectedLocation]=useState(null);

  return (
    <>
      <Navbar/>

      <div className="dashboard">

        <MapView
          onLocationSelect={setSelectedLocation}
        />

        <LocationDashboard
          location={selectedLocation}
        />

      </div>
    </>
  );
}

export default Dashboard;