CREATE TABLE symbols (
    symbol_id UUID,
    symbol_code String,
    exchange String,
    full_name String,
    sector String,
    industry String,
    isin String,
    lot_size Int64,
    tick_size Float64,
    currency String,
    active UInt8,
    created_at DateTime
) ENGINE = MergeTree()
ORDER BY symbol_code;