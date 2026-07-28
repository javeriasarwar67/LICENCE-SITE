import "./Layout.css";
import ImageSection from "./ImageSection";

function Layout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <ImageSection />
        <div className="auth-form-section">{children}</div>
      </div>
    </div>
  );
}

export default Layout;