from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field

class BookingModel(BaseModel):
    id: Optional[str] = None
    farmer_id: str
    farmer_name: str
    farmer_phone: str
    equipment_id: str
    equipment_title: str
    equipment_category: str
    owner_id: str
    owner_name: str
    owner_phone: str
    rental_type: str = "daily"  # "hourly" or "daily"
    start_date: datetime
    end_date: datetime
    duration_hours: Optional[int] = 8
    duration_days: Optional[int] = 1
    total_amount: float
    platform_fee: float = 99.0
    security_deposit: float = 2000.0
    status: str = "confirmed"  # pending, confirmed, active, completed, cancelled
    delivery_type: str = "owner_delivery"  # self_pickup, owner_delivery
    delivery_address: str = ""
    payment_status: str = "paid"  # pending, paid, refunded
    payment_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
