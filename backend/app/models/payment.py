from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field

class PaymentModel(BaseModel):
    id: Optional[str] = None
    booking_id: str
    farmer_id: str
    owner_id: str
    amount: float
    platform_fee: float = 99.0
    security_deposit: float = 2000.0
    currency: str = "INR"
    payment_method: str = "UPI"  # UPI, NetBanking, Card, CashOnDelivery
    payment_gateway_order_id: Optional[str] = None
    payment_gateway_payment_id: Optional[str] = None
    status: str = "completed"  # pending, completed, failed, refunded
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
