import Image from "next/image";
import { ImageResponse } from "next/og";

import { RecipeService } from "@/services/recipe";

export const alt = "레시피 사진";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function RecipeOpenGraph({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await RecipeService.readRecipe(params.id);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={recipe.pictures[0]}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
