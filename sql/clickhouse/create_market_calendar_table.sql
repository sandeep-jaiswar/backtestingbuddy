CREATE TABLE market_calendar (
    exchange String,
    date Date,
    is_trading_day UInt8,
    holiday_name String,
    updated_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (exchange, date);