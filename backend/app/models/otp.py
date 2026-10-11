from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field
from app.models.base import BaseDocument

class OtpCodeModel(BaseDocument):
    target: str  # email or phone
    purpose: str = "login"  # "register" | "login" | "reset"
    codeHash: str
    attempts: int = 0
    expiresAt: datetime
    usedAt: Optional[datetime] = None
