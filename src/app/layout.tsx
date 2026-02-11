import type { Metadata, Viewport } from "next"
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08080a",
}

export const metadata: Metadata = {
  title: "The Downlink",
  description:
    "Signal from the noise. A personal news briefing curated by Cassini Tessera.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "The Downlink",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${azeret.variable}`}
      style={{ backgroundColor: "#08080a" }}
    >
      <body style={{ backgroundColor: "#08080a" }}>{children}</body>
    </html>
  )
}
