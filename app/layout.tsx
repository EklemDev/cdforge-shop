import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import FaviconLoader from "@/components/favicon-loader"
import UpdateIndicator from "@/components/update-indicator"
import LoadingSpinner from "@/components/loading-spinner"
import MobileOptimizer from "@/components/mobile-optimizer"

// Otimização da fonte - pré-carregamento e display swap
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "CodeForge - Transformando ideias em soluções digitais",
  description: "Bots inteligentes, sites profissionais e serviços especializados para impulsionar seu negócio",
  generator: 'v0.dev',
  metadataBase: new URL('https://codeforge.vercel.app'),
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "CodeForge - Transformando ideias em soluções digitais",
    description: "Bots inteligentes, sites profissionais e serviços especializados para impulsionar seu negócio",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'CodeForge Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeForge - Transformando ideias em soluções digitais",
    description: "Bots inteligentes, sites profissionais e serviços especializados para impulsionar seu negócio",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
}

// Viewport otimizado para mobile
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preload crítico para performance */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        <FaviconLoader />
        <UpdateIndicator />
        <LoadingSpinner show={false} />
        <MobileOptimizer />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
