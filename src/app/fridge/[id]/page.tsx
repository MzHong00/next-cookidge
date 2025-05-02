import type { IFridge } from "@/types/fridge/type";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";
import { getCookiesAsString } from "@/utils/getStringCookies";
import QueryHydrate from "@/components/common/queryHydrate";
import { FridgeDetail } from "@/containers/fridge/fridgeDetail/fridgeDetail";

export const metadata = {
  title: "냉장고",
};

export default async function FridgeDetailPage({
  params,
}: {
  params: Promise<{ id: IFridge["_id"] }>;
}) {
  const { id } = await params;
  const cookies = await getCookiesAsString();

  return (
    <QueryHydrate
      queryOptions={[
        FridgeQueries.detailQuery(id, {
          headers: {
            Cookie: cookies,
          },
        }),
      ]}
    >
      <FridgeDetail id={id} />
    </QueryHydrate>
  );
}
