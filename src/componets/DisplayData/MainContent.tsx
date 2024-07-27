import React from "react";
import { Card } from "primereact/card";
// import Location from "../Location/Location";
import AnimalList from "../../Data/DataVisualisation/AnimalList";
import MapComponent from "../Location/bingmaps.d";
import AnimalRegistrationForm from "../Forms/RegistrationForm";
import "./mainContent.css";
interface Choice {
  name: string;
  code: string | JSX.Element;
}

interface MainContentProps {
  selectedChoice: Choice | null;
  customerToken: string; // Add this prop to MainContentProps
  filterdDatas: any[];
}

const MainContent: React.FC<MainContentProps> = ({
  selectedChoice,
  customerToken,
  filterdDatas,
}) => {
  let content: JSX.Element | null = null;

  if (selectedChoice) {
    switch (selectedChoice.name) {
      case "Location":
        content = <MapComponent filterdDatas={filterdDatas} />;
        break;
      case "Animals":
        content = <AnimalList />;
        break;
      case "Register":
        content = <AnimalRegistrationForm customerToken={customerToken} />;
        break;
      // Add more cases for other choices as needed
      default:
        content = null; // Render default component if no match
    }
  }

  return (
    <div
      className="card flex justify-content-center"
      style={{ height: "530px" }}
    >
      {selectedChoice && content && (
        <Card
          className="w-full h-full"
          header={
            <div className="custom-card-title mt-2">{selectedChoice.name}</div>
          }
        >
          {content}
        </Card>
      )}
    </div>
  );
};

export default MainContent;
