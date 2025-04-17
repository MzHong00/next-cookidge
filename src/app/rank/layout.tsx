import { ClientRender } from "@/components/common/clientRender";
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
      <h2>사용자 탐색</h2>

      <div className={styles.container}>
        {search}
        <ClientRender>{children}</ClientRender>
      </div>
    </div>
  );
}
