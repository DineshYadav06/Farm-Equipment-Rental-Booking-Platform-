from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.models.enums import GatewayPaymentStatus

class PaymentRefund(BaseModel):
    amount: int  # in paise
    reason: str
    at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    gatewayRefundId: str

class WebhookEvent(BaseModel):
    eventId: str
    type: str
    receivedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PaymentEscrow(BaseModel):
    enabled: bool = False
    releasedAt: Optional[datetime] = None

class PaymentModel(BaseDocument):
    bookingId: str
    payerId: str
    gateway: str = "razorpay"
    gatewayOrderId: str
    gatewayPaymentId: Optional[str] = None
    amount: int  # in paise
    currency: str = "INR"
    status: GatewayPaymentStatus = GatewayPaymentStatus.CREATED
    refunds: List[PaymentRefund] = []
    webhookEvents: List[WebhookEvent] = []
    escrow: PaymentEscrow = Field(default_factory=PaymentEscrow)

    # Backward compatibility
    booking_id: Optional[str] = None
    user_id: Optional[str] = None
    payment_method: Optional[str] = "upi"
    transaction_id: Optional[str] = None
