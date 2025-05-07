"use client";

import { type ForwardedRef, type InputHTMLAttributes, forwardRef } from "react";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "../iconBox";

import styles from "./index.module.scss";

const SearchBoxComponent = (
  {
    style,
    children,
    className,
    ...props
  }: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div style={style} className={`${styles.container} ${className}`}>
      <IconBox Icon={RiSearchLine} className={styles.icon} />
      <input ref={ref} name="search" type="search" {...props} />
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export const SearchBox = forwardRef<
  HTMLInputElement,
  Partial<InputHTMLAttributes<HTMLInputElement>>
>(SearchBoxComponent);
