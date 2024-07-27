import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./sidebar.css";

export interface CustomSidebarProps {
  visible: boolean;
  onHide: () => void;
  onGeofenceClick: () => void; // Callback for geofence button click
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({
  visible,
  onHide,
  onGeofenceClick,
}) => {
  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      className="p-sidebar-left bg-gray-700"
    >
      <div className="flex justify-content-center" style={{ height: "100vh" }}>
        <Card className="h-full w-full">
          <div className="p-d-flex p-jc-center mt-2 p-mb-3">
            {/* <h4 className="text-black">Settings</h4> */}
          </div>
          <div className="grid p-d-flex p-jc-center">
            <div className="grid-template">
              <Button
                className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
                onClick={onGeofenceClick} // Call parent's handler
              >
                <i className="pi pi-globe icon-style"></i>
                <span className="label-style">Geofence</span>
              </Button>
              <Button
                className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
                onClick={() => console.log("Settings clicked")} // Replace with your handler
              >
                <i className="pi pi-cog icon-style"></i>
                <span className="label-style">Settings</span>
              </Button>
              <Button
                className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
                onClick={() => console.log("Profile clicked")} // Replace with your handler
              >
                <i className="pi pi-user icon-style"></i>
                <span className="label-style">Profile</span>
              </Button>
              <Button
                className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
                onClick={() => console.log("Notifications clicked")} // Replace with your handler
              >
                <i className="pi pi-bell icon-style"></i>
                <span className="label-style">Notifications</span>
              </Button>
              <Button
                className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
                onClick={() => console.log("Help clicked")} // Replace with your handler
              >
                <i className="pi pi-question icon-style"></i>
                <span className="label-style">Help</span>
              </Button>
              <Button
                className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
                onClick={() => console.log("Logout clicked")} // Replace with your handler
              >
                <i className="pi pi-power-off icon-style"></i>
                <span className="label-style">Logout</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Sidebar>
  );
};

export default CustomSidebar;
