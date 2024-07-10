import React from "react";
import { Card } from "primereact/card";
// import Location from "../Location/Location";
import AnimalList from "../../Data/DataVisualisation/AnimalList";
import MapComponent from "../Location/bingmaps.d";
import AnimalRegistrationForm from "../Forms/RegistrationForm";

interface Choice {
  name: string;
  code: string;
}

interface MainContentProps {
  selectedChoice: Choice | null;
  customerToken: string; // Add this prop to MainContentProps
}

const MainContent: React.FC<MainContentProps> = ({
  selectedChoice,
  customerToken,
}) => {
  let content: JSX.Element | null = null;

  if (selectedChoice) {
    switch (selectedChoice.code) {
      case "AU":
        content = <MapComponent />;
        break;
      case "BR":
        content = <AnimalList />;
        break;
      case "RE":
        content = <AnimalRegistrationForm customerToken={customerToken} />; // Pass customerToken prop here
        break;
      // Add more cases for other choices as needed
      default:
        content = <MapComponent />; // Render default component if no match
    }
  }

  return (
    <div
      className="card flex justify-content-center"
      style={{ height: "100vh" }}
    >
      {selectedChoice && content && (
        <Card className="w-full" title={"Animal " + selectedChoice.name}>
          {content}
        </Card>
      )}
    </div>
  );
};

export default MainContent;
