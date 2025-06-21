CREATE TABLE equity_curve (
    backtest_id UUID,
    ts DateTime,
    equity_value Float64
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(ts)
ORDER BY (backtest_id, ts);