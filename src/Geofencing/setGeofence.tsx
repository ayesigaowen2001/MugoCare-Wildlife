import React, { useEffect, useState } from "react";

const BingMap: React.FC = () => {
  const [drawingManager, setDrawingManager] = useState<any>(null); // State to hold the drawing manager instance
  const [geofenceCoordinates, setGeofenceCoordinates] = useState<any[]>([]); // State to store geofence coordinates

  useEffect(() => {
    const loadBingMapScript = async () => {
      try {
        const bingKey = "**************";

        const script = document.createElement("script");
        script.src = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingKey}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          window.GetMap = () => {
            const mapElement = document.getElementById("myMap");
            if (mapElement) {
              const map = new window.Microsoft.Maps.Map(mapElement, {
                credentials: bingKey,
              });

              window.Microsoft.Maps.loadModule(
                "Microsoft.Maps.DrawingTools",
                () => {
                  const tools = new window.Microsoft.Maps.DrawingTools(map);
                  setDrawingManager(tools);

                  tools.showDrawingManager((manager: any) => {
                    setDrawingManager(manager); // Storing drawing manager instance in state
                  });

                  // Attaching event handler for drawing end
                  window.Microsoft.Maps.Events.addHandler(
                    tools,
                    "drawingEnded",
                    handleDrawingEnded
                  );
                }
              );
            } else {
              console.error("Error: Element with ID 'myMap' not found.");
            }
          };
        };

        script.onerror = (error) => {
          console.error("Error loading Bing Maps script:", error);
        };

        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading Bing Maps script:", error);
      }
    };

    loadBingMapScript();

    return () => {};
  }, []);

  const handleDrawingEnded = (event: any) => {
    const shapes = event.shapes;
    const coordinates = shapes
      .map((shape: any) => {
        if (
          shape.getType() ===
            window.Microsoft.Maps.DrawingTools.ShapeType.polyline ||
          shape.getType() ===
            window.Microsoft.Maps.DrawingTools.ShapeType.polygon
        ) {
          const vertices = shape.getLocations();
          const bounds =
            window.Microsoft.Maps.LocationRect.fromLocations(vertices);

          return {
            northLatitude: bounds.getNorth().toFixed(4),
            southLatitude: bounds.getSouth().toFixed(4),
            eastLongitude: bounds.getEast().toFixed(4),
            westLongitude: bounds.getWest().toFixed(4),
          };
        }
        return null;
      })
      .filter((coords: any) => coords !== null);

    setGeofenceCoordinates(coordinates);
    console.log("Geofence coordinates:", coordinates);
  };

  const setDrawingMode = (mode: string) => {
    if (drawingManager) {
      drawingManager.setDrawingMode(
        window.Microsoft.Maps.DrawingTools.DrawingMode[mode]
      );
    }
  };

  const handleSubmitGeofence = () => {
    console.log("Submitting geofence with coordinates:", geofenceCoordinates);
    // Here you can perform additional logic to send the geofence coordinates to a backend or perform other actions
  };

  return (
    <div>
      <div
        id="myMap"
        style={{ width: "100%", height: "600px", backgroundColor: "gray" }}
      ></div>
      <br />
      <div>
        <button onClick={() => setDrawingMode("polyline")}>
          Draw Polyline
        </button>
        <button onClick={() => setDrawingMode("polygon")}>Draw Polygon</button>
      </div>
      <br />
      <button onClick={handleSubmitGeofence}>Submit Geofence</button>
    </div>
  );
};

export default BingMap;
