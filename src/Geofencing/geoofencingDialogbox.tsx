import React from "react";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import BingMap from "./setGeofence";

interface ResizableDialogProps {
  visible: boolean;
  onHide: () => void;
}

const ResizableDialog: React.FC<ResizableDialogProps> = ({
  visible,
  onHide,
}) => {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="Geofence Map"
      style={{ width: "50vw", resize: "both", overflow: "auto" }}
      className="resizable-dialog"
      draggable={true}
    >
      <BingMap />
      <div className="p-d-flex p-jc-center p-mt-2">
        <button className="p-button p-button-danger" onClick={onHide}>
          Close
        </button>
      </div>
    </Dialog>
  );
};

export default ResizableDialog;
