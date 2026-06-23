import { Metadata } from "next"
import { Button } from "@/components/ui"

export const metadata: Metadata = {
  title: "backtestbuddy | home",
  applicationName: "backtestbuddy",
  icons: {
    icon: "@/assets/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://jaiswarsecurities.org",
    title: "Backtestbuddy",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/sandeep-jaiswar/backtestbuddy/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
      BacktestBuddy
    </h1>
  )
}
