// import React, { useState, useContext, useEffect } from 'react';
// import FilterPanel from '../../componets/Notifications/Notifications';
// import MapComponent from '../../componets/Location/bingmaps.d';
// import {
//   AnimalContext,
//   AnimalContextType,
// } from '../../Data/StateManagement/animalContext';

// const ParentComponent = () => {
//   const { animalData } = useContext<AnimalContextType>(AnimalContext);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     // Initialize filteredData with all animalData initially
//     setFilteredData(animalData);
//   }, [animalData]);

//   const handleFilterChange = (filters) => {
//     // Filter animalData based on filters
//     const filteredAnimals = animalData.filter((animal) => {
//       let matches = true;
//       if (filters.name) {
//         matches = matches && animal.animal.name.toLowerCase().includes(filters.name.toLowerCase());
//       }
//       if (filters.species) {
//         matches = matches && animal.animal.species === filters.species;
//       }
//       if (filters.gender) {
//         matches = matches && animal.animal.gender === filters.gender;
//       }
//       return matches;
//     });

//     setFilteredData(filteredAnimals); // Update filteredData state
//   };

//   return (
//     <div className="parent-container">
//       <FilterPanel onFilterChange={handleFilterChange} />
//       <MapComponent filteredData={filteredData} />
//     </div>
//   );
// };

// export default ParentComponent;
