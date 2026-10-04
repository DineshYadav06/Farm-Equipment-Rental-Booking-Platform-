from datetime import datetime, timezone
from typing import Optional, List
from pydantic import BaseModel, Field

class EquipmentModel(BaseModel):
    id: Optional[str] = None
    owner_id: str
    owner_name: str
    owner_phone: str
    title: str
    category: str  # Tractor, Harvester, Seed Drill, Sprayer, Irrigation Equipment, Thresher, Rotavator, Cultivator
    brand: str
    model: str
    year: int = 2023
    hp: Optional[int] = None
    fuel_type: str = "Diesel"
    description: str
    images: List[str] = []
    hourly_rate: float
    daily_rate: float
    security_deposit: float = 2000.0
    with_driver: bool = True
    city: str
    state: str
    pincode: str
    latitude: float
    longitude: float
    is_available: bool = True
    condition: str = "Excellent"
    average_rating: float = 4.8
    total_reviews: int = 0
    total_bookings: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
