import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandra Clarke | Creative Director, Filmmaker & Visual Storyteller",
  description:
    "Portfolio of Alexandra Clarke. A premium digital exhibition showcasing cinematic storytelling, creative direction, photography, and filmmaking.",
  openGraph: {
    title: "Alexandra Clarke | Creative Director & Filmmaker",
    description:
      "A premium digital exhibition showcasing cinematic storytelling, creative direction, and visual art.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra Clarke | Creative Director & Filmmaker",
    description:
      "A premium digital exhibition showcasing cinematic storytelling, creative direction, and visual art.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-background selection:bg-accent selection:text-background">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} font-sans antialiased h-full w-full overflow-hidden`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
