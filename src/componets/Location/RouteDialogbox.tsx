import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css"; // PrimeIcons

interface RouteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  routeLocations: { latitude: number; longitude: number }[];
}

// Extend the Window interface to include the optional initializeMap function
declare global {
  interface Window {
    initializeMap?: () => void;
  }
}

const RouteDialog: React.FC<RouteDialogProps> = ({
  isOpen,
  onClose,
  routeLocations,
}) => {
  useEffect(() => {
    const initializeMap = () => {
      if (window.Microsoft && window.Microsoft.Maps) {
        const map = new window.Microsoft.Maps.Map("#routeMap", {
          credentials: "YOUR_BING_MAPS_API_KEY", // Replace with your Bing Maps API key
        });

        const locations = routeLocations.map(
          (coord) =>
            new window.Microsoft.Maps.Location(coord.latitude, coord.longitude)
        );

        if (locations.length > 0) {
          const polyline = new window.Microsoft.Maps.Polyline(locations, {
            strokeColor: "red",
            strokeThickness: 3,
          });

          map.entities.push(polyline);

          if (locations.length > 1) {
            const bounds =
              window.Microsoft.Maps.LocationRect.fromLocations(locations);
            map.setView({ bounds });
          } else if (locations.length === 1) {
            map.setView({ center: locations[0], zoom: 15 });
          }
        }
      }
    };

    const loadBingMapsScript = () => {
      if (!window.Microsoft || !window.Microsoft.Maps) {
        const script = document.createElement("script");
        script.src = `https://www.bing.com/api/maps/mapcontrol?callback=initializeMap&key=YOUR_BING_MAPS_API_KEY`; // Replace with your Bing Maps API key
        script.async = true;
        script.defer = true;

        window.initializeMap = initializeMap;

        script.onload = initializeMap;

        document.body.appendChild(script);

        return () => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          if (window.initializeMap) {
            delete window.initializeMap;
          }
        };
      } else {
        initializeMap();
      }
    };

    if (isOpen && routeLocations.length > 0) {
      loadBingMapsScript();
    }
  }, [isOpen, routeLocations]);

  return (
    <Dialog
      header="Route Map"
      visible={isOpen}
      style={{ width: "80vw" }}
      onHide={onClose}
    >
      <div
        id="routeMap"
        style={{ width: "100%", height: "600px", backgroundColor: "gray" }}
      ></div>
    </Dialog>
  );
};

export default RouteDialog;
