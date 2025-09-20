import './globals.css'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Article Manager',
  description: 'Home Test Frontend - Article Manager'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
