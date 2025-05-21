import { ReactNode } from "react"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import StoreProvider from "@/providers/store-provider"

import "../src/styles/globals.css"

type RootLayoutProps = {
  children: ReactNode
}

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

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}

export default RootLayout
