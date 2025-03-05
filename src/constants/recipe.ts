import type { EmojiCatgories } from "@/types";

export const FOOD_CATEGORIES: EmojiCatgories[] = [
  {
    emoji: "🍚",
    text: "한식",
  },
  {
    emoji: "🍣",
    text: "일식",
  },
  {
    emoji: "🥟",
    text: "중식",
  },
  {
    emoji: "🍕",
    text: "양식",
  },
  {
    emoji: "🍰",
    text: "디저트",
  },
];

export const RECIPE_SORT = [
  { query: "time", text: "시간순" },
  { query: "like", text: "좋아요순" },
];
