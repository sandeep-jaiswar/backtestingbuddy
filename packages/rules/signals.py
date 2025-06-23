import pandas as pd

def generate_signal(df):
    if df.empty or len(df) < 2:
        return {"signal": "NO_SIGNAL", "reason": "Not enough data"}

    rsi = df["RSI"].iloc[-1]
    macd = df["MACD"].iloc[-1]
    signal = df["MACD_signal"].iloc[-1]
    prev = df.iloc[-2]

    if rsi < 30 and macd > signal and prev["MACD"] < prev["MACD_signal"]:
        return {"signal": "BUY", "reason": "RSI < 30 and MACD crossover"}
    elif rsi > 70 and macd < signal and prev["MACD"] > prev["MACD_signal"]:
        return {"signal": "SELL", "reason": "RSI > 70 and MACD crossover"}
    else:
        return {"signal": "HOLD", "reason": "No clear signal"}


