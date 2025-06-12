import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

// Font optimization
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Pujo IQ Quiz | Test Your Knowledge',
  description: 'Play the Pujo IQ Quiz to test your knowledge about Durga Puja, Bengali culture, and traditions. Every quiz helps support community initiatives!',
  keywords: ['quiz', 'durga puja', 'bengali culture', 'trivia', 'educational game'],
  authors: [{ name: 'Project Trinoyon' }],
  openGraph: {
    title: 'Pujo IQ Quiz Challenge',
    description: 'Test your knowledge about Durga Puja and Bengali culture while supporting community initiatives',
    type: 'website',
    locale: 'en_US',
    url: 'https://pujoquiz.example.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pujo IQ Quiz Challenge',
    description: 'Test your knowledge about Durga Puja and Bengali culture',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
