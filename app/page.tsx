import { Metadata } from "next"

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
    <section className="bg-system-red-light dark:bg-gray-900">
      <div className="mx-auto grid max-w-[var(--breakpoint-xl)] px-4 py-8 text-center lg:py-16">
        <div className="mx-auto place-self-center">
          BacktestBuddy is a powerful tool designed to help you backtest your trading strategies with ease. Whether
          you're a seasoned trader or just starting out, BacktestBuddy provides the tools you need to analyze your
          strategies and make informed decisions.
        </div>
        <button type="button">Hello</button>
      </div>
    </section>
  )
}
