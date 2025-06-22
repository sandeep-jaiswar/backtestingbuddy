CREATE TABLE symbol_stats_daily (
    symbol_id UUID,
    date Date,
    timeframe String,
    avg_volume Float64,
    volatility_14d Float64,
    avg_true_range Float64,
    trend_strength Float64,
    generated_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (symbol_id, date, timeframe);