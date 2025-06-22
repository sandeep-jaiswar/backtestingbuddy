CREATE TABLE stock_historical_data (
    symbol String,
    date Date,
    open Float64,
    high Float64,
    low Float64,
    close Float64,
    volume Int64
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (symbol, date);