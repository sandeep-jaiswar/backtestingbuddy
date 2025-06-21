import { ADX, ATR, BollingerBands, EMA, MACD, RSI, SMA, Stochastic } from "technicalindicators"
import { clickhouse } from "@/lib/db"
import { getSymbolId } from "@/lib/symbols"
import { yahoo } from "@/lib/yahoo"
import { Indicator, IndicatorSchema } from "@/schema/indicators"
import { formatDateTime } from "@/lib/date"
import { HistoricalQuote } from "yahoo-finance2/dist/esm/src/modules/historical"

// This function will focus solely on calculating and feeding indicators.
// Raw OHLCV data fetching should be handled by app/api/feed/historical/route.ts
export async function calculateAndFeedIndicators(
  symbol: string,
  timeframe: string = "1d",
  lookbackMonths: number = 12
): Promise<void> {
  try {
    const symbol_id = await getSymbolId(symbol)
    if (!symbol_id) {
      console.warn(`⚠️ Skipping indicator calculation for ${symbol} — symbol_id not found`)
      return
    }

    // 1. Fetch raw historical OHLCV data (required for indicator calculation)
    const period2 = new Date()
    const period1 = new Date()
    period1.setMonth(period2.getMonth() - lookbackMonths)

    const data: HistoricalQuote[] = await yahoo.historical(symbol, {
      period1,
      period2,
      interval: "1d", // Indicators typically calculated on daily or specific intervals
      events: "history",
    })

    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`⚠️ No historical OHLCV data found for ${symbol} to calculate indicators.`)
      return
    }

    // Extract necessary arrays for technicalindicators library
    const close = data.map((d) => Number(d.close ?? 0))
    const high = data.map((d) => Number(d.high ?? 0))
    const low = data.map((d) => Number(d.low ?? 0))
    const open = data.map((d) => Number(d.open ?? 0))
    const volume = data.map((d) => Number(d.volume ?? 0))

    // Ensure enough data points for indicator calculation
    if (close.length < 200) {
      // Example: for SMA200, need at least 200 data points
      console.warn(
        `Insufficient data (${close.length} points) for comprehensive indicator calculation for ${symbol}. Skipping.`
      )
      return
    }

    // 2. Calculate indicators
    const indicatorsToInsert: Indicator[] = []
    const computedTime = new Date()

    // Helper to safely get indicator value, considering offset and default to 0
    const getIndicatorValue = (
      arr: (
        | number
        | { MACD?: number; signal?: number; adx?: number; k?: number; d?: number; upper?: number; lower?: number }
        | undefined
      )[],
      index: number,
      path?: string
    ) => {
      const val = arr[index]
      if (val === undefined || val === null) return 0
      if (typeof val === "number") return val
      if (typeof val === "object" && path) {
        const keys = path.split(".")
        let current: any = val
        for (const key of keys) {
          if (current && typeof current === "object" && key in current) {
            current = current[key]
          } else {
            return 0 // Path not found
          }
        }
        return typeof current === "number" ? current : 0
      }
      return 0 // Default for unexpected types
    }

    // Calculate indicators for each data point and push to array
    // Note: technicalindicators library returns arrays that are shorter than input array due to period requirements.
    // We need to align them by date/timestamp.

    const sma50Values = SMA.calculate({ period: 50, values: close })
    const sma200Values = SMA.calculate({ period: 200, values: close })
    const ema20Values = EMA.calculate({ period: 20, values: close })
    const rsi14Values = RSI.calculate({ period: 14, values: close })
    const macdValues = MACD.calculate({
      values: close,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false,
    })
    const atr14Values = ATR.calculate({ high, low, close, period: 14 })
    const bbValues = BollingerBands.calculate({ period: 20, stdDev: 2, values: close })
    const adx14Values = ADX.calculate({ close, high, low, period: 14 })
    const stochValues = Stochastic.calculate({
      high,
      low,
      close,
      period: 14,
      signalPeriod: 3,
    })

    // The offset logic ensures we align the indicator values with the correct date from the original data array.
    // Indicators will have fewer data points than the original OHLCV data due to their calculation periods.
    for (let i = 0; i < data.length; i++) {
      const currentDataPoint = data[i]
      const ts = new Date(currentDataPoint.date)
      const formattedTs = formatDateTime(ts) // Match ClickHouse DateTime format

      // Determine the offset for each indicator array based on its period
      const offsetSMA50 = data.length - sma50Values.length
      const offsetSMA200 = data.length - sma200Values.length
      const offsetEMA20 = data.length - ema20Values.length
      const offsetRSI14 = data.length - rsi14Values.length
      const offsetMACD = data.length - macdValues.length
      const offsetATR14 = data.length - atr14Values.length
      const offsetBB = data.length - bbValues.length
      const offsetADX14 = data.length - adx14Values.length
      const offsetStoch = data.length - stochValues.length

      if (i >= offsetSMA50) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "SMA_50",
            value: getIndicatorValue(sma50Values, i - offsetSMA50),
            params: "50",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetSMA200) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "SMA_200",
            value: getIndicatorValue(sma200Values, i - offsetSMA200),
            params: "200",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetEMA20) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "EMA_20",
            value: getIndicatorValue(ema20Values, i - offsetEMA20),
            params: "20",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetRSI14) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "RSI_14",
            value: getIndicatorValue(rsi14Values, i - offsetRSI14),
            params: "14",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetMACD) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "MACD_Line",
            value: getIndicatorValue(macdValues, i - offsetMACD, "MACD"),
            params: "12,26,9",
            computed_time: computedTime,
          })
        )
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "MACD_Signal",
            value: getIndicatorValue(macdValues, i - offsetMACD, "signal"),
            params: "12,26,9",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetATR14) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "ATR_14",
            value: getIndicatorValue(atr14Values, i - offsetATR14),
            params: "14",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetBB) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "BB_Upper",
            value: getIndicatorValue(bbValues, i - offsetBB, "upper"),
            params: "20,2",
            computed_time: computedTime,
          })
        )
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "BB_Lower",
            value: getIndicatorValue(bbValues, i - offsetBB, "lower"),
            params: "20,2",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetADX14) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "ADX_14",
            value: getIndicatorValue(adx14Values, i - offsetADX14, "adx"),
            params: "14",
            computed_time: computedTime,
          })
        )
      }
      if (i >= offsetStoch) {
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "Stochastic_K",
            value: getIndicatorValue(stochValues, i - offsetStoch, "k"),
            params: "14,3",
            computed_time: computedTime,
          })
        )
        indicatorsToInsert.push(
          IndicatorSchema.parse({
            symbol_id,
            ts,
            timeframe,
            name: "Stochastic_D",
            value: getIndicatorValue(stochValues, i - offsetStoch, "d"),
            params: "14,3",
            computed_time: computedTime,
          })
        )
      }

      // Placeholder for indicators not directly calculated by technicalindicators or not implemented yet
      // indicatorsToInsert.push(IndicatorSchema.parse({ symbol_id, ts, timeframe, name: "Supertrend", value: 0, params: "", computed_time: computedTime }));
      // indicatorsToInsert.push(IndicatorSchema.parse({ symbol_id, ts, timeframe, name: "Williams_R", value: 0, params: "", computed_time: computedTime }));
      // indicatorsToInsert.push(IndicatorSchema.parse({ symbol_id, ts, timeframe, name: "OBV", value: 0, params: "", computed_time: computedTime }));
    }

    // 3. Insert data into ClickHouse
    if (indicatorsToInsert.length > 0) {
      await clickhouse.insert({
        table: "indicators",
        values: indicatorsToInsert,
        format: "JSONEachRow",
      })
      console.log(`✅ Inserted ${indicatorsToInsert.length} indicators for ${symbol}`)
    } else {
      console.warn(`⚠️ No indicators to insert for ${symbol}.`)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error calculating and feeding indicators for ${symbol}: ${error.message}`)
    } else {
      console.error(`❌ Unknown error calculating and feeding indicators for ${symbol}:`, error)
    }
  }
}
