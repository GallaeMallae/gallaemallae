import { create } from "zustand";

interface OpenState {
  isOpen: true;
  title: string;
  description: string;
  onAction?: () => void;
  onCancel?: () => void;
}

interface CloseState {
  isOpen: false;
}

type AlertModalStore = (OpenState | CloseState) & {
  actions: {
    open: (params: Omit<OpenState, "isOpen">) => void;
    close: () => void;
  };
};

const useAlertModalStore = create<AlertModalStore>((set) => ({
  isOpen: false,
  actions: {
    open: (params) => {
      set({ ...params, isOpen: true });
    },
    close: () => {
      set({ isOpen: false });
    },
  },
}));

export const useAlertModal = () => {
  return useAlertModalStore();
};

export const useOpenAlertModal = () => {
  return useAlertModalStore((store) => store.actions.open);
};
