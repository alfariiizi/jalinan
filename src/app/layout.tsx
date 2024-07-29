import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Providers from "./_components/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Jalinan",
    default: "Jalinan",
  },
  description:
    "\"Jalinan\" is an innovative social media platform that connects individuals from diverse backgrounds through shared interests and experiences. Rooted in the spirit of Indonesian culture, the platform emphasizes building meaningful relationships and fostering community engagement. Whether you're looking to share stories, collaborate on projects, or simply make new friends, Jalinan provides a welcoming space where every voice can be heard and valued. With features designed to enhance communication and interaction, Jalinan is not just a platform—it's a community woven together by the threads of unity and understanding.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
