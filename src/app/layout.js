import './globals.css'

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Full-stack developer portfolio showcasing modern web applications',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}