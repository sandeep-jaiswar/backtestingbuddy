import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import MACD

def calculate_indicators(df: pd.DataFrame) -> pd.DataFrame:
    # Ensure df["Close"] is a Series
    close_series = df["Close"]
    if isinstance(close_series, pd.DataFrame):
        close_series = close_series.squeeze()

    df["RSI"] = RSIIndicator(close=close_series).rsi()
    
    macd = MACD(close=close_series)
    df["MACD"] = macd.macd()
    df["MACD_signal"] = macd.macd_signal()
    df["MACD_diff"] = macd.macd_diff()
    
    return df
