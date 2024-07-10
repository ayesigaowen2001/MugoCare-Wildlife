// // src/Dashboard.tsx
// import React, { useEffect, useState } from "react";
// import { AnimalData } from "../../Server/dataTypes";
// import axiosInstance from "../../Server/axiosInstance";
// import Location from "../../componets/Location/Location";
// import AnimalTable from "../DataVisualisation/AnimalList";

// const Dashboard: React.FC = () => {
//   const [animals, setAnimals] = useState<AnimalData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get("/animal-data-endpoint"); // Adjust endpoint as necessary
//         setAnimals(response.data.animals);
//       } catch (error) {
//         console.error("Error fetching animal data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Animal Dashboard</h2>
//       <AnimalTable animals={animals} />
//       <Location animals={animals} />
//     </div>
//   );
// };

// export default Dashboard;
