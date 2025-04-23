import QueryHydrate from "@/components/common/queryHydrate";
import { FridgeList } from "@/containers/fridge/fridgeList/fridgeList";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";
import { UserQueries } from "@/services/user/queries/userQueries";

export default async function FridgePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <QueryHydrate
      queryOptions={[FridgeQueries.listQuery(), UserQueries.meQuery()]}
    >
      <FridgeList active_fridge_id={id} />
    </QueryHydrate>
  );
}
