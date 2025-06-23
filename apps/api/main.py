from fastapi import FastAPI
from packages.data.fetch import fetch_stock_data
from packages.indicators.calc import calculate_indicators
from packages.rules.signals import generate_signal
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))


app = FastAPI()

@app.get("/analyze")
def analyze_stock(symbol: str = "COALINDIA.NS"):
    df = fetch_stock_data(symbol)
    enriched_df = calculate_indicators(df)
    latest_signal = generate_signal(enriched_df)
    return {
        "symbol": symbol,
        "latest_close": df.iloc[-1]["Close"],
        "signal": latest_signal["signal"],
        "reason": latest_signal["reason"]
    }
