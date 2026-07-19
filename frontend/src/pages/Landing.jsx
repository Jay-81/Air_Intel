import { useNavigate } from "react-router-dom";
import {
  Wind,
  Satellite,
  Brain,
  Gauge,
  ShieldCheck,
  MapPin,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import "../styles/landing.css";

const features = [
  {
    icon: MapPin,
    title: "Live City Map",
    description:
      "Explore an interactive map of monitoring zones with real-time AQI markers across the city.",
  },
  {
    icon: Brain,
    title: "AI-Generated Insights",
    description:
      "Get instant, AI-written summaries that explain what's happening in the air around you.",
  },
  {
    icon: Wind,
    title: "Pollution Source Analysis",
    description:
      "Understand the major contributing causes behind poor air quality in any location.",
  },
  {
    icon: Gauge,
    title: "24-Hour Forecasts",
    description:
      "See how air quality is expected to shift through morning, afternoon and evening.",
  },
  {
    icon: ShieldCheck,
    title: "Health Recommendations",
    description:
      "Receive practical, easy-to-follow guidance to protect yourself on high-pollution days.",
  },
  {
    icon: Satellite,
    title: "Urban Intelligence",
    description:
      "A unified command center for monitoring and understanding air quality at city scale.",
  },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-glow landing-glow--one"></div>
      <div className="landing-glow landing-glow--two"></div>

      <header className="landing-nav">
        <div className="landing-nav-logo">
          <Satellite size={20} strokeWidth={2} />
          <span>AirIntel AI</span>
        </div>
        <a href="#features" className="landing-nav-link">
          Features
        </a>
      </header>

      <section className="landing-hero">
        <div className="landing-badge">
          <span className="landing-badge-dot"></span>
          AI-Powered · Real-Time Air Intelligence
        </div>

        <h1 className="landing-title">
          Breathe Smarter with{" "}
          <span className="landing-title-accent">AirIntel</span>
        </h1>

        <p className="landing-subtitle">
          AI Powered Urban Air Intelligence Platform. Track live air quality,
          uncover pollution sources, and get AI-generated forecasts and health
          guidance for your city — all in one place.
        </p>

        <div className="landing-cta-row">
          <button
            className="landing-cta-primary"
            onClick={() => navigate("/dashboard")}
          >
            Launch AirIntel
            <ArrowRight size={18} strokeWidth={2.2} />
          </button>

          <a href="#features" className="landing-cta-secondary">
            Explore Features
            <ChevronDown size={16} strokeWidth={2.2} />
          </a>
        </div>
      </section>

      <section id="features" className="landing-features">
        <div className="landing-features-header">
          <span className="landing-section-eyebrow">Capabilities</span>
          <h2>Everything you need to understand your air</h2>
        </div>

        <div className="landing-features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div className="feature-card" key={feature.title}>
                <div className="feature-card-icon">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="landing-footer">
        <p>AirIntel AI — Urban Air Intelligence Platform</p>
      </footer>
    </div>
  );
}

export default Landing;
