import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { GlobalContextProvider } from "./Context/store";
import NavigationBar from "@/components/NavigationBar";

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
      <body className={" "}>
        <GlobalContextProvider>
          <Providers>
            <div className="sm:!h-[100vh] ">
              <NavigationBar />
              {children}
            </div>
          </Providers>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
