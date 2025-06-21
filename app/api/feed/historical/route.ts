import { NextResponse } from "next/server";
import { clickhouse } from "@/lib/db"; // Assuming @/lib/db exports your configured clickhouse client
import { yahoo } from "@/lib/yahoo"; // Assuming @/lib/yahoo exports your configured yahoo-finance2 instance
import { StockHistoricalDataSchema, StockHistoricalData } from "@/schema/stock_historical_data";

const SYMBOLS_TO_FEED = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "BAJFINANCE.BO"]; // Example symbols

export async function GET() {
  const failed: { symbol: string; error: string }[] = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1); // Fetch last year of data as an example
  const endDate = new Date();

  for (const symbol of SYMBOLS_TO_FEED) {
    try {
      const history = await yahoo.historical(symbol, {
        period1: startDate.toISOString().split('T')[0], // YYYY-MM-DD format
        period2: endDate.toISOString().split('T')[0],
        // interval: '1d' is default for historical
      });

      if (!history || history.length === 0) {
        console.warn(`No historical data fetched for ${symbol}`);
        continue;
      }

      const rowsToInsert: StockHistoricalData[] = [];

      for (const dayData of history) {
        try {
            // Validate each historical data entry
            const validatedDayData = StockHistoricalDataSchema.parse({
                symbol: symbol, // Add symbol to the schema validation
                date: dayData.date, // Date object from yahoo-finance2
                open: dayData.open,
                high: dayData.high,
                low: dayData.low,
                close: dayData.close,
                volume: dayData.volume,
            });
             rowsToInsert.push(validatedDayData);
        } catch (validationError: any) {
             console.error(`Validation failed for historical data of ${symbol} on ${dayData.date}:`, validationError);
             // Decide if you want to skip this row or the whole symbol
             // For now, we'll just log and skip the row
        }
      }

      if (rowsToInsert.length > 0) {
         await clickhouse.insert({
            table: 'stock_historical_data',
            values: rowsToInsert,
            format: 'JSONEachRow',
          });
         console.log(`Successfully inserted ${rowsToInsert.length} historical data points for ${symbol}`);
      } else {
         console.warn(`No valid historical data rows to insert for ${symbol}`);
      }


    } catch (error: any) {
      console.error(`Failed to feed historical data for ${symbol}:`, error);
      failed.push({ symbol, error: error.message });
    }
  }

  if (failed.length > 0) {
    return NextResponse.json({ message: 'Failed to feed historical data for some symbols', failed }, { status: 500 });
  } else {
    return NextResponse.json({ message: 'Successfully initiated historical data feed for all symbols' });
  }
}
