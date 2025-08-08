import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HypeUSD - 下一代Delta中性稳定币',
  description: '基于Hyperliquid的高收益稳定币协议，通过BTC多空对冲策略获得8-15%年化收益',
  keywords: ['DeFi', '稳定币', 'Delta对冲', 'Hyperliquid', 'BTC'],
  authors: [{ name: 'HypeUSD Team' }],
  creator: 'HypeUSD',
  publisher: 'HypeUSD',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hype-usd.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HypeUSD - 下一代Delta中性稳定币',
    description: '基于Hyperliquid的高收益稳定币协议',
    url: 'https://hype-usd.vercel.app',
    siteName: 'HypeUSD',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HypeUSD',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HypeUSD - 下一代Delta中性稳定币',
    description: '基于Hyperliquid的高收益稳定币协议',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
