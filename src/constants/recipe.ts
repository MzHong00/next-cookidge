import type { EmojiCatgories } from "@/types/common";

export const NAME_LIMIT_LENGTH = 20;
export const INTRODUCE_LIMIT_LENGTH = 100;
export const QUANTITY_LIMIT_LENGTH = 10;
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
