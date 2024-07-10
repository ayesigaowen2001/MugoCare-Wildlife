import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/saga-blue/theme.css"; // Import PrimeReact theme
import "primereact/resources/primereact.min.css"; // Import PrimeReact CSS
// Import PrimeFlex

interface MenubarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<MenubarProps> = ({ toggleSidebar }) => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
    },
    {
      label: "Logout",
      icon: "pi pi-power-off",
    },
  ];

  const startContent = (
    <div className="flex flex-row flex-wrap items-center">
      <Button
        icon="pi pi-bars"
        rounded
        severity="secondary"
        className="mx-2 m-auto"
        onClick={toggleSidebar} // Toggle sidebar function
      />
      <h4 className="mx-2 font-italic m-auto">Wildlife Tracker</h4>
    </div>
  );

  const centerContent = (
    <div className="p-inputgroup mx-2 h-3rem m-auto">
      <InputText placeholder="Enter Query" />
      <Button icon="pi pi-search" className="p-button-warning " />
    </div>
  );

  return (
    <div className="card bg-teal-100">
      {" "}
      {/* PrimeFlex class for background color */}
      <div
        className="flex justify-content-between items-center"
        style={{ width: "100%" }}
      >
        {startContent}
        <div className="flex-1 flex justify-content-center">
          {centerContent}
        </div>
        <Menubar
          model={items}
          className="flex justify-content-end bg-teal-100"
        />{" "}
        {/* PrimeFlex class for background color */}
      </div>
    </div>
  );
};

export default Navbar;
