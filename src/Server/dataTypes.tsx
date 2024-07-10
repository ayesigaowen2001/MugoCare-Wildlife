// src/types.ts
export interface Animal {
    gender: string;
    gps_location_id: string | null;
    id: number;
    name: string;
    species: string;
    animal_number: string;
    owner_id: number;
  }
  
  export interface GpsLocation {
    timestamp: string;
    latitude: string;
    id: number;
    animal_id: number;
    longitude: string;
  }
  
  export interface AnimalData {
    name: any;
    species: any;
    animal: Animal;
    gps_locations: GpsLocation[];
    animal_activities: any[]; // Define properly if needed
  }
  