import React, { useState } from "react";
import Navbar from "../componets/Menubars/Menubar";
import TemplateDemo from "../componets/DisplayData/Content";
import MainContent from "../componets/DisplayData/MainContent";
import Notifications from "../componets/Notifications/Notifications";
import CustomSidebar from "../componets/Sidebars/Sidebar";
import ResizableDialog from "../Geofencing/geoofencingDialogbox";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Choice {
  name: string;
  code: string;
}

const Basic: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
  const [dialogVisible, setDialogVisible] = useState(false); // State for dialog visibility

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Show dialog containing BingMap when Geofence button is clicked
  const handleGeofenceClick = () => {
    setDialogVisible(true);
    setSidebarVisible(false); // Optionally hide sidebar when geofence is clicked
  };

  // Hide dialog
  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <>
      <div>
        <Navbar toggleSidebar={toggleSidebar} />{" "}
        {/* Pass toggleSidebar function */}
      </div>
      <CustomSidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        onGeofenceClick={handleGeofenceClick} // Pass handleGeofenceClick function
      />
      <div className="grid">
        <div className="col-2 pt-2">
          <div className="text-center p-3 border-round-sm bg-gray-800 font-bold">
            <TemplateDemo onChoiceSelect={setSelectedChoice} />
          </div>
        </div>
        <div className="grid">
          <div className="col-8" style={{ width: "800px", height: "500px" }}>
            <div className="text-center p-2 border-round-sm bg-blue-100 font-bold">
              <MainContent selectedChoice={selectedChoice} customerToken={""} />
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="text-center p-2 border-round-sm primary-reverse font-bold">
            <Notifications />
          </div>
        </div>
      </div>

      {/* Dialog containing BingMap */}
      <ResizableDialog visible={dialogVisible} onHide={hideDialog} />
    </>
  );
};

export default Basic;
