CREATE TABLE symbol_tags (
    symbol_id UUID,
    tag String
) ENGINE = MergeTree()
ORDER BY (symbol_id, tag);