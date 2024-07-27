import React, { useState, useEffect } from "react";
import "./Notifications.css";
import { MaterialSymbol } from "react-material-symbols";

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
  speciesOptions: string[];
  genderOptions: string[];
  animalOptions: { id: number; name: string }[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  speciesOptions,
  genderOptions,
  animalOptions,
}) => {
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    species: "",
    gender: "",
    animalId: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.value,
    });
  };

  const applyFilter = () => {
    onFilterChange(filterOptions);
  };

  useEffect(() => {
    applyFilter();
  }, [filterOptions]);

  return (
    <div className="filter-container">
      <h4>Filter</h4>
      <MaterialSymbol icon="filter_alt" className="circular-icon" />
      <div className="filter-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={filterOptions.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="species">Species:</label>
        <select
          id="species"
          name="species"
          value={filterOptions.species}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={filterOptions.gender}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="animalId">Animal:</label>
        <select
          id="animalId"
          name="animalId"
          value={filterOptions.animalId}
          onChange={handleInputChange}
        >
          <option value="">All</option>
          {animalOptions.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={applyFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;
