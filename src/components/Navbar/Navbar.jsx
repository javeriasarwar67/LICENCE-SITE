import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineShieldCheck, HiOutlineUserCircle } from "react-icons/hi";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ onSignInClick, onSignUpClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [floating, setFloating] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const lastScrollY = useRef(0);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      if (currentY < 80) {
        setFloating(false);
      } else if (currentY < lastScrollY.current) {
        setFloating(true);
      } else if (currentY > lastScrollY.current) {
        setFloating(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleAccount = () => setAccountOpen((prev) => !prev);

  const handleSignIn = () => {
    setAccountOpen(false);
    closeMenu();
    onSignInClick?.();
  };

  const handleSignUp = () => {
    setAccountOpen(false);
    closeMenu();
    onSignUpClick?.();
  };

  const navClasses = [
    "navbar",
    scrolled ? "navbar-scrolled" : "",
    floating ? "navbar-floating" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClasses}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">
            <HiOutlineShieldCheck size={22} />
          </span>
          <span className="logo-text">
            The Lighthouse
            <small>Licence & Passport Services</small>
          </span>
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <div className="navbar-account" ref={accountRef}>
            <button
              className="account-icon-btn"
              onClick={toggleAccount}
              aria-label="Account menu"
            >
              <HiOutlineUserCircle size={26} />
            </button>

            <div className={`account-dropdown ${accountOpen ? "open" : ""}`}>
              <button type="button" onClick={handleSignIn}>
                Sign In
              </button>
              <button
                type="button"
                className="account-signup"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>

          <a href="#contact" className="navbar-cta">
            Contact Us
          </a>

          <button
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <div className={`navbar-overlay ${isOpen ? "open" : ""}`}>
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li key={link.label} style={{ transitionDelay: `${i * 60}ms` }}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ transitionDelay: `${NAV_LINKS.length * 60}ms` }}>
            <div className="overlay-auth">
              <button type="button" onClick={handleSignIn}>
                Sign In
              </button>
              <button type="button" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </li>
          <li style={{ transitionDelay: `${(NAV_LINKS.length + 1) * 60}ms` }}>
            <a href="#contact" className="overlay-cta" onClick={closeMenu}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}