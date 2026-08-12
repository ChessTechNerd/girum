import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Playfair_Display } from 'next/font/google'
import './globals.css'

// Display serif for luxury headings + clean sans for body
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Girum Marketing & Promotion — Growing Brands Digitally',
  description:
    'Girum Marketing & Promotion is a premium digital marketing agency blending creativity with strategy to build brands that matter and deliver measurable growth.',
  generator: 'v0.app',
  keywords: [
    'digital marketing',
    'social media management',
    'SEO',
    'brand strategy',
    'advertising agency',
    'Girum Marketing',
  ],
  openGraph: {
    title: 'Girum Marketing & Promotion',
    description: 'Creativity meets strategy. Marketing that delivers results.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo2.jpg', media: '(prefers-color-scheme: light)' },
      { url: '/logo2.jpg', media: '(prefers-color-scheme: dark)' },
      { url: '/logo2.jpg', type: 'image/svg+xml' },
    ],
    apple: '/logo2.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141518',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${playfair.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
