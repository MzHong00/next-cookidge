import { getCookiesAsString } from "@/utils/getStringCookies";
import QueryHydrate from "@/components/common/queryHydrate";
import { UserUpdate } from "@/containers/user/userUpdate/userUpdate";
import { ClientRender } from "@/components/common/clientRender";
import { UserQueries } from "@/services/user/queries/userQueries";

export const metadata = {
  title: "프로필 편집",
};

export default async function MeUpdatePage() {
  const cookies = await getCookiesAsString();

  return (
    <div>
      <h3 style={{ marginBottom: "2rem" }}>프로필 편집</h3>
      <QueryHydrate
        queryOptions={[UserQueries.meQuery({ headers: { Cookie: cookies } })]}
      >
        <ClientRender>
          <UserUpdate />
        </ClientRender>
      </QueryHydrate>
    </div>
  );
}
