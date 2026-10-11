import re
from datetime import datetime, timezone
from typing import Optional, Any
from pydantic import BaseModel, Field, field_validator
from fastapi import HTTPException

AADHAAR_REGEX = re.compile(r"\b\d{4}\s?\d{4}\s?\d{4}\b")

def validate_no_aadhaar(text: Optional[str]) -> Optional[str]:
    if text and isinstance(text, str) and AADHAAR_REGEX.search(text):
        raise HTTPException(
            status_code=422,
            detail="Personal data security violation: Full 12-digit Aadhaar numbers must not be submitted. Please provide only masked copy or last 4 digits."
        )
    return text

class BaseDocument(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    isSample: bool = False
    deletedAt: Optional[datetime] = None
    version: int = 1

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
