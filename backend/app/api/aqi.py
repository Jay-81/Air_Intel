from fastapi import APIRouter

from app.services.forecast import get_all_locations
from app.models.schemas import Location

router = APIRouter(
    prefix="/locations",
    tags=["Locations"]
)


@router.get(
    "/",
    response_model=list[Location]
)
def get_locations():

    return get_all_locations()