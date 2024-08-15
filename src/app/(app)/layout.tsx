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
        className="mw-center-smallpad flex gap-10"
      >
        <LeftSidebar />
        <div className="mb-[70px] w-full max-w-[60ch] py-5 md:mb-0">
          {children}
        </div>
        <RightSidebar />
        <MobileNavbar />
      </div>
    </div>
  );
}
