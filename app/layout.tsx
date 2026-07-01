import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import FloatingCTA from "@/components/FloatingCTA";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Denver Luxury Real Estate | Buy & Sell Homes in Denver, Boulder & Aurora | Daeluxe Advisors",
  description:
    "Discover luxury homes and real estate in Denver, Boulder, and Aurora with Daeluxe Advisors. Trusted Denver real estate agents for buying, selling, or investing in high-end Colorado properties. Expert guidance, proven results, and personalized service for your next luxury move.",
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://daeluxe.com/",
  },
  openGraph: {
    title: "Denver Luxury Real Estate | Buy & Sell Homes in Denver, Boulder & Aurora | Daeluxe Advisors",
    description:
      "Explore exclusive luxury real estate listings and expert services in Denver, Boulder, and Aurora. Work with Daeluxe Advisors — Denver’s leading luxury real estate specialists.",
    url: "https://daeluxe.com/",
    siteName: "Daeluxe Real Estate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Daeluxe Real Estate | Denver Luxury Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denver Luxury Real Estate | Buy & Sell Homes in Denver, Boulder & Aurora | Daeluxe Advisors",
    description:
      "Partner with Daeluxe Advisors for your Denver, Boulder, or Aurora luxury real estate journey. Unmatched expertise in Colorado’s premium property market.",
    images: ["/og-image.png"],
    site: "@daeluxerealty", // Update if your Twitter is different
    creator: "@daeluxerealty",
  },
  themeColor: "#E8D4B0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          {children}
          <FloatingCTA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
