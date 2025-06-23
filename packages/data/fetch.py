import yfinance as yf
import pandas as pd

def fetch_stock_data(symbol: str) -> pd.DataFrame:
    df = yf.download(symbol, period="5y", interval="1d", progress=False)
    df = df.dropna()
    return df
