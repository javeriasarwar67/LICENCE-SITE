import {
  HiOutlineDocumentCheck,
  HiOutlineIdentification,
  HiOutlineGlobeAlt,
  HiArrowRight,
} from "react-icons/hi2";
import "./Hero.css";

const QUICK_SERVICES = [
  { icon: <HiOutlineDocumentCheck size={20} />, label: "Trade Licence" },
  { icon: <HiOutlineIdentification size={20} />, label: "Emirates ID" },
  { icon: <HiOutlineGlobeAlt size={20} />, label: "Passport Support" },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Decorative background shapes */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>

      <div className="hero-container">
        <span className="hero-badge">🇦🇪 Trusted UAE Document Experts</span>

        <h1 className="hero-title">
          Licence & Passport Work,
          <br />
          <span>Handled Simply</span>
        </h1>

        <p className="hero-subtext">
          From trade licence renewals to passport and Emirates ID processing —
          we take care of the paperwork, approvals, and follow-ups so you
          don't have to worry about a thing.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Get Started <HiArrowRight size={18} />
          </a>
          <a href="#services" className="btn-secondary">
            Explore Services
          </a>
        </div>

        {/* Quick service pills */}
        <div className="hero-quick-services">
          {QUICK_SERVICES.map((item) => (
            <div className="quick-service-pill" key={item.label}>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Stat cards */}
        <div className="hero-stats-row">
          <div className="hero-stat-card">
            <h3>500+</h3>
            <p>Applications Processed</p>
          </div>
          <div className="hero-stat-card">
            <h3>24-48h</h3>
            <p>Average Turnaround</p>
          </div>
          <div className="hero-stat-card">
            <h3>4.9★</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}