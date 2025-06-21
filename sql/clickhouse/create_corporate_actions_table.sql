CREATE TABLE corporate_actions (
    symbol_id UUID,
    action_type Enum8('split' = 1, 'bonus' = 2, 'dividend' = 3),
    ex_date Date,
    record_date Date,
    ratio String,
    amount Float64,
    announced_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(ex_date)
ORDER BY (symbol_id, ex_date, action_type);