import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/Dashboard"; // Assuming you have a Dashboard component
import { AnimalProvider } from "./Data/StateManagement/animalContext";
import SignUpForm from "./pages/SignUp";
import { useState } from "react";
const App: React.FC = () => {
  const [, setIsSignedUp] = useState(false);

  const onSignUpSuccess = () => {
    console.log("Sign-up was successful!");
    setIsSignedUp(true);
  };
  return (
    <AnimalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Redirect root to login */}
          <Route
            path="/signup"
            element={<SignUpForm onSignUpSuccess={onSignUpSuccess} />}
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </AnimalProvider>
  );
};

export default App;
