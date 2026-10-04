from fastapi import APIRouter
from app.schemas.user import OwnerStatsResponse, FarmerStatsResponse, UserProfileUpdate
from app.schemas.auth import UserResponse
from app.repositories.user_repository import user_repo
from app.repositories.booking_repository import booking_repo
from app.repositories.equipment_repository import equipment_repo
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile():
    user = await user_repo.get_by_id("usr_farmer_01")
    if not user:
        raise NotFoundException("User", "usr_farmer_01")
    return UserResponse(**user)

@router.get("/farmer/stats", response_model=FarmerStatsResponse)
async def get_farmer_stats():
    bookings = await booking_repo.get_by_farmer("usr_farmer_01")
    active = [b for b in bookings if b["status"] in ["confirmed", "pending", "active"]]
    completed = [b for b in bookings if b["status"] == "completed"]
    total_spent = sum(b.get("total_amount", 0) for b in bookings)
    return FarmerStatsResponse(
        active_bookings=len(active),
        completed_bookings=len(completed),
        total_spent=total_spent,
        pending_reviews=1
    )

@router.get("/owner/stats", response_model=OwnerStatsResponse)
async def get_owner_stats():
    owner_bookings = await booking_repo.get_by_owner("usr_owner_01")
    all_eq = await equipment_repo.get_all()
    owner_eq = [e for e in all_eq if e["owner_id"] == "usr_owner_01"]
    active = [b for b in owner_bookings if b["status"] in ["confirmed", "active"]]
    pending = [b for b in owner_bookings if b["status"] == "pending"]
    monthly_earnings = sum(b.get("total_amount", 0) for b in owner_bookings)

    return OwnerStatsResponse(
        total_equipment=len(owner_eq),
        active_bookings=len(active),
        pending_requests=len(pending),
        monthly_earnings=monthly_earnings,
        total_earnings=monthly_earnings * 3.5,
        average_rating=4.9,
        total_reviews=38
    )
