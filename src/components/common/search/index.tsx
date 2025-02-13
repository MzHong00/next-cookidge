"use client"

import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "../iconBox";

import styles from "./index.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchBox = ({ className, ...props }: Props) => {
  return (
    <div className={`${styles.container} ${className}`} >
      <IconBox Icon={RiSearchLine} />
      <input type="search" {...props}/>
    </div>
  );
};