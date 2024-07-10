// Header.jsx

import { Menubar } from "primereact/menubar";

const Header = () => {
  const items = [
    {
      label: "Your App Name",
      icon: "pi pi-home",
      command: () => {
        // Handle click event
      },
    },
    // Add more menu items as needed
  ];

  return (
    <div>
      <Menubar model={items} style={headerStyle} />
    </div>
  );
};

const headerStyle = {
  background: "#333",
  color: "#fff",
};

export default Header;
