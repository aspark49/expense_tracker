import "@/styles/globals.scss";
import "@/styles/theme.scss";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./_components/Providers";
import SideMenu from "./_components/SideMenu";

export const metadata: Metadata = {
  title: "expense tracker",
  description: "expense tracker",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <TRPCReactProvider>
            <div className="flex">
              <div className="flex-1">
                <SideMenu>{children}</SideMenu>
              </div>
            </div>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
