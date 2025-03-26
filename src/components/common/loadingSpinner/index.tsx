import { RiLoader3Line } from "@react-icons/all-files/ri/RiLoader3Line";

import styles from "./index.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  msg?: string;
}

export const LoadingSpinner = ({ msg, className, ...props }: Props) => {
  return (
    <div className={`${styles.spinner} ${className}`} {...props}>
      <RiLoader3Line />
      {msg && <p>{msg}</p>}
    </div>
  );
};
