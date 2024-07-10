import React, { useEffect, useRef, useContext, useState } from "react";
import {
  AnimalContext,
  AnimalContextType,
} from "../../Data/StateManagement/animalContext";
import RouteDialog from "./RouteDialogbox"; // Import your dialog component

declare global {
  interface Window {
    Microsoft: any;
    GetMap: (() => void) | null;
  }
}

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { animalData } = useContext<AnimalContextType>(AnimalContext);
  const [scriptError, setScriptError] = useState<boolean>(false);
  const [routeDialogOpen, setRouteDialogOpen] = useState<boolean>(false);
  const [routeLocations, setRouteLocations] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  useEffect(() => {
    const loadMap = () => {
      if (!window.Microsoft || !window.Microsoft.Maps) {
        console.error("Bing Maps SDK not loaded.");
        return;
      }

      const mapOptions = {
        credentials: "YOUR_BING_MAPS_API_KEY", // Replace with your Bing Maps API key
        center: new window.Microsoft.Maps.Location(47.6, -122.33), // Example initial center
        mapTypeId: window.Microsoft.Maps.MapTypeId.road,
        zoom: 10,
      };

      const map = new window.Microsoft.Maps.Map(mapRef.current, mapOptions);

      const infobox = new window.Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false,
      });

      infobox.setMap(map);

      let pushpinLocations: Microsoft.Maps.Location[] = [];

      animalData.forEach((animal) => {
        if (animal.gps_locations.length > 0) {
          const lastLocations = animal.gps_locations.slice(-6).reverse();

          const routeLocations = lastLocations.map((loc: any) => ({
            latitude: parseFloat(loc.latitude),
            longitude: parseFloat(loc.longitude),
          }));

          const pinLocation = new window.Microsoft.Maps.Location(
            parseFloat(lastLocations[0].latitude),
            parseFloat(lastLocations[0].longitude)
          );

          const pin = new window.Microsoft.Maps.Pushpin(pinLocation);

          pin.metadata = {
            title: animal.animal.name,
            description: `Species: ${animal.animal.species}, Gender: ${animal.animal.gender}`,
            routeLocations: routeLocations,
          };

          window.Microsoft.Maps.Events.addHandler(pin, "click", (e: any) => {
            if (e.target.metadata) {
              infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true,
              });
            }
          });

          window.Microsoft.Maps.Events.addHandler(pin, "dblclick", (e: any) => {
            if (
              e.target.metadata &&
              e.target.metadata.routeLocations &&
              e.target.metadata.routeLocations.length > 0
            ) {
              setRouteLocations(e.target.metadata.routeLocations);
              setRouteDialogOpen(true);
            }
          });

          map.entities.push(pin);
          pushpinLocations.push(pin.getLocation());
        }
      });

      // Calculate the center of all pushpin locations
      if (pushpinLocations.length > 0) {
        let bounds =
          window.Microsoft.Maps.LocationRect.fromLocations(pushpinLocations);
        map.setView({ bounds: bounds, padding: 40 });
      }
    };

    const loadBingMapsScript = () => {
      const existingScript = document.querySelector(
        `script[src*="bing.com/api/maps/mapcontrol"]`
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=YOUR_BING_MAPS_API_KEY`; // Replace with your Bing Maps API key
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setScriptError(false);
          window.GetMap = loadMap;
          loadMap();
        };

        script.onerror = () => {
          console.error("Failed to load Bing Maps SDK.");
          setScriptError(true);
        };

        document.body.appendChild(script);

        return () => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
          window.GetMap = null;
        };
      } else {
        window.GetMap = loadMap;
        loadMap();

        return () => {
          window.GetMap = null;
        };
      }
    };

    const cleanup = loadBingMapsScript();

    return cleanup;
  }, [animalData]);

  return (
    <div>
      {scriptError && <div>Error loading Bing Maps SDK. Please try again.</div>}
      <div
        id="mapContainer"
        ref={mapRef}
        style={{ position: "relative", width: "100%", height: "600px" }}
      ></div>
      <RouteDialog
        isOpen={routeDialogOpen}
        onClose={() => setRouteDialogOpen(false)}
        routeLocations={routeLocations}
      />
    </div>
  );
};

export default MapComponent;
