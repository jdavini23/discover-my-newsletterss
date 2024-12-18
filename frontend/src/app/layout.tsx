import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Use a client-side font loading approach
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap' 
})

export const metadata: Metadata = {
  title: 'Discover My Newsletters',
  description: 'Find and curate the best newsletters',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}