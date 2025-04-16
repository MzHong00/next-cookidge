import { Background } from "@/containers/recipe/recipeDetail/background";

export default async function BackgroundPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { id } = await params;
  const { p } = await searchParams;

  return <Background id={id} pidSrc={p} />;
}
