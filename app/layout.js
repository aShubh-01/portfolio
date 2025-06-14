import './globals.css'

export const metadata = {
  title: 'Shubham Dhokare',
  description: 'AI-first Engineer | Building Business Solutions with Tech',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}