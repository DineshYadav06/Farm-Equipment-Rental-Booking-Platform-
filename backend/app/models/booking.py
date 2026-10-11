from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
from app.models.base import BaseDocument, validate_no_aadhaar
from app.models.enums import BookingStatus, PaymentStatus, RateUnit
from app.utils.geo import GeoPoint

class BookingPriceSnapshot(BaseModel):
    rentalFee: int    # in paise
    driverFee: int    # in paise
    platformFee: int  # in paise
    deposit: int      # in paise
    total: int        # in paise
    currency: str = "INR"

class StatusHistoryItem(BaseModel):
    status: BookingStatus
    at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    by: str  # userId or "system"
    note: Optional[str] = None

class BookingDeliveryAddress(BaseModel):
    line: str = ""
    village: Optional[str] = None
    districtCode: str = "PB-LDH"
    stateCode: str = "PB"
    pincode: str = "141001"
    point: Optional[GeoPoint] = None

    @field_validator("line", "village", mode="before")
    @classmethod
    def check_aadhaar(cls, v):
        return validate_no_aadhaar(v)

class BookingModel(BaseDocument):
    bookingNo: Optional[str] = None  # e.g. FRH-2026-000001
    farmerId: str = "usr_farmer_01"
    ownerId: str = "usr_owner_01"
    equipmentId: str
    rentalType: RateUnit = RateUnit.DAY
    quantity: float = Field(default=1.0, gt=0)
    start: datetime
    end: datetime
    withDriver: bool = True
    deliveryAddress: BookingDeliveryAddress = Field(default_factory=BookingDeliveryAddress)
    price: BookingPriceSnapshot
    status: BookingStatus = BookingStatus.REQUESTED
    statusHistory: List[StatusHistoryItem] = []
    cancelReason: Optional[str] = None
    cancelledBy: Optional[str] = None
    expiresAt: datetime
    paymentStatus: PaymentStatus = PaymentStatus.UNPAID

    # Backward compatibility fields
    equipment_id: Optional[str] = None
    farmer_id: Optional[str] = None
    farmer_name: Optional[str] = "Farmer"
    farmer_phone: Optional[str] = "+919876543211"
    equipment_title: Optional[str] = "Equipment"
    equipment_category: Optional[str] = "Tractor"
    owner_id: Optional[str] = None
    owner_name: Optional[str] = "Owner"
    owner_phone: Optional[str] = "+919876543210"
    total_amount: Optional[float] = None
    platform_fee: Optional[float] = 99.0
    security_deposit: Optional[float] = 2000.0
    payment_status: Optional[str] = "paid"
    rental_type: Optional[str] = "daily"
    start_date: Optional[str] = None
    duration_days: Optional[int] = 1
    duration_hours: Optional[int] = 8
    delivery_type: Optional[str] = "owner_delivery"
    delivery_address: Optional[str] = "Field #14, Village Samrala"
    created_at: Optional[datetime] = None
