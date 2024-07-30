import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    num_animals: 0,
  });
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://wildlife-tracker.onrender.com/customer/register",
        signupData
      );
      if (response.status === 200) {
        // Save token to local storage
        localStorage.setItem("customerToken", response.data.token);

        onSignUpSuccess();
        navigate("/login");
      } else {
        setSignUpError("Sign up failed. Please try again.");
      }
    } catch (error) {
      setSignUpError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center p-d-flex p-jc-center p-ai-center signup-container">
      <Card className="signup-card m-6">
        <h2 className="ml-8">Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          {signUpError && <div className="error">{signUpError}</div>}
          <div className="p-grid p-fluid">
            <div className="p-col p-3">
              <span className="p-float-label w-full">
                <InputText
                  id="username"
                  name="username"
                  value={signupData.username}
                  onChange={handleSignupChange}
                />
                <label htmlFor="username">Username</label>
              </span>
            </div>
            <div className="p-col p-3">
              <span className="p-float-label w-full">
                <InputText
                  id="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                />
                <label htmlFor="email">Email</label>
              </span>
            </div>
            <div className="p-col p-3">
              <span className="p-float-label w-full">
                <InputText
                  id="first_name"
                  name="first_name"
                  value={signupData.first_name}
                  onChange={handleSignupChange}
                />
                <label htmlFor="first_name">First Name</label>
              </span>
            </div>
            <div className="p-col p-3">
              <span className="p-float-label w-full">
                <InputText
                  id="last_name"
                  name="last_name"
                  value={signupData.last_name}
                  onChange={handleSignupChange}
                />
                <label htmlFor="last_name">Last Name</label>
              </span>
            </div>
            <div className="p-col p-3">
              <span className="p-float-label w-full">
                <InputText
                  id="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </span>
            </div>
          </div>
          <div className="p-field">
            <Button type="submit" className="mr-6" label="Sign Up" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="p-button font-bold p-2"
              style={{ color: "white" }}
              onClick={() => navigate("/login")}
            >
              already have an account?
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

export default SignUpForm;
