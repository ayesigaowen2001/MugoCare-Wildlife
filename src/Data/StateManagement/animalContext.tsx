// // src/Data/StateManagement/animalContext.tsx
// import { createContext, useState, ReactNode } from "react";

// export interface AnimalDataType {
//   id: number;
//   name: string;
//   species: string;
//   gender: string;
//   gps_location_id: number | null;
//   // add other fields as needed
//   gps_locations: { latitude: number; longitude: number; timestamp: string }[];
//   animal_activities: any[]; // update the type if you have a more specific one
//   animal: any;
// }

// export interface AnimalContextType {
//   animalData: AnimalDataType[];
//   setAnimalData: (data: AnimalDataType[]) => void;
// }

// export const AnimalContext = createContext<AnimalContextType>({
//   animalData: [],
//   setAnimalData: () => {},
// });

// interface AnimalProviderProps {
//   children: ReactNode;
// }

// export const AnimalProvider: React.FC<AnimalProviderProps> = ({ children }) => {
//   const [animalData, setAnimalData] = useState<AnimalDataType[]>([]);
//   console.log(animalData);
//   return (
//     <AnimalContext.Provider value={{ animalData, setAnimalData }}>
//       {children}
//     </AnimalContext.Provider>
//   );
// };
import { createContext, useState, ReactNode } from "react";

export interface AnimalContextType {
  animalData: any[];
  setAnimalData: (data: any[]) => void;
}

export const AnimalContext = createContext<AnimalContextType>({
  animalData: [],
  setAnimalData: () => {},
});

interface AnimalProviderProps {
  children: ReactNode;
}

export const AnimalProvider: React.FC<AnimalProviderProps> = ({ children }) => {
  const [animalData, setAnimalData] = useState<any[]>([]);
  console.log(animalData);
  return (
    <AnimalContext.Provider value={{ animalData, setAnimalData }}>
      {children}
    </AnimalContext.Provider>
  );
};
