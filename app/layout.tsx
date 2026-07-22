import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { ParticlesFX } from "@/components/ui/ParticlesFX";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pedronovaes.co"
  ),
  title: "Pedro Novaes | Call de Diagnóstico Gratuita",
  description:
    "Descubra em 45 minutos por que seu negócio digital não está escalando. Saia com um plano claro pra mudar isso essa semana.",
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <body className="isolate flex min-h-dvh flex-col antialiased font-sans">
        <AnimatedBackground />
        <ParticlesFX />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
