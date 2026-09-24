import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Footer from "@/components/Footer";
import HanumanFloat from "@/components/HanumanFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://songadhwadholmela.vercel.app"),
  title: "Songadhwa Akhra No-7 Dhol Mela",
  description: "Official website of the Songadhwa Akhra No-7 Dhol Mela — Gopalganj, Bihar",
  verification: {
    google: 'NgMWEXrQuNchRih8Z2oqJ9uB9iw9SYN3McWi1zXRYIU',
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Songadhwa Akhra No-7 Dhol Mela",
    description: "Official website of the Songadhwa Akhra No-7 Dhol Mela — Gopalganj, Bihar",
    url: "https://songadhwadholmela.vercel.app",
    siteName: "Songadhwa Akhra No-7 Dhol Mela",
    images: [
      {
        url: "/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Songadhwa Akhra No-7 Dhol Mela",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Songadhwa Akhra No-7 Dhol Mela",
    description: "Official website of the Songadhwa Akhra No-7 Dhol Mela — Gopalganj, Bihar",
    images: ["/images/banner.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      {/* <body>
        <LanguageProvider>
          {children}
          <HanumanFloat />
          <Footer />
        </LanguageProvider>
      </body> */}
      <body>
          <LanguageProvider>
              <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                  {children}
              </div>
              <Footer />
            </div>
          <HanumanFloat />
         </LanguageProvider>
     </body>
    </html>
  );
}

