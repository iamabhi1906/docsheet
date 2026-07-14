import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "./ui/font";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Docsheet | Write together, clearly",
  description: "A calm, collaborative home for ideas in motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
