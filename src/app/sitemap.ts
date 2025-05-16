import type { MetadataRoute } from "next";

import type { IRecipe } from "@/types/recipe/recipe";
import { env } from "@/constants/env";
import { fetchBeApi } from "@/services";

// Google의 제한은 사이트맵당 50,000개의 URL입니다.
const RECIPE_SITEMAP_LIMIT = 50000;

const sitemapRoot: MetadataRoute.Sitemap = [
  {
    url: `${env.CLIENT_URL}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1,
  },
  {
    url: `${env.CLIENT_URL}/recipe`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${env.CLIENT_URL}/rank`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${env.CLIENT_URL}/user`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  },
  {
    url: `${env.CLIENT_URL}/login`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await fetchBeApi<IRecipe[]>(
    `/recipe/read-list?limit=${RECIPE_SITEMAP_LIMIT}`
  );

  const sitemapRecipe = recipes.map(({ _id }) => ({
    url: `${env.CLIENT_URL}/recipe/${_id}`,
    lastModified: new Date(),
  }));

  return [...sitemapRoot, ...sitemapRecipe];
}
