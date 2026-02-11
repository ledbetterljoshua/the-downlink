import type { Metadata } from "next"
import { Newsreader, Azeret_Mono } from "next/font/google"
import "./globals.css"

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
})

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
  display: "swap",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "The Downlink",
  description:
    "Signal from the noise. A personal news briefing curated by Cassini Tessera.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${azeret.variable}`}>
      <body>{children}</body>
    </html>
  )
}
