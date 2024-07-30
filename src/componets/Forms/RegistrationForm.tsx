import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./registration.css";
import axios from "axios";

interface AnimalRegistrationFormProps {
  customerToken: string;
}

const AnimalRegistrationForm: React.FC<AnimalRegistrationFormProps> = () => {
  const [animalData, setAnimalData] = useState({
    name: "",
    species: "",
    gender: "",
    owner_id: 0,
  });
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleAnimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleAnimalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const customerToken = localStorage.getItem("customerToken");
      if (!customerToken) {
        throw new Error("No customer token found");
      }

      const response = await axios.post(
        "https://wildlife-tracker.onrender.com/animal/animals",
        animalData,
        {
          headers: {
            Authorization: `Bearer ${customerToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Registration successful
        console.log("Animal registered successfully:", response.data);
      } else {
        // Registration failed
        setRegistrationError("Registration failed. Please try again.");
      }
    } catch (error) {
      setRegistrationError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-content-center p-d-flex p-jc-center p-ai-center registration-container"
      style={{ width: 500, height: 430 }}
    >
      {/* <Card className="registration-card " style={{ width: 600 }}> */}
      {/* <h2>Register Animal</h2> */}
      <form
        onSubmit={handleAnimalSubmit}
        style={{ width: 600 }}
        className="form-group"
      >
        {registrationError && <div className="error">{registrationError}</div>}
        <div className="p-grid p-fluid">
          <div className="p-col p-3">
            <span className="p-float-label w-full">
              <InputText
                id="name"
                name="name"
                value={animalData.name}
                onChange={handleAnimalChange}
              />
              <label htmlFor="name">Name</label>
            </span>
          </div>
          <div className="p-col p-3">
            <span className="p-float-label w-full">
              <InputText
                id="species"
                name="species"
                value={animalData.species}
                onChange={handleAnimalChange}
              />
              <label htmlFor="species">Species</label>
            </span>
          </div>
          <div className="p-col p-3">
            <span className="p-float-label w-full">
              <InputText
                id="gender"
                name="gender"
                value={animalData.gender}
                onChange={handleAnimalChange}
              />
              <label htmlFor="gender">Gender</label>
            </span>
          </div>
          <div className="p-col p-3">
            <span className="p-float-label w-full">
              <InputText
                id="owner_id"
                name="owner_id"
                value={animalData.owner_id.toString()}
                onChange={handleAnimalChange}
              />
              <label htmlFor="owner_id">Owner ID</label>
            </span>
          </div>
        </div>
        <div className="p-field">
          <Button type="submit" className="mr-6" label="Register Animal" />
        </div>
      </form>
      {loading && (
        <div className="p-d-flex p-jc-center p-ai-center">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "2em" }} />
        </div>
      )}
      {/* </Card> */}
    </div>
  );
};

export default AnimalRegistrationForm;
