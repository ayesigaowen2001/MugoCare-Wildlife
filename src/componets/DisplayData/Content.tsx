import React, { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import "./content.css";

interface Choice {
  name: string;
  code: string | JSX.Element;
}

interface TemplateDemoProps {
  onChoiceSelect: (choice: Choice) => void;
  isHovered: boolean;
}

const TemplateDemo: React.FC<TemplateDemoProps> = ({
  onChoiceSelect,
  isHovered,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const countries: Choice[] = [
    {
      name: "Location",
      code: <MaterialSymbol icon="location_on" className="circular-icon" />,
    },
    {
      name: "Animals",
      code: <MaterialSymbol icon="cruelty_free" className="circular-icon" />,
    },
    {
      name: "Device",
      code: <MaterialSymbol icon="devices" className="circular-icon" />,
    },
    {
      name: "Messages",
      code: <MaterialSymbol icon="sms" className="circular-icon" />,
    },
    {
      name: "Register",
      code: (
        <MaterialSymbol icon="app_registration" className="circular-icon" />
      ),
    },
  ];

  const handleClick = (choice: Choice) => {
    setSelectedChoice(choice);
    onChoiceSelect(choice);
  };

  return (
    <div className="template-demo-container flex justify-content-center">
      {countries.map((option) => (
        <div
          key={option.name}
          className={`option-item p-d-flex p-ai-center ${
            selectedChoice?.name === option.name ? "selected" : ""
          }`}
          onClick={() => handleClick(option)}
        >
          {typeof option.code === "string" ? (
            <span className="text-white">{option.code}</span>
          ) : (
            option.code
          )}
          {isHovered && (
            <span className="p-ml-2 text-white">{option.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TemplateDemo;
