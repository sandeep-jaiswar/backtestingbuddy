import { ADX, ATR, BollingerBands, EMA, MACD, RSI, SMA, Stochastic } from "technicalindicators"
import { clickhouse } from "@/lib/db"
import { getSymbolId } from "@/lib/symbols"
import { toUnix } from "@/lib/unix"
import { yahoo } from "@/lib/yahoo"
import { OHLCV, OHLCVSchema } from "@/schema/ohlcv"
import { formatDateTime } from "@/lib/date"

interface HistoricalQuote {
  date: Date
  open?: number
  high?: number
  low?: number
  close?: number
  volume?: number
}

export async function feedOHLCV(symbol: string, timeframe = "1d"): Promise<void> {
  try {
    const symbol_id = await getSymbolId(symbol)
    if (!symbol_id) {
      console.warn(`⚠️ Skipping OHLCV for ${symbol} — symbol_id not found`)
      return
    }

    const period2 = new Date()
    const period1 = new Date()
    period1.setMonth(period2.getMonth() - 12)

    const data: HistoricalQuote[] = await yahoo.historical(symbol, {
      period1,
      period2,
      interval: "1d",
      events: "history",
    })

    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`⚠️ No OHLCV data found for ${symbol}`)
      return
    }

    const close = data.map((d) => Number(d.close ?? 0))
    const high = data.map((d) => Number(d.high ?? 0))
    const low = data.map((d) => Number(d.low ?? 0))
    const open = data.map((d) => Number(d.open ?? 0))
    const volume = data.map((d) => Number(d.volume ?? 0))

    // Calculate indicators
    const sma50 = SMA.calculate({ period: 50, values: close })
    const sma200 = SMA.calculate({ period: 200, values: close })
    const ema20 = EMA.calculate({ period: 20, values: close })
    const rsi14 = RSI.calculate({ period: 14, values: close })
    const macd = MACD.calculate({
      values: close,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    })
    const atr14 = ATR.calculate({ high, low, close, period: 14 })
    const bb = BollingerBands.calculate({ period: 20, stdDev: 2, values: close })
    const adx14 = ADX.calculate({ close, high, low, period: 14 })
    const stoch = Stochastic.calculate({
      high,
      low,
      close,
      period: 14,
      signalPeriod: 3,
    })

    const ingestionTime = formatDateTime(new Date())

    const rows: OHLCV[] = data.map((d, i) => {
      const offset = (arr: unknown[]) => i - (data.length - arr.length)
      return OHLCVSchema.parse({
        symbol_id,
        ts: formatDateTime(new Date(d.date ?? new Date())),
        timeframe,
        open: Number(d.open ?? 0),
        high: Number(d.high ?? 0),
        low: Number(d.low ?? 0),
        close: Number(d.close ?? 0),
        volume: Number(d.volume ?? 0),

        sma_50: sma50.at(offset(sma50)) ?? 0,
        sma_200: sma200.at(offset(sma200)) ?? 0,
        ema_20: ema20.at(offset(ema20)) ?? 0,

        rsi_14: rsi14.at(offset(rsi14)) ?? 0,
        macd_line: macd.at(offset(macd))?.MACD ?? 0,
        macd_signal: macd.at(offset(macd))?.signal ?? 0,

        bb_upper: bb.at(offset(bb))?.upper ?? 0,
        bb_lower: bb.at(offset(bb))?.lower ?? 0,

        atr_14: atr14.at(offset(atr14)) ?? 0,
        supertrend: 0,
        adx_14: adx14.at(offset(adx14))?.adx ?? 0,

        williams_r: 0,
        obv: 0,

        stochastic_k: stoch.at(offset(stoch))?.k ?? 0,
        stochastic_d: stoch.at(offset(stoch))?.d ?? 0,

        ingestion_time: ingestionTime,
      })
    })

    await clickhouse.insert({
      table: "ohlcv",
      values: rows,
      format: "JSONEachRow",
    })

    console.log(`✅ Inserted OHLCV for ${symbol} (${rows.length} rows)`)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error feeding OHLCV for ${symbol}: ${error.message}`)
    } else {
      console.error(`❌ Unknown error feeding OHLCV for ${symbol}:`, error)
    }
  }
}
