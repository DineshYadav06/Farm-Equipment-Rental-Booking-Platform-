from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    address: Optional[str] = None
    avatar_url: Optional[str] = None

class OwnerStatsResponse(BaseModel):
    total_equipment: int
    active_bookings: int
    pending_requests: int
    monthly_earnings: float
    total_earnings: float
    average_rating: float
    total_reviews: int

class FarmerStatsResponse(BaseModel):
    active_bookings: int
    completed_bookings: int
    total_spent: float
    pending_reviews: int
