import pandas as pd
from ta.momentum import RSIIndicator, StochasticOscillator
from ta.trend import MACD, EMAIndicator, ADXIndicator
from ta.volatility import BollingerBands
from ta.volume import VolumeWeightedAveragePrice

def calculate_indicators(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    close = df["Close"].squeeze()
    high = df["High"].squeeze()
    low = df["Low"].squeeze()
    volume = df["Volume"].squeeze()

    df["RSI"] = RSIIndicator(close=close).rsi()

    stoch = StochasticOscillator(close=close, high=high, low=low)
    df["Stoch_RSI"] = stoch.stoch()

    macd = MACD(close=close)
    df["MACD"] = macd.macd()
    df["MACD_signal"] = macd.macd_signal()

    bb = BollingerBands(close=close)
    df["BB_upper"] = bb.bollinger_hband()
    df["BB_lower"] = bb.bollinger_lband()
    df["BB_width"] = df["BB_upper"] - df["BB_lower"]

    df["EMA_20"] = EMAIndicator(close=close, window=20).ema_indicator()
    df["EMA_50"] = EMAIndicator(close=close, window=50).ema_indicator()

    adx = ADXIndicator(high=high, low=low, close=close)
    df["ADX"] = adx.adx()

    vwap = VolumeWeightedAveragePrice(high=high, low=low, close=close, volume=volume)
    df["VWAP"] = vwap.volume_weighted_average_price()

    return df
