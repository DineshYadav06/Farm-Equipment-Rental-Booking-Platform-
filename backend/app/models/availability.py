from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.models.enums import AvailabilityReason

class AvailabilityBlockModel(BaseDocument):
    equipmentId: str
    start: datetime
    end: datetime
    reason: AvailabilityReason = AvailabilityReason.BOOKED
    bookingId: Optional[str] = None
    note: Optional[str] = None
