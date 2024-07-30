import React, { useState, useContext, useEffect } from "react";
import Navbar from "../componets/Menubars/Menubar";
import TemplateDemo from "../componets/DisplayData/Content";
import MainContent from "../componets/DisplayData/MainContent";
import CustomSidebar from "../componets/Sidebars/Sidebar";
//import ResizableDialog from "../Geofencing/geoofencingDialogbox";
import FilterPanel from "../componets/Notifications/Notifications";
//import MapComponent from "../componets/Location/bingmaps.d";
import {
  AnimalContext,
  AnimalContextType,
} from "../Data/StateManagement/animalContext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Choice {
  name: string;
  code: string | JSX.Element;
}

const Basic: React.FC = () => {
  const { animalData } = useContext<AnimalContextType>(AnimalContext);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [, setDialogVisible] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  useEffect(() => {
    setFilteredData(animalData);
  }, [animalData]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleGeofenceClick = () => {
    setDialogVisible(true);
    setSidebarVisible(false);
  };

  const handleFilterChange = (filters) => {
    const filteredAnimals = animalData.filter((animal) => {
      let matches = true;
      if (filters.name) {
        matches =
          matches &&
          animal.animal.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.species) {
        matches = matches && animal.animal.species === filters.species;
      }
      if (filters.gender) {
        matches = matches && animal.animal.gender === filters.gender;
      }
      if (filters.animalId) {
        matches = matches && animal.animal.id.toString() === filters.animalId;
      }
      return matches;
    });

    setFilteredData(filteredAnimals);
  };

  const uniqueSpecies = [
    ...new Set(animalData.map((animal) => animal.animal.species)),
  ];
  const uniqueGenders = [
    ...new Set(animalData.map((animal) => animal.animal.gender)),
  ];
  const animalOptions = animalData.map((animal) => ({
    id: animal.animal.id,
    name: animal.animal.name,
  }));

  return (
    <div className="overflow-hidden">
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <CustomSidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        onGeofenceClick={handleGeofenceClick}
      />
      <div className="grid">
        <div
          className={`col-${isHovered ? 2 : 1}`} // Apply conditional class
          onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
          onMouseLeave={() => setIsHovered(false)} // Handle mouse leave
        >
          <div className="text-center border-round-sm surface-ground font-bold">
            <TemplateDemo
              onChoiceSelect={setSelectedChoice}
              isHovered={isHovered}
            />
          </div>
        </div>
        <div className="grid">
          <div
            className={`col-${isHovered ? 8 : 9} `}
            // onMouseEnter={() => setIsHovered(true)} // Handle mouse enter
            // onMouseLeave={() => setIsHovered(false)} // Handle mouse leave
            style={{ width: "1000px", height: "500px" }}
          >
            <div className="text-center p-2 border-round-sm bg-blue-100 font-bold">
              <MainContent
                filterdDatas={filteredData}
                selectedChoice={selectedChoice}
                customerToken={""}
              />
            </div>
          </div>
        </div>
        <div className={`col-${isHovered ? 1 : 1} `}>
          <div className="text-center p-2 border-round-sm font-bold">
            <FilterPanel
              onFilterChange={handleFilterChange}
              speciesOptions={uniqueSpecies}
              genderOptions={uniqueGenders}
              animalOptions={animalOptions}
            />
          </div>
        </div>
      </div>
      {/* <MapComponent filterdDatas={filteredData} /> */}
      {/* <ResizableDialog visible={dialogVisible} onHide={hideDialog} /> */}
      {/* <MainContent
        selectedChoice={undefined}
        customerToken={""}
        filterdDatas={filteredData}
      /> */}
    </div>
  );
};

export default Basic;
