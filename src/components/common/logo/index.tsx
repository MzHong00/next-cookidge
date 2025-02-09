import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";

import { IconBox } from "@/components/common/iconBox";

import styles from "./index.module.css";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <IconBox Icon={ImSpoonKnife} className={`${className} ${styles.logo}`}>
      <h4>Cookidge</h4>
    </IconBox>
  );
};
