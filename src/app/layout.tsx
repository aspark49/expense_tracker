import "@/styles/globals.scss";
import "@/styles/theme.scss";

import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./_components/Providers";
import _RootLayout from "./_components/RootLayout";

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
            <_RootLayout>{children}</_RootLayout>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
