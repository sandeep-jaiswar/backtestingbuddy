import { Metadata } from "next"
import Button from "components/Button/Button"

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
    url: "https://backtestbuddy.com",
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
    <section className="bg-red dark:bg-gray-900">
      <div className="max-w-(--breakpoint-xl) mx-auto grid px-4 py-8 text-center lg:py-16">
        <div className="mx-auto place-self-center">
          BacktestBuddy is a powerful tool designed to help you backtest your trading strategies with ease. Whether
          you're a seasoned trader or just starting out, BacktestBuddy provides the tools you need to analyze your
          strategies and make informed decisions.
        </div>
        <Button>Hello</Button>
      </div>
    </section>
  )
}
