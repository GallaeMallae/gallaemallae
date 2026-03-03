import { Tables } from "@/types/supabase";
import { create } from "zustand";

type Profile = Tables<"profiles">;

interface ProfileState {
  profile: Profile | null;
  isProfileLoading: boolean;
  setProfile: (profile: Profile | null) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isProfileLoading: true,
  setProfile: (profile) => set({ profile, isProfileLoading: false }),
  clearProfile: () => set({ profile: null, isProfileLoading: false }),
}));
