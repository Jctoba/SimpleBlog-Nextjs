import { Inter } from 'next/font/google'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog CEPI',
  description: 'Blog professionnel de CEPI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body className={inter.className} style={{ backgroundColor: "#222831" }}>
        <Header />
        <main className="container-fluid text-white">
          {children}
        </main>
        <Footer />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}