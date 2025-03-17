import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Patas do Bem',
  description: 'Animal Help Project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
