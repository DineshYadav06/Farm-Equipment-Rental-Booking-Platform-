from fastapi import APIRouter, status
from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
    RazorpayOrderResponse
)
from app.repositories.payment_repository import payment_repo
from app.repositories.booking_repository import booking_repo
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.post("/create-order", response_model=RazorpayOrderResponse)
async def create_payment_order(booking_id: str):
    booking = await booking_repo.get_by_id(booking_id)
    if not booking:
        raise NotFoundException("Booking", booking_id)

    amount_in_paise = int(booking["total_amount"] * 100)
    return RazorpayOrderResponse(
        order_id=f"order_rzp_{booking_id}",
        amount=amount_in_paise,
        currency="INR",
        key_id="rzp_test_farmrenthub"
    )

@router.post("/process", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def process_payment(payment_in: PaymentCreate):
    booking = await booking_repo.get_by_id(payment_in.booking_id)
    if not booking:
        raise NotFoundException("Booking", payment_in.booking_id)

    payment_record = {
        "booking_id": booking["id"],
        "farmer_id": booking["farmer_id"],
        "owner_id": booking["owner_id"],
        "amount": booking["total_amount"],
        "platform_fee": booking["platform_fee"],
        "security_deposit": booking["security_deposit"],
        "currency": "INR",
        "payment_method": payment_in.payment_method,
        "status": "completed"
    }

    created = await payment_repo.create(payment_record)
    await booking_repo.update_status(booking["id"], "confirmed")
    return PaymentResponse(**created)
