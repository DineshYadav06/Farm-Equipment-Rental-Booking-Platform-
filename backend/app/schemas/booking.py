from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BookingCreate(BaseModel):
    equipment_id: str
    rental_type: str = "daily"  # "hourly" or "daily"
    start_date: datetime
    end_date: datetime
    duration_hours: Optional[int] = 8
    duration_days: Optional[int] = 1
    delivery_type: str = "owner_delivery"
    delivery_address: str = ""

class BookingStatusUpdate(BaseModel):
    status: str  # confirmed, active, completed, cancelled

class BookingResponse(BaseModel):
    id: str
    farmer_id: str
    farmer_name: str
    farmer_phone: str
    equipment_id: str
    equipment_title: str
    equipment_category: str
    owner_id: str
    owner_name: str
    owner_phone: str
    rental_type: str
    start_date: datetime
    end_date: datetime
    duration_hours: Optional[int]
    duration_days: Optional[int]
    total_amount: float
    platform_fee: float
    security_deposit: float
    status: str
    delivery_type: str
    delivery_address: str
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True

class PriceCalculationRequest(BaseModel):
    equipment_id: str
    rental_type: str
    duration_hours: Optional[int] = 8
    duration_days: Optional[int] = 1

class PriceCalculationResponse(BaseModel):
    base_rate: float
    rental_amount: float
    platform_fee: float
    security_deposit: float
    total_payable: float
