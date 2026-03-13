import { create } from "zustand";

interface LocationState {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  isDefaultLocation: boolean;
  isInitialized: boolean;
  setLocation: (
    latitude: number,
    longitude: number,
    isDefault?: boolean,
  ) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  coords: null,
  isDefaultLocation: false,
  isInitialized: false,

  setLocation: (latitude, longitude, isDefault = false) =>
    set({
      coords: {
        latitude,
        longitude,
      },
      isDefaultLocation: isDefault,
      isInitialized: true,
    }),
}));
