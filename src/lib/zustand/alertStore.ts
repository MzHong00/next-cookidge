import { create } from "zustand";

export interface AlertTypes {
  message?: string;
  type: "success" | "error";
}

interface AlertStore {
  queue: AlertTypes[];
  actions: {
    alertEnqueue: (alert: AlertTypes) => void;
    alertDequeue: (delMessage: AlertTypes["message"]) => void;
  };
}

const useAlertStore = create<AlertStore>()((set) => ({
  queue: [],
  actions: {
    alertEnqueue: (alert) =>
      set(({ queue }) => ({
        queue: [...queue, alert],
      })),
    alertDequeue: (delMessage: AlertTypes["message"]) =>
      set(({ queue }) => ({
        queue: queue.filter(({ message }) => message !== delMessage),
      })),
  },
}));

export const useAlertQueue = () => useAlertStore((state) => state.queue);
export const useAlertActions = () => useAlertStore((state) => state.actions);
