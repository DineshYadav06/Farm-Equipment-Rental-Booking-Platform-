from fastapi import APIRouter, status, Query
from typing import List, Optional
from app.schemas.review import ReviewCreate, ReviewResponse
from app.repositories.review_repository import review_repo
from app.repositories.equipment_repository import equipment_repo
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.get("", response_model=List[ReviewResponse])
async def list_reviews(equipment_id: Optional[str] = Query(None)):
    if equipment_id:
        items = await review_repo.get_by_equipment(equipment_id)
    else:
        items = await review_repo.get_all()
    return [ReviewResponse(**item) for item in items]

@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def create_review(review_in: ReviewCreate):
    eq = await equipment_repo.get_by_id(review_in.equipment_id)
    if not eq:
        raise NotFoundException("Equipment", review_in.equipment_id)

    data = {
        **review_in.model_dump(),
        "farmer_id": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma"
    }

    created = await review_repo.create(data)
    return ReviewResponse(**created)
