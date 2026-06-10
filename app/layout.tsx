import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import QueryProvider from './providers/QueryProvider'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Physics Scout Academy — Master Physics With Clarity & Confidence',
  description:
    'Expert-led physics education by Irfan Haider — Associate Member of the Institute of Physics, UK. Online and onsite classes from fundamentals to advanced concepts.',
  keywords: 'physics, tuition, online classes, onsite, Parachinar, Pakistan, FSc, BSc, physics academy',
  openGraph: {
    title: 'Physics Scout Academy',
    description: 'Master Physics With Clarity, With Confidence',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
