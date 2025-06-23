import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from packages.data.fetch import fetch_stock_data
from packages.indicators.calc import calculate_indicators
from packages.rules.signals import generate_signal

def run_analysis(symbols):
    for sym in symbols:
        df = fetch_stock_data(sym)
        df = calculate_indicators(df)
        result = generate_signal(df)
        print(f"{sym}: {result['signal']} - {result['reason']}")

if __name__ == "__main__":
    symbols = ["COALINDIA.NS", "TCS.NS", "RELIANCE.NS"]
    run_analysis(symbols)
