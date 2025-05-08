import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  AnyUseQueryOptions,
  AnyUseInfiniteQueryOptions,
} from "@tanstack/react-query";

type QueryOptions = AnyUseQueryOptions | AnyUseInfiniteQueryOptions;

const isInfiniteQuery = (
  options: QueryOptions
): options is AnyUseInfiniteQueryOptions => {
  const isInfinite = "initialPageParam" in options;

  return isInfinite;
};

const QueryHydrate = async ({
  children,
  queryOptions,
}: {
  queryOptions: QueryOptions[];
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  await Promise.all(
    queryOptions.map((options) => {
      return isInfiniteQuery(options)
        ? queryClient.prefetchInfiniteQuery(options)
        : queryClient.prefetchQuery(options);
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default QueryHydrate;
