// type Props = {
//   searchParams: {
//     search: string;
//   };
// };

export default function page() {
  // const searchParams = new URLSearchParams({ search });
  // redirect(`/search/accounts?${searchParams.toString()}`);

  return (
    <div className="flex w-full items-center justify-center">
      <p className="text-center">You can search your friends or tags!</p>
    </div>
  );
}
