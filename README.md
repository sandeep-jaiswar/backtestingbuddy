# BacktestBuddy 🧠📈

A technical analysis system that fetches stock data, calculates indicators, and gives buy/sell signals.

## Features

- RSI + MACD-based signal strategy
- FastAPI REST API (`/analyze?symbol=COALINDIA.NS`)
- CLI script to analyze multiple stocks

## Run Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run API
uvicorn apps.api.main:app --reload

# Run CLI job
python scripts/run_daily_job.py
```
