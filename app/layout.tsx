import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Asistente de Bienestar Psicológico',
  description:
    'Herramienta de orientación y psicoeducación sobre autoexigencia, síndrome del impostor, perfeccionismo, estrés laboral y ansiedad relacionada con el rendimiento.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f0f0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-[#0f0f0f]" style={{ fontFamily: inter.style.fontFamily }}>
      <body className="antialiased h-screen overflow-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
