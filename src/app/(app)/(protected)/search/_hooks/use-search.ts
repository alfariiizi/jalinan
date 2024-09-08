import { useQueryState, parseAsString } from "nuqs";

export const useSearch = () =>
  useQueryState("search", parseAsString.withDefault(""));
