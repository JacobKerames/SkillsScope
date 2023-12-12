import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <header>
        {/* Header content (if any) */}
      </header>

      <main>
        {children}
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  )
}
