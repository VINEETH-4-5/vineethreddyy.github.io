import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { ThemeProvider } from '../components/theme-provider' // relative path from /app

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  // Ensures absolute URLs for OG/Twitter and fixes Next.js warning
  metadataBase: new URL('https://vineethreddyy.github.io'),

  title: 'VINEETH REDDY YADANAPARTHI - Backend Engineer & Full Stack Developer',
  description:
    'Backend-focused full-stack developer with 4+ years of experience in Java, Spring Boot, Microservices, and PostgreSQL. Building resilient, scalable, and high-performance systems.',
  keywords:
    'Java, Spring Boot, React, PostgreSQL, Microservices, Backend Engineer, Full Stack Developer, Bangalore',
  authors: [{ name: 'VINEETH REDDY YADANAPARTHI' }],
  creator: 'VINEETH REDDY YADANAPARTHI',

  openGraph: {
    title:
      'VINEETH REDDY YADANAPARTHI - Backend Engineer & Full Stack Developer',
    description:
      'Building resilient, scalable, and high-performance systems with Java, Spring Boot, and React.',
    type: 'website',
    locale: 'en_US',
    url: 'https://vineethreddyy.github.io',
    images: ['/vineeth-profile.jpg'], // served from /public
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'VINEETH REDDY YADANAPARTHI - Backend Engineer & Full Stack Developer',
    description:
      'Building resilient, scalable, and high-performance systems with Java, Spring Boot, and React.',
    images: ['/vineeth-profile.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
