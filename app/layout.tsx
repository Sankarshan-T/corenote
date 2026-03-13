import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoreNote",
  description: "An extremely advanced note taking app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "./favicon-light.png",
        href: "./favicon-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "./favicon-light.png",
        href: "./favicon-light.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          options: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          }
        }}
      >
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="corenote-theme"
          >
            <ConvexClientProvider>
              <Toaster position="bottom-center" />
              {children}
            </ConvexClientProvider>
          </ThemeProvider>
        </body>

      </ClerkProvider>
    </html>
  );
}