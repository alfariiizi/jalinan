import LeftSidebar from "@/components/left-sidebar";
import Navbar, { MobileNavbar } from "@/components/navbar";
import { navbarHeight } from "@/components/navbar/shared";
import RightSidebar from "@/components/right-sidebar";

type Props = { children: React.ReactNode };

export default async function layout({ children }: Props) {
  return (
    <div className="relative">
      <Navbar />
      <div
        style={{
          minHeight: `calc(100dvh - ${navbarHeight} - 1px)`,
        }}
        className="mw-center flex gap-10"
      >
        <LeftSidebar />
        <div className="w-full max-w-[60ch] py-5">{children}</div>
        <RightSidebar />
        <MobileNavbar />
      </div>
    </div>
  );
}
