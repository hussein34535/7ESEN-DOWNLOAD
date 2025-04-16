import type { Metadata } from 'next'
import type { ReactNode } from "react"
import Script from 'next/script'
import "@/app/globals.css"

// Assuming your website URL. Replace if different.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Required for absolute URLs in Open Graph
  title: "7eSen TV (حسين تيفي) - تنزيل التطبيق الرسمي | Download 7eSenTV",
  description: "تنزيل تطبيق 7eSen TV الرسمي (حسين تيفي) لمشاهدة القنوات العربية والرياضية. حمل 7esen TV مجاناً. Download the official 7esentv app (حسينو) for Android.",
  keywords: "7esen, 7esentv, حسينو, حسين تيفي, تنزيل 7esen, download 7esentv, 7esen tv app, 7esen tv apk, قنوات عربية, قنوات رياضية, مباريات كرة القدم, تحميل 7esentv, تطبيق 7esentv, مشاهدة قنوات",
  // Open Graph / Facebook
  openGraph: {
    title: "7eSen TV (حسين تيفي) - تنزيل التطبيق الرسمي",
    description: "تنزيل تطبيق 7eSen TV الرسمي لمشاهدة القنوات العربية والرياضية مجاناً.",
    url: siteUrl,
    siteName: '7eSen TV',
    images: [
      {
        url: '/logo.png', // Must be an absolute URL or have metadataBase set
        width: 110,
        height: 110,
        alt: '7eSen TV Logo',
      },
    ],
    locale: 'ar_AR',
    type: 'website',
  },
  // Twitter
  twitter: {
    card: 'summary', // Can be 'summary_large_image' if you have a larger banner
    title: "7eSen TV (حسين تيفي) - تنزيل التطبيق",
    description: "تنزيل تطبيق 7eSen TV الرسمي لمشاهدة القنوات العربية والرياضية مجاناً.",
    // images: ['/logo.png'], // Twitter uses og:image by default
  },
  // More specific metadata
  alternates: {
    canonical: '/', // Sets the canonical URL for the homepage
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  // JSON-LD Structured Data for SoftwareApplication
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '7eSen TV',
    operatingSystem: 'Android',
    applicationCategory: 'MultimediaApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5', // Example rating - update if applicable
      ratingCount: '1500' // Example count - update if applicable
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    description: metadata.description, // Reuse description
    image: `${siteUrl}/logo.png`, // Needs absolute URL
    url: `${siteUrl}${metadata.alternates?.canonical}`, // URL to the download page
    downloadUrl: `${siteUrl}/7esenTV.apk` // Direct download link
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta name="google-site-verification" content="NdyoVr3Ux3Iku5KngNSznS7XqXH8simW0vv_q3UR5Ww" />
        {/* Viewport and Icon are handled by Next.js metadata object now, but keeping viewport for safety */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
        {/* <link rel="icon" href="/logo.png" /> */}
        
        {/* Add JSON-LD Structured Data */}
        <Script 
          id="app-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2393153600924393"
              crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}