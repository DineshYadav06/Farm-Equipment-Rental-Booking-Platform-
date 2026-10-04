from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PaymentCreate(BaseModel):
    booking_id: str
    payment_method: str = "UPI"

class PaymentResponse(BaseModel):
    id: str
    booking_id: str
    farmer_id: str
    owner_id: str
    amount: float
    platform_fee: float
    security_deposit: float
    currency: str = "INR"
    payment_method: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class RazorpayOrderResponse(BaseModel):
    order_id: str
    amount: int  # in paise
    currency: str = "INR"
    key_id: str
