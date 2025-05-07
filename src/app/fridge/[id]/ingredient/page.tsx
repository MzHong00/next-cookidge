import { CreateIngredientForm } from "@/components/features/ingredient/create/createIngredientForm";

export default async function IngredientCreatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CreateIngredientForm fridge_id={id} />;
}
