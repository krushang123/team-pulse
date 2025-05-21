import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../src/styles/globals.css"

import SkipNav from "@/components/layout/skip-nav"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Team Pulse",
  description: "Lightweight project & task tracker",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SkipNav />
        <Header />

        <main id='main' className='flex-1 max-w-6xl mx-auto w-full px-4 py-6'>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
