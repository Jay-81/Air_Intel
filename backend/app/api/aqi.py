from fastapi import APIRouter

from app.services.forecast import get_all_locations
from app.models.schemas import MapLocation

router = APIRouter(
    prefix="/locations",
    tags=["Locations"]
)


@router.get(
    "/",
    response_model=list[MapLocation]
)
def get_locations():
    return get_all_locations()