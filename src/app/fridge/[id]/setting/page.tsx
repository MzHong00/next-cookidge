import FridgeSetting from "@/containers/fridge/fridgeSetting/fridgeSetting";

export default async function FridgeSettingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <FridgeSetting id={id} />;
}
