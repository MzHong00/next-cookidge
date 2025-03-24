"use client";

import { RankQueries } from "@/services/rank/queries/rankQueries";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function RankFollowPage() {
    const {data} = useInfiniteQuery(RankQueries.InfiniteFollowerRankQuery());

    return <div></div>
}