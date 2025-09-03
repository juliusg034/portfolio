import './globals.css'

export const metadata = {
  title: 'Julius Gutierrez - Portfolio',
  description: 'Computer Science student looking for opportunities in Software Engineering',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}