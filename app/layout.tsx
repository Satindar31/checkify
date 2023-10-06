import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Checkify",
  description: "Get alerted when your site goes down.",
  openGraph: {
    type: "website",
    title: "Checkify",
    description: "We alert you before your customers do.",
    url: "https://checkify-satindar31.vercel.app",
    images: "https://checkify-satindar31.vercel.app/api/og",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@satindar31",
    site: "@satindar31",
    title: "Checkify",
    description: "We alert you before your customers do.",
    images: "https://checkify-satindar31.vercel.app/api/og",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body className={`${inter.className} dark`}>
          <Providers>
            {children}
            <Toaster richColors theme="dark" />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
