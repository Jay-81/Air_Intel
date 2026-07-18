import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        background: "#0F172A",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "60px" }}> AirIntel</h1>

      <p>AI Powered Urban Air Intelligence Platform</p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Launch AirIntel
      </button>
    </div>
  );
}

export default Landing;