from fastapi import APIRouter
from app.models.schemas import ResearchInsights
from app.data.mock_data import RESEARCH_INSIGHTS

router = APIRouter(prefix="/api", tags=["research"])

@router.get("/research-results", response_model=ResearchInsights)
async def get_research_results():
    """
    Returns exact research paper experimental findings, accuracy comparisons,
    Macro/Micro F1 scores, computational benchmarks, and key empirical takeaways.
    """
    return RESEARCH_INSIGHTS

