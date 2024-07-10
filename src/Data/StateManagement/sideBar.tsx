import React, { useState } from "react";
import ToolBar from "../../componets/Toolbar";
import CustomSidebar from "../../componets/Sidebars/Sidebar";

const ParentComponent: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const handleGeofenceClick = () => {
    // Implement your logic here for geofence click
    throw new Error("Function not implemented.");
  };

  return (
    <div>
      <ToolBar toggleSidebar={toggleSidebar} />
      <CustomSidebar
        visible={visible}
        onHide={() => setVisible(false)}
        onGeofenceClick={handleGeofenceClick} // Pass handler function
      />
    </div>
  );
};

export default ParentComponent;
