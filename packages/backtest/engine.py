from clickhouse_driver import Client
import pandas as pd
import numpy as np

def run_backtest(query):
    client = Client(host="localhost")

    # ✅ Fetch required data
    sql = f"""
        SELECT *
        FROM prices
        WHERE symbol = '{query.symbol}'
        AND date BETWEEN '{query.start_date}' AND '{query.end_date}'
        ORDER BY date ASC
    """
    data = client.execute(sql, with_column_types=True)
    columns = [col[0].lower() for col in data[1]]  # Normalize column names
    df = pd.DataFrame(data[0], columns=columns)

    if df.empty:
        raise ValueError("No data found for given criteria")

    df.set_index("date", inplace=True)
    df.fillna(0, inplace=True)  # Optional: fill missing indicators

    # ✅ Evaluate user-defined strategy conditions safely
    try:
        entry_cond = query.strategy["entry"].lower()
        exit_cond = query.strategy["exit"].lower()

        df["entry_condition"] = df.eval(entry_cond)
        df["exit_condition"] = df.eval(exit_cond)
    except Exception as e:
        raise ValueError(f"Invalid strategy condition: {e}")

    # ✅ Simulate backtest
    df["position"] = 0
    in_position = False
    for i in range(len(df)):
        if not in_position and df.iloc[i]["entry_condition"]:
            df.iloc[i:, df.columns.get_loc("position")] = 1
            in_position = True
        elif in_position and df.iloc[i]["exit_condition"]:
            df.iloc[i:, df.columns.get_loc("position")] = 0
            in_position = False

    # ✅ Calculate returns
    df["daily_returns"] = df["close"].pct_change()
    df["strategy_returns"] = df["daily_returns"] * df["position"]

    total_return = np.round(df["strategy_returns"].sum(), 4)
    win_rate = np.round((df["strategy_returns"] > 0).mean(), 2)
    num_trades = int(df["position"].diff().abs().sum() / 2)

    return {
        "symbol": query.symbol,
        "total_return": total_return,
        "win_rate": win_rate,
        "num_trades": num_trades,
    }
