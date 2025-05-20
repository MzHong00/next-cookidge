import axios from "..";

import type { IIngredient } from "@/types/ingredient/ingredient";

export class AIService {
  static readonly api = "/ai";

  static async generateIngredientByReceiptImage(
    picture: string
  ): Promise<Pick<IIngredient, "name" | "quantity">[]> {
    return (
      await axios.post(`${this.api}/ocr/receipt`, {
        picture: picture,
      })
    ).data;
  }
}
