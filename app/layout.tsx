// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { LanguageProvider } from "@/context/LanguageContext";
// import Footer from "@/components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Songadhwa Akhra No-7 Dol Mela",
//   description: "Official website of the Songadhwa Akhra No-7 Dol Mela — Gopalganj, Bihar",
// };

// export default function RootLayout({ children }: LayoutProps<"/">) {
//   return (
//     <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
//       <body>
//         <LanguageProvider>
//           {children}
//           <Footer />
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }

// i am adiding for color
import { Baloo_2, Hind } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin", "devanagari"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",   // renamed
});

const body = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-bodytext",  // renamed
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-ivory text-charcoal font-body antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

