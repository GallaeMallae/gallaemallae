import { create } from "zustand";

interface LocationState {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  isInitialized: boolean;
  setLocation: (latitude: number, longitude: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  isInitialized: false,

  setLocation: (latitude, longitude) =>
    set({
      coords: {
        latitude,
        longitude,
      },
      isInitialized: true,
    }),
}));
