from fastapi import APIRouter, status, Query
from typing import List, Optional
from app.schemas.booking import (
    BookingCreate,
    BookingResponse,
    BookingStatusUpdate,
    PriceCalculationRequest,
    PriceCalculationResponse
)
from app.repositories.booking_repository import booking_repo
from app.repositories.equipment_repository import equipment_repo
from app.core.exceptions import NotFoundException, BadRequestException

router = APIRouter(prefix="/bookings", tags=["Bookings"])

@router.post("/calculate-price", response_model=PriceCalculationResponse)
async def calculate_price(req: PriceCalculationRequest):
    eq = await equipment_repo.get_by_id(req.equipment_id)
    if not eq:
        raise NotFoundException("Equipment", req.equipment_id)

    if req.rental_type == "hourly":
        hours = req.duration_hours or 1
        base_rate = eq["hourly_rate"]
        rental_amount = base_rate * hours
    else:
        days = req.duration_days or 1
        base_rate = eq["daily_rate"]
        rental_amount = base_rate * days

    platform_fee = 99.0
    security_deposit = eq.get("security_deposit", 2000.0)
    total_payable = rental_amount + platform_fee + security_deposit

    return PriceCalculationResponse(
        base_rate=base_rate,
        rental_amount=rental_amount,
        platform_fee=platform_fee,
        security_deposit=security_deposit,
        total_payable=total_payable
    )

@router.get("", response_model=List[BookingResponse])
async def list_bookings(
    role: str = Query("farmer", description="farmer or owner"),
    user_id: Optional[str] = Query("usr_farmer_01")
):
    if role == "owner":
        items = await booking_repo.get_by_owner(user_id)
    else:
        items = await booking_repo.get_by_farmer(user_id)
    return [BookingResponse(**item) for item in items]

@router.get("/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: str):
    item = await booking_repo.get_by_id(booking_id)
    if not item:
        raise NotFoundException("Booking", booking_id)
    return BookingResponse(**item)

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(booking_in: BookingCreate):
    eq = await equipment_repo.get_by_id(booking_in.equipment_id)
    if not eq:
        raise NotFoundException("Equipment", booking_in.equipment_id)

    if not eq.get("is_available", True):
        raise BadRequestException("This equipment is currently not available for rental.")

    if booking_in.rental_type == "hourly":
        hours = booking_in.duration_hours or 8
        rental_amount = eq["hourly_rate"] * hours
    else:
        days = booking_in.duration_days or 1
        rental_amount = eq["daily_rate"] * days

    platform_fee = 99.0
    security_deposit = eq.get("security_deposit", 2000.0)
    total_amount = rental_amount + platform_fee + security_deposit

    data = {
        **booking_in.model_dump(),
        "farmer_id": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma",
        "farmer_phone": "+919876543211",
        "equipment_title": eq["title"],
        "equipment_category": eq["category"],
        "owner_id": eq["owner_id"],
        "owner_name": eq["owner_name"],
        "owner_phone": eq["owner_phone"],
        "total_amount": total_amount,
        "platform_fee": platform_fee,
        "security_deposit": security_deposit,
        "status": "confirmed",
        "payment_status": "paid"
    }

    new_booking = await booking_repo.create(data)
    return BookingResponse(**new_booking)

@router.patch("/{booking_id}/status", response_model=BookingResponse)
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate):
    updated = await booking_repo.update_status(booking_id, status_update.status)
    if not updated:
        raise NotFoundException("Booking", booking_id)
    return BookingResponse(**updated)
