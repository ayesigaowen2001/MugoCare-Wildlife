import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

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
          <div className="p-d-flex p-jc-center p-mb-3">
            <h4 className="text-black">Settings</h4>
          </div>
          <div className="p-d-flex p-flex-column p-ai-center">
            {/* Other buttons */}
            <Button
              icon="pi pi-globe"
              label="Geofence"
              className="p-button-text p-d-flex p-flex-column p-ai-center p-mt-3"
              style={{ color: "black" }}
              onClick={onGeofenceClick} // Call parent's handler
            />
          </div>
        </Card>
      </div>
    </Sidebar>
  );
};

export default CustomSidebar;
