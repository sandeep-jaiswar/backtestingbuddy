from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from packages.backtest.engine import run_backtest

router = APIRouter()

class StrategyQuery(BaseModel):
    symbol: str
    start_date: str
    end_date: str
    strategy: dict  # entry & exit strings

@router.post("/backtest")
async def backtest(query: StrategyQuery):
    try:
        result = run_backtest(query)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
