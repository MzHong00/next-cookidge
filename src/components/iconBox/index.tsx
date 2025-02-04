import { forwardRef } from "react";
import type { IconType } from "@react-icons/all-files";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  Icon: IconType;
}

export const IconBox = forwardRef<HTMLDivElement, Partial<Props>>(
  ({ Icon, color, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.container} ${className}`} {...props}>
        {Icon && <Icon color={color} />}
        {children}
      </div>
    );
  }
);
