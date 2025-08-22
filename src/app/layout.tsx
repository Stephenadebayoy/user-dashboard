/** @format */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Dashboard ",
  description:
    "Access your personalized dashboard to manage your account, track activity, view analytics, and stay updated with the latest insights.",
  keywords: [
    "user dashboard",
    "account management",
    "analytics",
    "user profile",
    "activity tracking",
  ],
  authors: [{ name: "User Dashboard" }],
  openGraph: {
    title: "User Dashboard ",
    description:
      "Manage your account, track activities, and explore insights all in one place.",
    url: "https://user-dashboard-one-delta.vercel.app/dashboard",
    siteName: "",
    images: [
      {
        url: "https://user-dashboard-one-delta.vercel.app/og-dashboard.png",
        width: 1200,
        height: 630,
        alt: "User Dashboard preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "User Dashboard | YourAppName",
    description:
      "Your personalized space to manage your account and track progress.",
    images: ["https://user-dashboard-one-delta.vercel.app/og-dashboard.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
