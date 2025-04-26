import { z } from "zod";

export const FridgeFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "필수 항목" })
    .max(10, { message: "10자 이내로 입력해주세요." }),
});

export type IFridgeForm = z.infer<typeof FridgeFormSchema>;
