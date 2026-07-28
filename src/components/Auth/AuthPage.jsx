import { useState } from "react";
import Layout from "./Layout";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import VerifyOtp from "./VerifyOtp";
import "./AuthPage.css";

function AuthPage({ initialMode = "signup", onAuthComplete }) {
  const [mode, setMode] = useState(initialMode);
  const [pendingEmail, setPendingEmail] = useState("");

  const handleSignupSuccess = (email) => {
    setPendingEmail(email);
    setMode("verify");
  };

  const handleVerified = () => {
    onAuthComplete?.(pendingEmail);
  };

  const handleLoginSuccess = (email) => {
    onAuthComplete?.(email);
  };

  return (
    <Layout>
      <div className="form-transition" key={mode}>
        {mode === "signup" && (
          <SignupForm
            onSwitchToLogin={() => setMode("login")}
            onSignupSuccess={handleSignupSuccess}
          />
        )}

        {mode === "login" && (
          <LoginForm
            onSwitchToSignup={() => setMode("signup")}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {mode === "verify" && (
          <VerifyOtp
            email={pendingEmail}
            onVerified={handleVerified}
            onBack={() => setMode("signup")}
          />
        )}
      </div>
    </Layout>
  );
}

export default AuthPage;