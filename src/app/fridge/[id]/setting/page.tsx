import QueryHydrate from "@/components/common/queryHydrate";
import { getCookiesAsString } from "@/utils/getStringCookies";
import FridgeSetting from "@/containers/fridge/fridgeSetting/fridgeSetting";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

export default async function FridgeSettingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookies = await getCookiesAsString();

  return (
    <QueryHydrate
      queryOptions={[
        FridgeQueries.detailQuery(id, { headers: { Cookie: cookies } }),
      ]}
    >
      <FridgeSetting id={id} />
    </QueryHydrate>
  );
}
