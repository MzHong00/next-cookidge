"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import styles from "./index.module.scss";

/* 설명
  - Framer Motion 컴포넌트입니다.
  - children으로 버튼들을 추천합니다.
  - 메뉴를 한 번만 클릭하면 창이 닫힙니다.
*/

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonComponent: React.ReactNode;
}

export const Dropdown = ({ buttonComponent, children, ...props }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsShow((prev) => !prev);
        }}
        {...props}
      >
        {buttonComponent}
      </button>
      <AnimatePresence>
        {isShow && (
          <motion.nav
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            onClick={() => setIsShow(false)}
            className={styles.menu}
          >
            {children}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
