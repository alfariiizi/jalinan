import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    search: string;
  };
};

export default function page({ searchParams: { search } }: Props) {
  const searchParams = new URLSearchParams({ search });
  redirect(`/search/accounts?${searchParams.toString()}`);
}
