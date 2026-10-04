from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    booking_id: str
    equipment_id: str
    rating: int = Field(ge=1, le=5)
    comment: str = Field(..., min_length=5, max_length=500)
    equipment_condition_rating: int = Field(default=5, ge=1, le=5)
    owner_behavior_rating: int = Field(default=5, ge=1, le=5)

class ReviewResponse(BaseModel):
    id: str
    booking_id: str
    equipment_id: str
    farmer_id: str
    farmer_name: str
    rating: int
    comment: str
    equipment_condition_rating: int
    owner_behavior_rating: int
    created_at: datetime

    class Config:
        from_attributes = True

class RecommendationResponse(BaseModel):
    equipment_id: str
    title: str
    category: str
    brand: str
    model: str
    daily_rate: float
    hourly_rate: float
    average_rating: float
    distance_km: float
    image_url: str
    match_score: int
    recommended_reason: str
    best_for_crop: str
