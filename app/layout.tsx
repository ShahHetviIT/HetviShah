import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./theme-enhancements.css";
import "./light-theme.css";
import { MotionProvider } from "@/components/ui/motion";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "200 800",
});
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-technical",
  display: "swap",
  weight: "100 800",
  preload: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Hetvi Shah Portfolio",
  authors: [{ name: "Hetvi Shah" }],
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: siteTitle,
    description: siteDescription,
    siteName: "Hetvi Shah",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: { icon: "/icon.svg", apple: "/apple-icon" },
};
export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
