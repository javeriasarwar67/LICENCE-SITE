import { useState } from "react";
import "./Auth.css";
import { FaGoogle, FaGithub, FaMicrosoft } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";

function LoginForm({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", { email, password });
    onLoginSuccess(email);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-logo">
        <span className="auth-logo-icon">
          <HiOutlineShieldCheck size={20} />
        </span>
        <h2>The Lighthouse</h2>
      </div>

      <h1>Welcome Back</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

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

        <button type="submit" className="auth-submit-btn">
          Log in
        </button>
      </form>

      <p className="auth-divider">or log in with</p>

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

      <p className="auth-switch-link">
        Don't have an account?
        <span onClick={onSwitchToSignup}> Sign up</span>
      </p>
    </div>
  );
}

export default LoginForm;