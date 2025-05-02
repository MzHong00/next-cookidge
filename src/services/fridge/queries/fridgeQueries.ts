import type { AxiosRequestConfig } from "axios";
import { queryOptions } from "@tanstack/react-query";

import { FridgeService } from "..";
import type { IFridgeList } from "@/types/fridge/type";

export class FridgeQueries {
  static readonly keys = {
    list: ["fridge", "list"],
    detail: ["fridge", "detail"],
  };

  static listQuery(options?: AxiosRequestConfig) {
    return queryOptions<IFridgeList[]>({
      queryKey: this.keys.list,
      queryFn: () => FridgeService.fetchFridgeList(options),
    });
  }

  static detailQuery(id: string, options?: AxiosRequestConfig) {
    return queryOptions({
      queryKey: [...this.keys.detail, id],
      queryFn: () => FridgeService.fetchFridgeDetail(id, options),
    });
  }
}
