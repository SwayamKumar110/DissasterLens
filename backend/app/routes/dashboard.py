from fastapi import APIRouter
from app.models.schemas import DashboardData
from app.data.mock_data import DASHBOARD_DATA

router = APIRouter(prefix="/api", tags=["dashboard"])

@router.get("/dashboard", response_model=DashboardData)
async def get_dashboard_data():
    """
    Returns high-level KPI metrics, recent disaster events, category distributions,
    and analysis activity history for the Overview Dashboard.
    """
    return DASHBOARD_DATA

