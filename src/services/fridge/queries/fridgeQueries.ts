import { queryOptions } from "@tanstack/react-query";

import { FridgeService } from "..";
import type { IFridgeList } from "@/types/fridge/type";

export class FridgeQueries {
  static readonly keys = {
    list: ["fridge", "list"],
    detail: ["fridge", "detail"],
  };

  static listQuery() {
    return queryOptions<IFridgeList[]>({
      queryKey: this.keys.list,
      queryFn: () => FridgeService.fetchFridgeList(),
    });
  }

  static detailQuery(id: string) {
    return queryOptions({
      queryKey: [...this.keys.detail, id],
      queryFn: async () => await FridgeService.fetchFridgeDetail(id),
    });
  }
}
