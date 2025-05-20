import styles from "./layout.module.scss";

export default function RankLayout({
  search,
  children,
}: {
  search: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className={styles.title}>랭킹</h2>

      <div className={styles.container}>
        {search}
        {children}
      </div>
    </div>
  );
}
