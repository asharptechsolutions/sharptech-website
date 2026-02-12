import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://asharptechsolutions.github.io/sharptech-website";
const siteName = "SharpTech.ai";
const siteDescription = "We build AI-powered solutions and custom applications for businesses ready to move fast. From idea to deployed MVP in 24 hours.";

export const metadata: Metadata = {
  title: {
    default: "SharpTech.ai — AI Consulting & Custom App Development",
    template: "%s | SharpTech.ai",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  keywords: ["AI consulting", "custom app development", "AI-powered apps", "MVP development", "SaaS builder", "SharpTech"],
  authors: [{ name: "SharpTech.ai" }],
  creator: "SharpTech.ai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "SharpTech.ai — AI Consulting & Custom App Development",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SharpTech.ai — AI-Powered App Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SharpTech.ai — AI Consulting & Custom App Development",
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: `${siteUrl}/icon.svg`, type: "image/svg+xml" },
    ],
    apple: [
      { url: `${siteUrl}/icon.svg`, type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-[100dvh] flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
