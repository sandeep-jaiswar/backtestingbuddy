CREATE TABLE stock_quotes (
    symbol String,
    timestamp DateTime,
    name String,
    currency String,
    stock_exchange String,
    quote_price Float64,
    ask Float64,
    bid Float64,
    day_low Float64,
    day_high Float64,
    year_low Float64,
    year_high Float64,
    volume Int64,
    market_cap Int64
) ENGINE = ReplacingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (symbol, timestamp);