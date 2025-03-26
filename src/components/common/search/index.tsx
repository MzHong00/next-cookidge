import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconBox } from "../iconBox";

import styles from "./index.module.scss";

export const SearchBox = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <IconBox Icon={RiSearchLine} className={styles.icon} />
      <input type="search" {...props} />
    </div>
  );
};
