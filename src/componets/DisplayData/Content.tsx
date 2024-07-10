import React, { useState } from "react";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";

interface Choice {
  name: string;
  code: string;
}

interface TemplateDemoProps {
  onChoiceSelect: (choice: Choice) => void;
}

const TemplateDemo: React.FC<TemplateDemoProps> = ({ onChoiceSelect }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const countries: Choice[] = [
    { name: "Location", code: "AU" },
    { name: "Animals", code: "BR" },
    { name: "Device", code: "CN" },
    { name: "Messages", code: "EG" },
    { name: "Register", code: "RE" },
  ];

  const handleChange = (e: ListBoxChangeEvent) => {
    setSelectedChoice(e.value);
    onChoiceSelect(e.value);
  };

  return (
    <div className="flex justify-content-center">
      <ListBox
        value={selectedChoice}
        onChange={handleChange}
        options={countries}
        optionLabel="name"
        className="w-full md:w-14rem"
        listStyle={{ height: "550px" }}
      />
    </div>
  );
};

export default TemplateDemo;
