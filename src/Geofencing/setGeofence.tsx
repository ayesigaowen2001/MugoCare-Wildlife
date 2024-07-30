import React, { useEffect, useState } from "react";
import * as atlas from "azure-maps-control";
import * as atlasDrawing from "azure-maps-drawing-tools";
import "./Geofence.css";
const BingMap: React.FC = () => {
  const [map, setMap] = useState<atlas.Map | null>(null);
  const [, setDrawingManager] =
    useState<atlasDrawing.drawing.DrawingManager | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const mapInstance = new atlas.Map("myMap", {
        center: [-90, 35],
        zoom: 3,
        view: "Auto",
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey:
            "FA7eAz9G0n0NBadtHY6FiE4aRXFFQNbBYtV07fZvcmbCTjWUY5LzJQQJ99AGACYeBjFvlMgSAAAgAZMPtri7",
        },
        accessibilityVerbose: false,
      });

      mapInstance.events.add("ready", () => {
        const dm = new atlasDrawing.drawing.DrawingManager(mapInstance, {
          interactionType: atlasDrawing.drawing.DrawingInteractionType.hybrid,
          toolbar: new atlasDrawing.control.DrawingToolbar({
            position: "top-right",
          }),
        });

        function getDrawnShapes() {
          const source = dm.getSource();
          const shapesJson = JSON.stringify(source.toJson(), null, "    ");
          console.log(shapesJson);
        }

        getDrawnShapes();
        setDrawingManager(dm);
      });

      setMap(mapInstance);
    };

    if (!map) {
      initMap();
    }

    return () => {
      map?.dispose();
    };
  }, [map]);

  return (
    <div
      id="myMap"
      // style={{
      //   position: "relative",
      //   width: "auto",
      //   minWidth: "290px",
      //   height: "600px",
      // }}
    />
  );
};

export default BingMap;
