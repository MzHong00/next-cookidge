import { z } from "zod";

import {
  NAME_LIMIT_LENGTH,
  QUANTITY_LIMIT_LENGTH,
  INTRODUCE_LIMIT_LENGTH,
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

const CreateCookingStepSchema = z.object({
  picture: z.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    "파일을 선택해 주세요."
  ),
  instruction: z
    .string()
    .min(1, "조리 과정을 입력해 주세요.")
    .max(
      INTRODUCE_LIMIT_LENGTH,
      `조리 과정을 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`
    ),
});

const UpdateCookingStepSchema = CreateCookingStepSchema.omit({
  picture: true,
}).extend({
  picture: z.union([
    z.string(),
    z.custom<FileList>(
      (val) => val instanceof FileList && val.length > 0,
      "파일을 선택해 주세요."
    ),
  ]),
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
    "파일을 선택해 주세요."
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
  servings: z.coerce
    .number()
    .min(1, "올바르지 않은 인분 설정입니다.")
    .max(300, "올바르지 않은 인분 설정입니다."),
  category: z.string().min(1, "카테고리를 선택해 주세요."),
  cooking_time: z.coerce
    .number()
    .min(1, "올바르지 않은 요리 시간입니다.")
    .max(2400, "올바르지 않은 요리 시간입니다."),
  cooking_steps: z
    .array(CreateCookingStepSchema)
    .min(1, "요리 과정을 1개 이상 추가해 주세요."),
});

export const UpdateRecipeSchema = CreateRecipeSchema.omit({
  pictures: true,
  cooking_steps: true,
}).extend({
  pictures: z
    .array(z.string())
    .or(
      z.custom<FileList>(
        (val) => val instanceof FileList && val.length > 0,
        "파일을 선택해 주세요."
      )
    ),
  cooking_steps: z
    .array(UpdateCookingStepSchema)
    .min(1, "요리 과정을 1개 이상 추가해 주세요."),
});

export type ICreateRecipeForm = z.infer<typeof CreateRecipeSchema>;
export type IUpdateRecipeForm = z.infer<typeof UpdateRecipeSchema>;
