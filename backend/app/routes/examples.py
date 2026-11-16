from typing import List
from fastapi import APIRouter
from app.models.schemas import ExampleCase
from app.data.mock_data import SAMPLE_CASES

router = APIRouter(prefix="/api", tags=["examples"])

@router.get("/examples", response_model=List[ExampleCase])
async def get_example_cases():
    """
    Returns predefined academic demonstration cases (Flooding, Earthquake, Normal Weather).
    Allows 1-click loading into the Disaster Analysis workspace.
    """
    return SAMPLE_CASES

