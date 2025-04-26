import { z } from "zod";

import { NAME_LIMIT_LENGTH, QUANTITY_LIMIT_LENGTH } from "@/constants/recipe";

export const IngredientSchema = z.object({
  name: z
    .string()
    .min(1, "재료 이름을 입력해 주세요.")
    .max(
      NAME_LIMIT_LENGTH,
      `재료 이름을 ${NAME_LIMIT_LENGTH}자 내외로 입력해 주세요.`
    ),
  category: z.string().min(1, "카테고리를 선택해 주세요."),
  quantity: z
    .string()
    .min(1, "재료 양을 입력해 주세요.")
    .max(
      QUANTITY_LIMIT_LENGTH,
      `재료 양을 ${QUANTITY_LIMIT_LENGTH}자 내외로 입력해 주세요.`
    ),
  expired_at: z.string(),
});

export const IngredientFormSchema = z.object({
  ingredients: z.array(IngredientSchema),
});

export type IUpdateIngredientForm = z.infer<typeof IngredientFormSchema>;
