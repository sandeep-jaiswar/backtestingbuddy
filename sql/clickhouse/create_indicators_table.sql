CREATE TABLE indicators (
    symbol_id UUID,
    ts DateTime,
    timeframe LowCardinality(String),
    name String,
    value Float64,
    params String,
    computed_time DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(ts)
ORDER BY (symbol_id, timeframe, name, ts);