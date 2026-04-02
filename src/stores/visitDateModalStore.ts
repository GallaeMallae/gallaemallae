import { create } from "zustand";
import { Event } from "@/types/common";

interface OpenState {
  isOpen: true;
  event: Event;
  onAction?: (date: Date) => void;
}

interface CloseState {
  isOpen: false;
  event?: undefined;
  onAction?: undefined;
}

type VisitDateModalStore = (OpenState | CloseState) & {
  actions: {
    open: (params: Omit<OpenState, "isOpen">) => void;
    close: () => void;
  };
};

const useVisitDateModalStore = create<VisitDateModalStore>((set) => ({
  isOpen: false,
  actions: {
    open: (params) => {
      set({ ...params, isOpen: true });
    },
    close: () => {
      set({
        isOpen: false,
        event: undefined,
        onAction: undefined,
      } as CloseState);
    },
  },
}));

// 💡 커스텀 훅 패턴 유지
export const useVisitDateModal = () => useVisitDateModalStore();

export const useOpenVisitDateModal = () => {
  return useVisitDateModalStore((store) => store.actions.open);
};

export const useCloseVisitDateModal = () => {
  return useVisitDateModalStore((store) => store.actions.close);
};
