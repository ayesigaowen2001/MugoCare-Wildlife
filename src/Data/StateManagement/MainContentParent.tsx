import React, { useState } from "react";
import TemplateDemo from "../../componets/DisplayData/Content";
import MainContent from "../../componets/DisplayData/MainContent"; // Assuming MainContentProps is defined in MainContent component

interface Choice {
  name: string;
  code: string | JSX.Element;
}

interface AppProps {
  filterdDatas: any[];
}

const App: React.FC<AppProps> = ({ filterdDatas }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TemplateDemo
          onChoiceSelect={setSelectedChoice}
          isHovered={isHovered}
        />
      </div>
      <MainContent
        filterdDatas={filterdDatas}
        selectedChoice={selectedChoice}
        customerToken={""}
      />
    </div>
  );
};

export default App;
