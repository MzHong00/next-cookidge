import { useEffect, useRef } from "react";

import {
  useConfirmDialogIsOpen,
  useConfirmDialogActions,
  useConfirmDialogIsLoading,
} from "@/lib/zustand/confirmDialogStore";

export const useHandleShowingDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = useConfirmDialogIsOpen();
  const isLoading = useConfirmDialogIsLoading();
  const { closeDialog } = useConfirmDialogActions();

  useEffect(() => {
    const element = dialogRef.current;
    if (!element) return;

    element.showModal();

    const handleClickOutside = (e: MouseEvent) => {
      if (isLoading) return;
      if (e.target === e.currentTarget) closeDialog();
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        closeDialog();
      }
    };

    element.addEventListener("click", handleClickOutside);
    element.addEventListener("keydown", handleEscKey);

    return () => {
      element.removeEventListener("click", handleClickOutside);
      element.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, isLoading, closeDialog]);

  return dialogRef;
};
