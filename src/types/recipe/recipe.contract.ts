import { z } from "zod";

import {
  INTRODUCE_LIMIT_LENGTH,
  NAME_LIMIT_LENGTH,
  QUANTITY_LIMIT_LENGTH,
} from "@/constants/recipe";

const IngredientSchema = z.object({
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
});

const CookingStepSchema = z.object({
  picture: z.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    "이미지를 선택하세요."
  ).optional(),
  instruction: z
    .string()
    .min(1, "조리 과정을 입력해 주세요.")
    .max(
      INTRODUCE_LIMIT_LENGTH,
      `조리 과정을 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`
    ),
});

export const CreateRecipeSchema = z.object({
  name: z
    .string()
    .min(1, "요리 이름을 입력해 주세요.")
    .max(
      NAME_LIMIT_LENGTH,
      `요리 이름을 ${NAME_LIMIT_LENGTH}자 내외로 입력해 주세요.`
    ),
  pictures: z.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    "파일을 선택하세요."
  ),
  ingredients: z
    .array(IngredientSchema)
    .min(1, "재료를 1개 이상 추가해 주세요."),
  introduction: z
    .string()
    .min(1, "요리 소개를 입력해 주세요.")
    .max(
      INTRODUCE_LIMIT_LENGTH,
      `요리 소개를 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`
    ),
  servings: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 300,
      "올바르지 않은 인분 설정입니다."
    ),
  category: z.string().min(1, "카테고리를 선택해 주세요."),
  cooking_time: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 2400,
      "올바르지 않은 조리 시간입니다."
    ),
  cooking_steps: z
    .array(CookingStepSchema)
    .min(1, "요리 과정을 1개 이상 추가해 주세요."),
});

export type ICreateRecipeForm = z.infer<typeof CreateRecipeSchema>;
