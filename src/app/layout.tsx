import type { Metadata } from "next";
import "./globals.css";
import { exo2, orbitron, spaceGrotesk } from "@/lib/utils";
import Footer from "@/components/common/Footer/Footer";
import { FavoritesProvider } from "@/hooks/FavoritesContext";

export const metadata: Metadata = {
  title: "SpaceX Launcher",
  description: "Mission Control for SpaceX Launch History",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${exo2.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col`}
      >
        <FavoritesProvider>
          <div className="flex-1 flex flex-col">{children}</div>
        </FavoritesProvider>
        <Footer />
      </body>
    </html>
  );
}
