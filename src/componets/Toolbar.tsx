import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface ToolBarProps {
  toggleSidebar: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ toggleSidebar }) => {
  const startContent = (
    <div className="flex flex-row flex-wrap">
      <Button
        icon="pi pi-bars"
        rounded
        severity="secondary"
        className="left-0"
        onClick={toggleSidebar} // Toggle sidebar function
      />
      <h4 className="ml-6 font-italic">Wildlife Tracker</h4>
    </div>
  );

  const centerContent = (
    <div className="p-inputgroup p-flex-1">
      <InputText placeholder="Enter Query" className="p-mr-2" />
      <Button icon="pi pi-search" className="p-button-warning" />
    </div>
  );

  return (
    <div className="p-px-5">
      <Toolbar
        style={{ width: "700px" }}
        start={startContent}
        center={centerContent}
      />
    </div>
  );
};

export default ToolBar;
