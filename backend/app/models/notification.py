from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field

class NotificationModel(BaseModel):
    id: Optional[str] = None
    user_id: str
    title: str
    message: str
    type: str = "booking"  # booking, payment, availability, reminder, system
    link: Optional[str] = None
    is_read: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class VerificationModel(BaseModel):
    id: Optional[str] = None
    user_id: str
    document_type: str = "Aadhaar"  # Aadhaar, DrivingLicense, KisanCreditCard, EquipmentRC
    document_number: str
    document_url: str
    status: str = "pending"  # pending, verified, rejected
    rejection_reason: Optional[str] = None
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    verified_at: Optional[datetime] = None

class LocationModel(BaseModel):
    latitude: float
    longitude: float
    city: str
    state: str
    district: Optional[str] = None
    pincode: Optional[str] = None
