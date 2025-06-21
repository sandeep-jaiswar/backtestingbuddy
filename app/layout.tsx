import { ReactNode } from "react"
import "styles/globals.css"

// Add metadata for better SEO and app information
export const metadata = {
  title: 'Backtesting System',
  description: 'A comprehensive backtesting system built with Next.js and ClickHouse.',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
