import React, { useState } from "react";
import TemplateDemo from "../../componets/DisplayData/Content";
import MainContent from "../../componets/DisplayData/MainContent"; // Assuming MainContentProps is defined in MainContent component

interface Choice {
  name: string;
  code: string;
}

const App: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  return (
    <div>
      <TemplateDemo onChoiceSelect={setSelectedChoice} />
      {/* Pass customerToken as a prop to MainContent */}
      <MainContent selectedChoice={selectedChoice} customerToken={""} />
    </div>
  );
};

export default App;
