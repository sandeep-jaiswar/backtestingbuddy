import pandas as pd

def generate_signal(df: pd.DataFrame) -> dict:
    if df.empty or len(df) < 2:
        return {"signal": "NO_SIGNAL", "reason": "Not enough data"}

    # Convert the last 2 rows to Series
    current = df.iloc[-1]
    prev = df.iloc[-2]

    # Ensure values are scalars
    rsi = current["RSI"].item() if hasattr(current["RSI"], "item") else current["RSI"]
    macd = current["MACD"].item() if hasattr(current["MACD"], "item") else current["MACD"]
    macd_signal = current["MACD_signal"].item() if hasattr(current["MACD_signal"], "item") else current["MACD_signal"]
    bb_lower = current["BB_lower"].item() if hasattr(current["BB_lower"], "item") else current["BB_lower"]
    close = current["Close"].item() if hasattr(current["Close"], "item") else current["Close"]
    ema_20 = current["EMA_20"].item() if hasattr(current["EMA_20"], "item") else current["EMA_20"]
    ema_50 = current["EMA_50"].item() if hasattr(current["EMA_50"], "item") else current["EMA_50"]
    prev_ema_20 = prev["EMA_20"].item() if hasattr(prev["EMA_20"], "item") else prev["EMA_20"]
    prev_ema_50 = prev["EMA_50"].item() if hasattr(prev["EMA_50"], "item") else prev["EMA_50"]
    adx = current["ADX"].item() if hasattr(current["ADX"], "item") else current["ADX"]

    signals = []

    # RSI Oversold
    if rsi < 30:
        signals.append("RSI oversold")

    # MACD crossover
    if macd > macd_signal and prev["MACD"] < prev["MACD_signal"]:
        signals.append("MACD bullish crossover")

    # Bollinger Band bounce
    if close < bb_lower:
        signals.append("Price below lower BB")

    # EMA crossover
    if ema_20 > ema_50 and prev_ema_20 < prev_ema_50:
        signals.append("EMA20 crossed above EMA50")

    # ADX confirmation
    strong_trend = adx > 25

    if "RSI oversold" in signals and "MACD bullish crossover" in signals and strong_trend:
        return {
            "signal": "BUY",
            "reason": f"Strong buy: {' + '.join(signals)} with ADX {adx:.2f}"
        }
    elif rsi > 70 and macd < macd_signal:
        return {
            "signal": "SELL",
            "reason": "RSI overbought and MACD bearish"
        }
    else:
        return {
            "signal": "HOLD",
            "reason": "No confluence"
        }
