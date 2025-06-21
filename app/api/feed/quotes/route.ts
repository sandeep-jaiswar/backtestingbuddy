import { NextResponse } from "next/server";
import { clickhouse } from "@/lib/db";
import { yahoo } from "@/lib/yahoo";
import { StockQuoteSchema, StockQuote } from "@/schema/stock_quotes";
import { ZodError } from "zod";

const SYMBOLS_TO_FEED = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "BAJFINANCE.BO"];

export async function GET() {
  const failed: { symbol: string; error: string }[] = [];
  const successful: string[] = [];

  for (const symbol of SYMBOLS_TO_FEED) {
    try {
      // 1. Fetch data from Yahoo Finance
      const quote = await yahoo.quote(symbol);

      // Basic check if data was returned
      if (!quote || !quote.symbol) {
        failed.push({ symbol, error: "Could not fetch quote or quote data is incomplete." });
        continue;
      }

      const now = new Date();

      // 2. Validate data using Zod schema
      let validatedQuote: StockQuote;
      try {
          validatedQuote = StockQuoteSchema.parse({
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
      } catch (validationError) {
          if (validationError instanceof ZodError) {
              failed.push({ symbol, error: `Validation failed: ${validationError.errors.map(e => e.message).join(', ')}` });
          } else {
              failed.push({ symbol, error: `Data validation error: ${validationError}` });
          }
          continue; // Skip insertion for this symbol if validation fails
      }

      // 3. Prepare data for ClickHouse insert
      const row: StockQuote = validatedQuote; // validatedQuote already matches the structure

      // 4. Insert data into ClickHouse
      try {
        await clickhouse.insert({
          table: 'stock_quotes',
          values: [row],
          format: 'JSONEachRow',
        });
        successful.push(symbol);
      } catch (dbError: any) {
         failed.push({ symbol, error: `ClickHouse insertion failed: ${dbError.message}` });
      }

    } catch (error: any) {
      // Catch any other unexpected errors during the process for this symbol
      console.error(`An unexpected error occurred for ${symbol}:`, error);
      failed.push({ symbol, error: `Unexpected error: ${error.message}` });
    }
  }

  // 5. Return response based on results
  if (failed.length > 0) {
    return NextResponse.json(
      { message: 'Data feed completed with some failures', successful, failed },
      { status: 500 }
    );
  } else {
    return NextResponse.json({ message: 'Successfully fed data for all symbols', successful });
  }
}
