import { Satellite } from "lucide-react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <Satellite size={22} strokeWidth={2} />
        </div>

        <div className="navbar-title">
          <h1>
            AirIntel <span className="navbar-accent">AI</span>
          </h1>
          <p>Urban Air Intelligence Platform</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="live-status">
          <span className="live-dot"></span>
          <span>LIVE DATA</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
