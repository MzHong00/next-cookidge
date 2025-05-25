"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { Logo } from "../logo";
import { IconBox } from "../iconBox";
import { LoadingDots } from "../loadingDots";
import { twistFade } from "@/lib/framer-motion";
import { useConfirmDialogStore } from "@/lib/zustand/confirmDialogStore";
import { useHandleShowingDialog } from "./useHandleShowingDialog";

import styles from "./confirmDialog.module.scss";

export const ConfirmDialog = () => {
  const router = useRouter();
  const ref = useHandleShowingDialog();
  const { isOpen, isLoading, payload, actions } = useConfirmDialogStore();
  const { message, processMessage, requestFn, option } = payload;

  const onClickConfirm = async () => {
    actions.setIsLoading(true);

    try {
      await requestFn();
      if (option.backspace) router.back();
    } catch (error) {
      console.error(error);
    } finally {
      actions.setIsLoading(false);
      actions.closeDialog();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.dialog ref={ref} {...twistFade}>
      <div className={styles.dialog}>
        <header className={styles.header}>
          <Logo />
          <p>{message}</p>
        </header>
        {isLoading && (
          <LoadingDots msg={processMessage} className={styles.processMessage} />
        )}
        {!isLoading && (
          <main className="flex-row">
            <button>
              <IconBox
                className="main-button"
                onClick={onClickConfirm}
                disabled={isLoading}
              >
                확인
              </IconBox>
            </button>
            <button>
              <IconBox onClick={actions.closeDialog} disabled={isLoading}>
                취소
              </IconBox>
            </button>
          </main>
        )}
      </div>
    </motion.dialog>
  );
};
