import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
//import "azure-maps-drawing-tools/dist/atlas-drawing.min.css";
declare namespace Microsoft {
  export module Maps {
    export class Map {
      constructor(element: HTMLElement | string, options?: any);
      getCenter(): any;
      getBounds(): any;
      entities: any;
    }

    export class Infobox {
      constructor(location: any, options?: any);
      setMap(map: Map): void;
      setOptions(options: any): void;
    }

    export class Pushpin {
      constructor(location: any, options?: any);
      metadata: any;
      getLocation(): any;
    }

    export module Events {
      export function addHandler(
        target: any,
        event: string,
        handler: (e: any) => void
      ): void;
    }

    export module TestDataGenerator {
      export function getLocations(count: number, bounds: any): any[];
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
