CREATE TABLE backtest_results (
    backtest_id UUID,
    strategy_name String,
    symbol_id UUID,
    timeframe String,
    start_date Date,
    end_date Date,
    total_return Float64,
    annual_return Float64,
    sharpe_ratio Float64,
    max_drawdown Float64,
    total_trades Int64,
    executed_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(executed_at)
ORDER BY (strategy_name, symbol_id, executed_at);