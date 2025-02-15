"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName?: string;
  buttonChildren?: React.ReactNode;
}

export const DialogButton = ({
  buttonName = "버튼",
  buttonChildren,
  children,
  ...props
}: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsShow(true)} {...props}>
        {buttonChildren ?? buttonName}
      </button>

      {createPortal(
        <AnimatePresence>
          {isShow && (
            <div
              className={styles.background}
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsShow(false);
              }}
            >
              <motion.div
                initial={{ opacity: 0, rotateY: "50deg", rotate: "5deg" }}
                animate={{ opacity: 1, rotateY: "0deg", rotate: "0deg" }}
                exit={{ opacity: 0, rotateY: "50deg", rotate: "-5deg" }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.container}>
                  <button onClick={() => setIsShow(false)}>
                    <RiCloseLine />
                  </button>
                  {children}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
