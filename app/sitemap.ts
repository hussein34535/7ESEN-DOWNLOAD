import { MetadataRoute } from 'next'

// Use the environment variable or fall back to your specific domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://7esen-tv.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(), // Use current date, update if content changes significantly
      changeFrequency: 'yearly', // How often the content might change
      priority: 1, // Priority for the homepage (highest)
    },
    // Add more URLs here if you add more pages later
    // {
    //   url: `${siteUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
} 