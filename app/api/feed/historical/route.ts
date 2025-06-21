import { NextResponse } from "next/server";
import { clickhouse } from "@/lib/db";
import { yahoo } from "@/lib/yahoo";
import { StockHistoricalDataSchema, StockHistoricalData } from "@/schema/stock_historical_data";
import { ZodError } from "zod";

const SYMBOLS_TO_FEED = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "BAJFINANCE.BO"];

export async function GET() {
  const failed: { symbol: string; error: string }[] = [];
  const successful: string[] = [];

  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1); // Fetch last year of data as an example
  const endDate = new Date();

  for (const symbol of SYMBOLS_TO_FEED) {
    let symbolFailed = false; // Flag to mark if processing failed for this symbol
    try {
      // 1. Fetch historical data from Yahoo Finance
      const history = await yahoo.historical(symbol, {
        period1: startDate.toISOString().split('T')[0],
        period2: endDate.toISOString().split('T')[0],
      });

      if (!history || history.length === 0) {
        console.warn(`No historical data fetched for ${symbol} for the specified date range.`);
        // Not necessarily a failure, but we can log it
        continue;
      }

      const rowsToInsert: StockHistoricalData[] = [];

      // 2. Validate each historical data entry using Zod schema
      for (const dayData of history) {
        try {
            const validatedDayData = StockHistoricalDataSchema.parse({
                symbol: symbol, // Add symbol to the schema validation
                date: dayData.date,
                open: dayData.open,
                high: dayData.high,
                low: dayData.low,
                close: dayData.close,
                volume: dayData.volume,
            });
            rowsToInsert.push(validatedDayData);
        } catch (validationError) {
            if (validationError instanceof ZodError) {
                console.error(`Validation failed for historical data of ${symbol} on ${dayData.date}: ${validationError.errors.map(e => e.message).join(', ')}`);
                // Decide if you want to skip this row or the whole symbol
                // For now, we'll just log and skip the row
            } else {
                console.error(`Data validation error for historical data of ${symbol} on ${dayData.date}: ${validationError}`);
                // Log other unexpected validation errors for a specific row
            }
             symbolFailed = true; // Mark symbol as failed if any row fails validation
        }
      }

      // 3. Insert data into ClickHouse
      if (rowsToInsert.length > 0) {
         try {
             await clickhouse.insert({
                table: 'stock_historical_data',
                values: rowsToInsert,
                format: 'JSONEachRow',
              });
             console.log(`Successfully inserted ${rowsToInsert.length} historical data points for ${symbol}`);
             if (!symbolFailed) { // Only add to successful if no validation errors occurred for any row
                 successful.push(symbol);
             }
         } catch (dbError: any) {
             console.error(`ClickHouse insertion failed for ${symbol}:`, dbError);
             failed.push({ symbol, error: `ClickHouse insertion failed: ${dbError.message}` });
             symbolFailed = true; // Mark symbol as failed due to DB error
         }
      } else {
         console.warn(`No valid historical data rows to insert for ${symbol} after validation.`);
         if (!symbolFailed) { // If no rows and no validation errors, maybe just skip, not mark as failed
           // successful.push(symbol); // Depending on if 'no data' counts as success
         }
      }

    } catch (error: any) {
      // Catch any other unexpected errors during the process for this symbol (e.g., fetching error)
      console.error(`An unexpected error occurred for ${symbol}:`, error);
      failed.push({ symbol, error: `Unexpected error during fetch or processing: ${error.message}` });
      symbolFailed = true; // Mark symbol as failed due to unexpected error
    }

    // Ensure symbol is added to failed if symbolFailed flag is true
    if (symbolFailed && !failed.some(f => f.symbol === symbol)) {
        // This case might happen if a validation error occurred but wasn't explicitly pushed to failed
        // We ensure it's added here for completeness.
         failed.push({ symbol, error: 'Processing failed due to validation or other errors for some rows.' });
    }
  }

  // 4. Return response based on results
  if (failed.length > 0) {
    return NextResponse.json(
      { message: 'Historical data feed completed with some failures', successful, failed },
      { status: 500 }
    );
  } else if (successful.length > 0) {
    return NextResponse.json({ message: 'Successfully fed historical data for all symbols', successful });
  } else {
     // Case where no symbols were processed, or no data was available/valid for any
     return NextResponse.json({ message: 'Historical data feed completed, but no data was successfully inserted.', successful, failed });
  }
}
