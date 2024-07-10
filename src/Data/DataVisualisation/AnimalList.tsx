import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useContext } from "react";
import {
  AnimalContext,
  AnimalContextType,
} from "../StateManagement/animalContext";

const AnimalList: React.FC = () => {
  const { animalData } = useContext<AnimalContextType>(AnimalContext);

  return (
    <DataTable value={animalData}>
      <Column field="animal.animal_number" header="Animal Number" />
      <Column field="animal.gender" header="Gender" />
      <Column field="animal.name" header="Name" />
      <Column field="animal.species" header="Species" />
      <Column field="animal.owner_id" header="Owner ID" />
      {/* //<Column body={formatGPSLocations} header="GPS Locations" /> */}
    </DataTable>
  );
};

export default AnimalList;
