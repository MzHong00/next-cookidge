import type { IFridge } from "@/types/fridge/type";
import { FridgeDetail } from "@/containers/fridge/fridgeDetail/fridgeDetail";

export default async function FridgeDetailPage({
  params,
}: {
  params: Promise<{ id: IFridge["_id"] }>;
}) {
  const { id } = await params;

  return <FridgeDetail id={id} />;
}
