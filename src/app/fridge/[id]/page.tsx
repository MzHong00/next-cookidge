import type { IFridge } from "@/types/fridge/type";
import QueryHydrate from "@/components/common/queryHydrate";
import { FridgeDetail } from "@/containers/fridge/fridgeDetail/fridgeDetail";
import { FridgeQueries } from "@/services/fridge/queries/fridgeQueries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
}

export default async function FridgeDetailPage({
  params,
}: {
  params: Promise<{ id: IFridge["_id"] }>;
}) {
  const { id } = await params;

  return (
    <QueryHydrate queryOptions={[FridgeQueries.detailQuery(id)]}>
      <FridgeDetail id={id} />
    </QueryHydrate>
  );
}
