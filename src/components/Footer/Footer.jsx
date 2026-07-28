import {
  HiOutlineShieldCheck,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const SERVICES_LINKS = [
  { label: "Trade Licence Renewal", href: "#services" },
  { label: "Emirates ID Processing", href: "#services" },
  { label: "Passport Support", href: "#services" },
  { label: "Visa Assistance", href: "#services" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top grid */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-col footer-brand">
            <a href="#home" className="footer-logo">
              <span className="footer-logo-icon">
                <HiOutlineShieldCheck size={22} />
              </span>
              <span className="footer-logo-text">
               The Lighthouse
                <small>Licence & Passport Services</small>
              </span>
            </a>
            <p className="footer-about">
              Trusted support for UAE trade licence, Emirates ID, and
              passport processing — handled quickly, accurately, and with
              full transparency at every step.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                <FaFacebookF size={15} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram size={15} />
              </a>
              <a href="#" aria-label="WhatsApp">
                <FaWhatsapp size={16} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Get In Touch</h4>
            <ul className="footer-contact">
              <li>
                <HiOutlinePhone size={16} />
                <span>+971 50 000 0000</span>
              </li>
              <li>
                <HiOutlineEnvelope size={16} />
                <span>info@alyaqeen.ae</span>
              </li>
              <li>
                <HiOutlineMapPin size={16} />
                <span>Dubai, United Arab Emirates</span>
              </li>
            </ul>
            <a href="#contact" className="footer-cta">
              Get Started
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>
            © {year} The Lighthouse Licence & Passport Services. All Rights
            Reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}