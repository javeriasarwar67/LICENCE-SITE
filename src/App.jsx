import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import AuthPage from "./components/Auth/AuthPage";

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
      <Hero />
      <Footer />
    </div>
  );
}

export default App;