from datetime import datetime, timezone
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.models.base import BaseDocument, validate_no_aadhaar
from app.models.enums import ReviewStatus

class OwnerReply(BaseModel):
    text: str
    at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReviewModel(BaseDocument):
    bookingId: str
    equipmentId: str
    ownerId: str
    farmerId: str
    rating: int = Field(..., ge=1, le=5)
    text: str = Field(..., max_length=1000)
    textLanguage: Optional[str] = "en"
    photos: List[str] = []
    status: ReviewStatus = ReviewStatus.PUBLISHED
    consentToDisplay: bool = True
    displayName: Optional[str] = None
    districtCode: Optional[str] = None
    ownerReply: Optional[OwnerReply] = None

    # Backward compatibility
    farmer_name: Optional[str] = None
    farmer_location: Optional[str] = None
    comment: Optional[str] = None

    @field_validator("text", "displayName", mode="before")
    @classmethod
    def check_aadhaar(cls, v):
        return validate_no_aadhaar(v)
