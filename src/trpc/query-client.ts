import {
  defaultShouldDehydrateQuery,
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";
import { type TRPCError } from "@trpc/server";
import toast from "react-hot-toast";
import SuperJSON from "superjson";

export const createQueryClient = (
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unauthorizedCallback: (() => void) | undefined = () => {},
) =>
  new QueryClient({
    mutationCache: new MutationCache({
      async onError(error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        const err = (error as any).data as TRPCError;
        const code = err.code;
        if (code === "UNAUTHORIZED") {
          toast.error("Please login to your account!");
          unauthorizedCallback();
        }
      },
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
