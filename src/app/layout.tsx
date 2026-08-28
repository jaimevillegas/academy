import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VILLEGAS_ACADEMIA · Formación técnica CAD / EDA / BIM",
  description:
    "SOLIDWORKS, KiCad y Revit enseñados desde el criterio de diseño. Cada curso entrega un artefacto real.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="font-sans-plex min-h-full flex flex-col bg-[var(--chassis)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
