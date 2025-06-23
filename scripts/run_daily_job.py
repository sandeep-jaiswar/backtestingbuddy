import sys
import os
import traceback
import pandas as pd
from datetime import datetime
from clickhouse_connect import get_client

# Add root directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from packages.data.fetch import fetch_stock_data
from packages.indicators.calc import calculate_indicators
from packages.rules.signals import generate_signal

# Connect to ClickHouse
client = get_client(host='localhost', port=8123, username='default', password='')

# Create stock_prices table
client.command("""
CREATE TABLE IF NOT EXISTS prices (
    symbol String,
    date Date,
    open Float32,
    high Float32,
    low Float32,
    close Float32,
    volume UInt64,
    rsi Float32,
    macd Float32,
    macd_signal Float32,
    bb_upper Float32,
    bb_lower Float32,
    ema_20 Float32,
    ema_50 Float32,
    adx Float32
) ENGINE = ReplacingMergeTree()
ORDER BY (symbol, date)
""")

# Create signals table
client.command("""
CREATE TABLE IF NOT EXISTS signals (
    symbol String,
    date Date,
    signal String,
    reason String
) ENGINE = ReplacingMergeTree()
ORDER BY (symbol, date)
""")


def run_analysis(symbols):
    for sym in symbols:
        try:
            df = fetch_stock_data(sym)
            if df is None or df.empty or len(df) < 2:
                print(f"{sym}: Skipping (no data)")
                continue

            df = calculate_indicators(df)
            result = generate_signal(df)

            # Insert stock data
            rows = []
            for i, row in df.iterrows():
                rows.append([
                    sym,
                    pd.to_datetime(i).date(),
                    row['Open'], row['High'], row['Low'], row['Close'], row['Volume'],
                    row.get('RSI'),
                    row.get('MACD'),
                    row.get('MACD_signal'),
                    row.get('BB_upper'),
                    row.get('BB_lower'),
                    row.get('EMA_20'),
                    row.get('EMA_50'),
                    row.get('ADX')
                ])
            client.insert('prices', rows, column_names=[
                'symbol', 'date', 'open', 'high', 'low', 'close', 'volume',
                'rsi', 'macd', 'macd_signal', 'bb_upper', 'bb_lower',
                'ema_20', 'ema_50', 'adx'
            ])

            # Insert signal
            latest_date = pd.to_datetime(df.index[-1]).date()
            client.insert('signals', [[sym, latest_date, result['signal'], result['reason']]],
                          column_names=['symbol', 'date', 'signal', 'reason'])

            print(f"{sym}: {result['signal']} - {result['reason']}")

        except Exception:
            print(f"❌ {sym}: Error\n{traceback.format_exc()}")


if __name__ == "__main__":
    symbols = ["COALINDIA.NS", "TCS.NS", "RELIANCE.NS"]
    run_analysis(symbols)
