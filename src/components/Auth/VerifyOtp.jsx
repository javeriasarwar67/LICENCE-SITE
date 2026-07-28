import { useState, useRef } from "react";
import "./Auth.css";
import { HiOutlineShieldCheck } from "react-icons/hi";

function VerifyOtp({ email, onVerified, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      setError("Please enter the full 6-digit code");
      return;
    }

    console.log("Verifying OTP:", code, "for", email);
    onVerified();
  };

  const handleResend = () => {
    const fakeCode = Math.floor(100000 + Math.random() * 900000);
    console.log("Resent OTP (demo):", fakeCode, "to", email);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="auth-form-container">
      <div className="auth-logo">
        <span className="auth-logo-icon">
          <HiOutlineShieldCheck size={20} />
        </span>
        <h2>The Lighthouse</h2>
      </div>

      <h1>Verify your email</h1>

      <p className="auth-otp-subtitle">
        We sent a 6-digit code to <strong>{email}</strong>
      </p>

      <form className="auth-form" onSubmit={handleVerify}>
        <div className="auth-otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="auth-otp-box"
            />
          ))}
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-submit-btn">
          Verify
        </button>
      </form>

      <p className="auth-switch-link">
        Didn't get a code?
        <span onClick={handleResend}> Resend</span>
      </p>

      <p
        className="auth-switch-link"
        onClick={onBack}
        style={{ cursor: "pointer", marginTop: "10px" }}
      >
        ← Back
      </p>
    </div>
  );
}

export default VerifyOtp;