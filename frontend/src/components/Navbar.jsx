import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div style={{ fontSize: "34px" }}>🌍</div>

        <div>
          <h2>AirIntel AI</h2>
          <p>Urban Air Intelligence Platform</p>
        </div>
      </div>

      <div className="status">
        ● LIVE DATA
      </div>
    </nav>
  );
}

export default Navbar;