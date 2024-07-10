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
