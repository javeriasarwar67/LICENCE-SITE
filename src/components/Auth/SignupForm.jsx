import { useState } from "react";
import "./Auth.css";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";

function getPasswordStrength(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  let label = "Weak";
  if (passedCount === 5) label = "Strong";
  else if (passedCount >= 3) label = "Medium";

  const isStrong =
    checks.length &&
    checks.uppercase &&
    checks.lowercase &&
    checks.number &&
    checks.special;

  return { checks, passedCount, label, isStrong };
}

function SignupForm({ onSwitchToLogin, onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.toLowerCase().endsWith("@gmail.com")) {
      setEmailError("Please use a valid Gmail address (e.g. name@gmail.com)");
      return;
    }
    setEmailError("");

    if (!strength.isStrong) {
      setPasswordError(
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character"
      );
      return;
    }
    setPasswordError("");

    const fakeCode = Math.floor(100000 + Math.random() * 900000);
    console.log("Creating account:", { email, password });
    console.log("OTP sent (demo):", fakeCode, "to", email);

    onSignupSuccess(email);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-logo">
        <span className="auth-logo-icon">
          <HiOutlineShieldCheck size={20} />
        </span>
        <h2>The Lighthouse</h2>
      </div>

      <h1>Create Account</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <p className="auth-error">{emailError}</p>}

        <div className="auth-password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <FiEyeOff
              className="auth-eye-icon"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FiEye
              className="auth-eye-icon"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {password && (
          <div className="auth-password-strength">
            <div className="auth-strength-bar">
              <div
                className={`auth-strength-fill strength-${strength.label.toLowerCase()}`}
                style={{ width: `${(strength.passedCount / 5) * 100}%` }}
              />
            </div>
            <span
              className={`auth-strength-label strength-${strength.label.toLowerCase()}`}
            >
              {strength.label}
            </span>
          </div>
        )}

        {passwordError && <p className="auth-error">{passwordError}</p>}

        <button type="submit" className="auth-submit-btn">
          Create account
        </button>
      </form>

      <p className="auth-divider">or sign up with</p>

      <div className="auth-social-icons">
        <button type="button">
          <FaGoogle />
        </button>
        <button type="button">
          <FaMicrosoft />
        </button>
        <button type="button">
          <FaGithub />
        </button>
      </div>

      <p className="auth-terms">
        By creating an account you agree to our
        <span> Terms of Service </span>
        and
        <span> Privacy Policy.</span>
      </p>

      <p className="auth-switch-link">
        Have an account?
        <span onClick={onSwitchToLogin}> Log in</span>
      </p>
    </div>
  );
}

export default SignupForm;