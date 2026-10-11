from typing import Optional, Dict, Any, List
from datetime import datetime, timezone
from pydantic import BaseModel, Field, field_validator
from app.models.base import BaseDocument, validate_no_aadhaar
from app.models.enums import CallbackStatus
from app.core.database import get_collection, CALLBACK_REQUESTS_COLLECTION, is_mongo_connected
from app.utils.helpers import generate_id

class CallbackRequestModel(BaseDocument):
    name: str = Field(..., min_length=2, max_length=80)
    phone: str
    equipmentType: Optional[str] = None
    districtCode: Optional[str] = None
    preferredDate: Optional[str] = None
    message: str = Field(default="", max_length=500)
    consentGiven: bool = True
    language: str = "hi"
    status: CallbackStatus = CallbackStatus.NEW
    assignedTo: Optional[str] = None
    source: str = "web"

    @field_validator("name", "message", mode="before")
    @classmethod
    def check_aadhaar(cls, v):
        return validate_no_aadhaar(v)

class CallbackRepository:
    def __init__(self):
        self.memory_store: Dict[str, Dict[str, Any]] = {}

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("cb")
        now = datetime.now(timezone.utc)
        doc = {
            **data,
            "id": new_id,
            "_id": new_id,
            "status": "new",
            "createdAt": now,
            "updatedAt": now,
            "deletedAt": None
        }
        col = get_collection(CALLBACK_REQUESTS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.insert_one(doc)
            except Exception:
                pass
        self.memory_store[new_id] = doc
        return doc

callback_repo = CallbackRepository()
