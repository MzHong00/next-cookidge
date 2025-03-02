import styles from "./index.module.scss";

export const FlexRow = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex-row ${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const FlexColumn = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex-column ${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
};
