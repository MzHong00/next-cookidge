import { useState } from "react";
import { motion } from "motion/react";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName?: string;
  buttonChildren?: React.ReactNode;
}

export const Dropdown = ({
  buttonName = "메뉴",
  buttonChildren,
  children,
  ...props
}: Props) => {
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
        {buttonChildren ?? buttonName}
      </button>
      {isShow && (
        <motion.div onClick={() => setIsShow(false)} className={styles.menu}>
          {children}
        </motion.div>
      )}
    </div>
  );
};
