import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinity Algo by Jeremy | AI Trading Intelligence Platform",
  description: "Professional AI Trading Intelligence Platform. 22+ calculators, AI analysis, expert education from Infinity Algo Academy.",
  keywords: [
    "Infinity Algo",
    "Trading Calculators",
    "Fibonacci",
    "Position Size",
    "AI Trading",
    "Forex Tools",
    "Jeremy",
    "Trading Academy",
  ],
  authors: [{ name: "Jeremy - Infinity Algo" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Infinity Algo by Jeremy | AI Trading Intelligence",
    description: "Professional AI Trading Intelligence Platform for Serious Traders",
    url: "https://infinityalgoacademy.net/",
    siteName: "Infinity Algo",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infinity Algo - AI Trading Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Algo by Jeremy",
    description: "AI Trading Intelligence for Serious Traders",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
