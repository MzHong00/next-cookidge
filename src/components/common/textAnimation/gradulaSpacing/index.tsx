"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./index.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

export function GradualSpacing({ text, className, ...props }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  return (
    <div className={`${className} ${styles.container}`} {...props}>
      {text.split("").map((char, i) => (
        <motion.p
          ref={ref}
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: i * 0.1 },
          }}
        >
          {char === " " ? <>&nbsp;</> : char}
        </motion.p>
      ))}
    </div>
  );
}
