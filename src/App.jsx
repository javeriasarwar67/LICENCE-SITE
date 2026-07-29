import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";
import Footer from "./components/Footer/Footer";
import AuthPage from "./components/Auth/AuthPage";

function HomePage() {
  return (
    <div>
      <Hero />
      <Footer />
    </div>
  );
}

function ApplyPage() {
  return (
    <div>
      <ApplicationForm />
      <Footer />
    </div>
  );
}

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [user, setUser] = useState(null);

  const openSignIn = () => {
    setAuthMode("login");
    setShowAuth(true);
  };

  const openSignUp = () => {
    setAuthMode("signup");
    setShowAuth(true);
  };

  if (showAuth && !user) {
    return (
      <AuthPage
        initialMode={authMode}
        onAuthComplete={(email) => {
          setUser(email);
          setShowAuth(false);
        }}
      />
    );
  }

  return (
    <div>
      <Navbar onSignInClick={openSignIn} onSignUpClick={openSignUp} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Routes>
    </div>
  );
}

export default App;