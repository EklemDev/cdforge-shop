import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import FaviconLoader from "@/components/favicon-loader"
import UpdateIndicator from "@/components/update-indicator"
import LoadingSpinner from "@/components/loading-spinner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeForge - Transformando ideias em soluções digitais",
  description: "Bots inteligentes, sites profissionais e serviços especializados para impulsionar seu negócio",
  generator: 'v0.dev',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Configuração específica para Firefox */}
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="16x16" />
        
        {/* Shortcut icon para compatibilidade */}
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        
        {/* Apple Touch Icon para iOS */}
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Manifest para PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Meta tags para tema */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* Meta tag específica para Firefox */}
        <meta name="msapplication-config" content="none" />
        
        {/* Força o Firefox a usar o PNG */}
        <meta name="application-name" content="CodeForge" />
        <meta name="msapplication-TileImage" content="/logo.png" />
      </head>
      <body className={inter.className}>
        <FaviconLoader />
        <UpdateIndicator />
        <LoadingSpinner show={false} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
