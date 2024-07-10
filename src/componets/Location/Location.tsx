// import React, { useEffect } from "react";

// const BingMap: React.FC = () => {
//   useEffect(() => {
//     const loadBingMapScript = async () => {
//       try {
//         const bingKey = "YOUR_BING_MAPS_API_KEY"; // Replace with your Bing Maps API key

//         const script = document.createElement("script");
//         script.src = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=${bingKey}`;
//         script.async = true;
//         script.defer = true;

//         script.onload = () => {
//           window.GetMap = () => {
//             const map = new window.Microsoft.Maps.Map("#myMap", {
//               credentials: bingKey,
//             });

//             const coordinates = [
//               { latitude: 47.6149, longitude: -122.1941 },
//               { latitude: 47.6205, longitude: -122.3493 },
//               { latitude: 47.6303, longitude: -122.4145 },
//               { latitude: 47.6505, longitude: -122.5201 },
//             ];

//             const locations = coordinates.map(
//               (coord) =>
//                 new window.Microsoft.Maps.Location(
//                   coord.latitude,
//                   coord.longitude
//                 )
//             );

//             const polyline = new window.Microsoft.Maps.Polyline(locations, {
//               strokeColor: "red",
//               strokeThickness: 3,
//             });

//             map.entities.push(polyline);
//           };
//         };

//         document.body.appendChild(script);
//       } catch (error) {
//         console.error("Error loading Bing Maps script:", error);
//       }
//     };

//     loadBingMapScript();

//     return () => {
//       // Clean up script if needed
//     };
//   }, []);

//   return (
//     <div>
//       <div
//         id="myMap"
//         style={{ width: "100%", height: "600px", backgroundColor: "gray" }}
//       ></div>
//     </div>
//   );
// };

// export default BingMap;
