import { UserUpdate } from "@/containers/user/userUpdate/userUpdate";
import { UserDeleteButton } from "@/components/features/user/delete/userDeleteButton";

import styles from "./page.module.scss";

export const metadata = {
  title: "프로필 편집",
};

export default async function MeUpdatePage() {
  return (
    <div>
      <h3 className={styles.pageTitle}>프로필 편집</h3>
      <UserUpdate />
      <UserDeleteButton className={styles.deleteButton} />
    </div>
  );
}
