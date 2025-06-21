import { NextResponse } from "next/server"
import { clickhouse } from "@/lib/db"
import { yahoo } from "@/lib/yahoo"
import { StockQuoteSchema, StockQuote } from "@/schema/stock_quotes"

const SYMBOLS_TO_FEED = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "BAJFINANCE.BO"]

export async function GET() {
  const insertedCount = 0;
  const failed: { symbol: string; error: string }[] = []

  for (const symbol of SYMBOLS_TO_FEED) {
    try {
      const quote = await yahoo.quote(symbol);

      // Ensure quote and necessary fields exist
      if (!quote || !quote.symbol) {
        failed.push({ symbol, error: "Could not fetch quote or quote symbol is missing" });
        continue;
      }

      const now = new Date();

      const validatedQuote = StockQuoteSchema.parse({
        symbol: quote.symbol,
        timestamp: now, // Use current time as timestamp
        name: quote.shortName ?? "",
        currency: quote.currency ?? "",
        stock_exchange: quote.fullExchangeName ?? "",
        quote_price: Number(quote.regularMarketPrice ?? 0),
        ask: Number(quote.ask ?? 0),
        bid: Number(quote.bid ?? 0),
        day_low: Number(quote.regularMarketDayLow ?? 0),
        day_high: Number(quote.regularMarketDayHigh ?? 0),
        year_low: Number(quote.fiftyTwoWeekLow ?? 0),
        year_high: Number(quote.fiftyTwoWeekHigh ?? 0),
        volume: Number(quote.regularMarketVolume ?? 0),
        market_cap: Number(quote.marketCap ?? 0),
      });

      // Prepare data for ClickHouse insert
      const row: StockQuote = {
        symbol: validatedQuote.symbol,
        timestamp: validatedQuote.timestamp,
        name: validatedQuote.name,
        currency: validatedQuote.currency,
        stock_exchange: validatedQuote.stock_exchange,
        quote_price: validatedQuote.quote_price,
        ask: validatedQuote.ask,
        bid: validatedQuote.bid,
        day_low: validatedQuote.day_low,
        day_high: validatedQuote.day_high,
        year_low: validatedQuote.year_low,
        year_high: validatedQuote.year_high,
        volume: validatedQuote.volume,
        market_cap: validatedQuote.market_cap,
      };

      await clickhouse.insert({
        table: 'stock_quotes',
        values: [row],
        format: 'JSONEachRow',
      });

      // We don't track inserted count directly in this loop easily without a counter variable,
      // but the primary goal is to process each symbol.
      // For simplicity, we'll just report failures.

    } catch (error: any) {
      console.error(`Failed to feed quote for ${symbol}:`, error);
      failed.push({ symbol, error: error.message });
    }
  }

  if (failed.length > 0) {
    return NextResponse.json({ message: 'Failed to feed data for some symbols', failed }, { status: 500 });
  } else {
    return NextResponse.json({ message: 'Successfully initiated quote feed for all symbols' });
  }
}
