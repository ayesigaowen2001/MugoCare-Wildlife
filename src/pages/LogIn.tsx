import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AnimalContext } from "../Data/StateManagement/animalContext";

const LogIn: React.FC = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Access the AnimalContext
  const { setAnimalData } = useContext(AnimalContext);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://wildlife-tracker.onrender.com/login/login",
        loginData
      );
      if (response.status === 200) {
        console.log(response.data);
        // Update the animalData in the context
        setAnimalData(response.data.animals);
        //console.log(setAnimalData);
        navigate("/dashboard");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setLoginError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center p-d-flex p-jc-center p-ai-center m-3 login-container">
      <Card className="login-card m-8">
        <h2 className="ml-8 mb-8">Log In</h2>
        <form onSubmit={handleLoginSubmit}>
          {loginError && <div className="error">{loginError}</div>}
          <div className="p-grid p-fluid">
            <div className="p-col m-4">
              <span className="p-float-label">
                <InputText
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
            <div className="p-col">
              <span className="p-float-label m-4">
                <InputText
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  type="password"
                  autoComplete="current-password"
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
          </div>
          <div className="p-field">
            <Button className="mt-3" type="submit" label="Log In" />
            <a
              // target="_blank"
              // rel="noopener noreferrer"
              className="p-button font-bold p-2 ml-4"
              onClick={() => navigate("/signup")}
              style={{ color: "white" }}
            >
              Don't have an account?
            </a>
          </div>
        </form>
        {loading && (
          <div className="p-d-flex p-jc-center p-ai-center">
            <i className="pi pi-spin pi-spinner" style={{ fontSize: "2em" }} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default LogIn;
