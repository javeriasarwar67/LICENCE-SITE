import "./ImageSection.css";
import heroImage from "../../assets/hero-placeholder.jpg";

function ImageSection() {
  return (
    <div className="auth-image-section">
      <img src={heroImage} alt="UAE Licence and Passport Services" />
      <div className="auth-image-overlay">
        <span className="auth-image-badge">
          🇦🇪 The Lighthouse — Licence & Passport Services
        </span>
      </div>
    </div>
  );
}

export default ImageSection;