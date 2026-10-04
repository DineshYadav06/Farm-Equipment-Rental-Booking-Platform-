from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field

class ReviewModel(BaseModel):
    id: Optional[str] = None
    booking_id: str
    equipment_id: str
    farmer_id: str
    farmer_name: str
    rating: int = Field(ge=1, le=5)
    comment: str
    equipment_condition_rating: int = 5
    owner_behavior_rating: int = 5
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
