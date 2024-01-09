import type { Metadata } from "next";
import { GlobalContextProvider } from "../Context/store";

export const metadata: Metadata = {
  title: "Survey form json",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>Json for the survey</h1>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
