// utils/date.ts

/**
 * Format a JS Date to ClickHouse-compatible `DateTime` string
 * Format: "YYYY-MM-DD HH:mm:ss"
 */
export function formatDateTime(date: Date): string {
  return date.toISOString().replace("T", " ").substring(0, 19)
}

/**
 * Format to ClickHouse-compatible `DateTime64(3)` format
 * Format: "YYYY-MM-DD HH:mm:ss.SSS"
 */
export function formatDateTime64(date: Date): string {
  const iso = date.toISOString()
  const [datePart, timePart] = iso.split("T")
  const [hhmmss, ms] = timePart?.split(".")
  return `${datePart} ${hhmmss}.${ms.slice(0, 3)}`
}
