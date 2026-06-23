import { Geist } from 'next/font/google'
import { ReactNode } from "react"

import "styles/globals.css"

const geist = Geist({
  subsets: ['latin'],
})

export const metadata = {
  title: "Backtesting System",
  description: "A comprehensive backtesting system built with Next.js and ClickHouse.",
}

const RootLayout = ({ children, "search-bar": searchBar }: { children: ReactNode, "search-bar": ReactNode }) => {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <section className="bg-system-red-light dark:bg-gray-900">
          <div className="mx-auto grid max-w-[var(--breakpoint-xl)] px-4 py-8 text-center lg:py-16 h-screen">
            <div className="mx-auto place-self-center">
              {children}
              {searchBar}
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}

export default RootLayout
