import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { GlobalContextProvider } from "./Context/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dynamic Survey Form Generator",
  description:
    "Create interactive and dynamic survey forms with conditional logic using this versatile survey form generator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Providers>{children}</Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
