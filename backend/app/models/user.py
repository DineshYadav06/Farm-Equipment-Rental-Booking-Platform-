from datetime import datetime, timezone
from typing import Optional, List
from pydantic import BaseModel, Field

class UserModel(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    phone: str
    hashed_password: str
    role: str = "farmer"  # "farmer", "owner", "admin"
    city: Optional[str] = "Ludhiana"
    state: Optional[str] = "Punjab"
    latitude: Optional[float] = 30.9010
    longitude: Optional[float] = 75.8573
    address: Optional[str] = ""
    is_active: bool = True
    is_phone_verified: bool = False
    verification_status: str = "pending"  # "pending", "verified", "rejected"
    avatar_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
