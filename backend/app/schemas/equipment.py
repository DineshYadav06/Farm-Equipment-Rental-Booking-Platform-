from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class EquipmentBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    category: str
    brand: str
    model: str
    year: int = 2023
    hp: Optional[int] = None
    fuel_type: str = "Diesel"
    description: str
    images: List[str] = []
    hourly_rate: float = Field(..., gt=0)
    daily_rate: float = Field(..., gt=0)
    security_deposit: float = 2000.0
    with_driver: bool = True
    city: str
    state: str
    pincode: str
    latitude: float
    longitude: float
    condition: str = "Excellent"

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    hourly_rate: Optional[float] = None
    daily_rate: Optional[float] = None
    is_available: Optional[bool] = None
    description: Optional[str] = None
    condition: Optional[str] = None

class EquipmentResponse(EquipmentBase):
    id: str
    owner_id: str
    owner_name: str
    owner_phone: str
    is_available: bool
    average_rating: float
    total_reviews: int
    total_bookings: int
    distance_km: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True

class NearbySearchQuery(BaseModel):
    latitude: float
    longitude: float
    radius_km: float = 25.0
    category: Optional[str] = None
    max_price: Optional[float] = None
    min_rating: Optional[float] = None
