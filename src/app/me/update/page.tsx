import QueryHydrate from "@/components/common/queryHydrate";
import { UserQueries } from "@/services/user/queries/userQueries";
import { UserUpdate } from "@/containers/user/userUpdate/userUpdate";
import { ClientRender } from "@/components/common/clientRender";

export const metadata = {
  title: "프로필 편집",
};

export default async function MeUpdatePage() {
  return (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>프로필 편집</h3>
      <QueryHydrate queryOptions={[UserQueries.meQuery()]}>
        <ClientRender>
          <UserUpdate />
        </ClientRender>
      </QueryHydrate>
    </div>
  );
}
