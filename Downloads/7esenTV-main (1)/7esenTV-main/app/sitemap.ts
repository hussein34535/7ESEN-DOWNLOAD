import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7esen-tv.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      // Format explicitly to YYYY-MM-DD
      lastModified: new Date().toISOString().split('T')[0],
      // OR keep the full ISO string (YYYY-MM-DDTHH:mm:ss.sssZ) if preferred,
      // but YYYY-MM-DD is often safest for basic pages
      // lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // ... other URLs
  ]
}
