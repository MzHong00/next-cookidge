import type { IFridge } from "@/types/fridge/type";
import { FridgeDetail } from "@/containers/fridge/fridgeDetail/fridgeDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}){
  const { id } = await params;

}

export default async function FridgeDetailPage({
  params,
}: {
  params: Promise<{ id: IFridge["_id"] }>;
}) {
  const { id } = await params;

  return <FridgeDetail id={id} />;
}
