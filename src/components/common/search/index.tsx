"use client";

import { type ForwardedRef, type InputHTMLAttributes, forwardRef } from "react";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import styles from "./index.module.scss";

const SearchInputComponent = (
  { children, className, ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <RiSearchLine className={styles.icon} />
      <input ref={ref} type="text" {...props} />
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export const SearchInput = forwardRef<
  HTMLInputElement,
  Partial<InputHTMLAttributes<HTMLInputElement>>
>(SearchInputComponent);
