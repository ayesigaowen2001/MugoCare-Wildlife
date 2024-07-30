import React, { useState, useEffect, useRef } from "react";
import * as atlas from "azure-maps-control";
import "./Location.css";

interface Data {
  filterdDatas: any[];
}

const MapComponent: React.FC<Data> = ({ filterdDatas }) => {
  const mapRef = useRef<atlas.Map | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [scriptError, setScriptError] = useState<boolean>(false);
  const [symbolLayers, setSymbolLayers] = useState<atlas.layer.SymbolLayer[]>(
    []
  );

  const calculateMapCenter = (
    locations: { latitude: number; longitude: number }[]
  ) => {
    let sumLat = 0;
    let sumLng = 0;
    locations.forEach((loc) => {
      sumLat += loc.latitude;
      sumLng += loc.longitude;
    });
    return [sumLng / locations.length, sumLat / locations.length];
  };

  useEffect(() => {
    if (divRef.current) {
      const map = new atlas.Map(divRef.current, {
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey:
            "FA7eAz9G0n0NBadtHY6FiE4aRXFFQNbBYtV07fZvcmbCTjWUY5LzJQQJ99AGACYeBjFvlMgSAAAgAZMPtri7",
        },
      });

      map.events.add("ready", () => {
        mapRef.current = map;

        const zoomMap = (offset: number) => {
          const cam = map.getCamera();
          map.setCamera({
            zoom: Math.max(
              cam.minZoom,
              Math.min(cam.maxZoom, cam.zoom + offset)
            ),
            type: "ease",
            duration: 250,
          });
        };

        const pitchStep = 10;
        const pitchMap = (offset: number) => {
          map.setCamera({
            pitch: Math.max(
              0,
              Math.min(60, map.getCamera().pitch + offset * pitchStep)
            ),
            type: "ease",
            duration: 250,
          });
        };

        const bearingStep = 15;
        const rotateMap = (offset: number) => {
          map.setCamera({
            bearing: map.getCamera().bearing + offset * bearingStep,
            type: "ease",
            duration: 250,
          });
        };

        const mapStyleChanged = (elm: any) => {
          map.setStyle({
            style: elm.target.value,
          });
        };

        document
          .querySelector(".zoom-in")
          ?.addEventListener("click", () => zoomMap(1));
        document
          .querySelector(".zoom-out")
          ?.addEventListener("click", () => zoomMap(-1));
        document
          .querySelector(".increase-pitch")
          ?.addEventListener("click", () => pitchMap(1));
        document
          .querySelector(".decrease-pitch")
          ?.addEventListener("click", () => pitchMap(-1));
        document
          .querySelector(".rotate-left")
          ?.addEventListener("click", () => rotateMap(1));
        document
          .querySelector(".rotate-right")
          ?.addEventListener("click", () => rotateMap(-1));
        document
          .querySelector(".map-style")
          ?.addEventListener("change", mapStyleChanged);
      });
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const allLocations: { latitude: number; longitude: number }[] = [];

      filterdDatas.forEach((animal) => {
        if (animal.gps_locations.length > 0) {
          const lastLocations = animal.gps_locations.slice(-6).reverse();
          lastLocations.forEach(
            (loc: { latitude: string; longitude: string }) => {
              allLocations.push({
                latitude: parseFloat(loc.latitude),
                longitude: parseFloat(loc.longitude),
              });
            }
          );
        }
      });

      const mapCenter = calculateMapCenter(allLocations);
      map.setCamera({
        center: mapCenter,
        zoom: 10,
      });

      filterdDatas.forEach((animal) => {
        if (animal.gps_locations.length > 0) {
          const lastLocations = animal.gps_locations.slice(-6).reverse();
          const lastLocation = lastLocations[lastLocations.length - 1];
          const point = new atlas.data.Point([
            parseFloat(lastLocation.longitude),
            parseFloat(lastLocation.latitude),
          ]);

          const dataSource = new atlas.source.DataSource();
          dataSource.add(point);
          map.sources.add(dataSource);

          const symbolLayer = new atlas.layer.SymbolLayer(dataSource);
          map.layers.add(symbolLayer);
          setSymbolLayers((prevLayers) => [...prevLayers, symbolLayer]);

          map.events.add("click", symbolLayer, (e) => {
            if (e.shapes && e.shapes.length > 0) {
              const popup = new atlas.Popup({
                content: `<div><h3>${animal.animal.name}</h3><p>Species: ${animal.animal.species}, Gender: ${animal.animal.gender}</p></div>`,
                position: point.coordinates,
              });
              popup.open(map);
            }
          });
        }
      });
    }
  }, [filterdDatas]);

  return (
    <div>
      {scriptError && (
        <div>Error loading Azure Maps SDK. Please try again.</div>
      )}
      <div
        id="myMap"
        ref={divRef}
        style={{ position: "relative", width: "500", height: "400" }}
        className="mapContainer"
      >
        <div className="controlContainer">
          <button className="navButton zoom-in" title="Zoom In">
            +
          </button>
          <button className="navButton zoom-out" title="Zoom Out">
            ⚊
          </button>
          <button className="navButton decrease-pitch" title="Decrease Pitch">
            🠗
          </button>
          <button className="navButton increase-pitch" title="Increase Pitch">
            🠕
          </button>
          <button className="navButton rotate-left" title="Rotate Left">
            ⟲
          </button>
          <button className="navButton rotate-right" title="Rotate Right">
            ⟳
          </button>
          <select className="navButton navSelect map-style" title="Map Style">
            <option value="road" selected>
              Road
            </option>
            <option value="grayscale_dark">Dark Grayscale</option>
            <option value="grayscale_light">Light Grayscale</option>
            <option value="night">Night</option>
            <option value="satellite">Satellite</option>
            <option value="satellite_road_labels">Hybrid</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
