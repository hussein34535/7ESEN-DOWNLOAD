import type { ReactNode } from "react"
import "@/app/globals.css"

export const metadata = {
  title: "7eSen TV - Download",
  description: "Download the official 7eSen TV app.",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}