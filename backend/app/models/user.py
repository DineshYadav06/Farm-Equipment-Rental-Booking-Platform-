from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
from app.models.base import BaseDocument, validate_no_aadhaar
from app.models.enums import Role, KycStatus, ConsentType, LandUnit

class UserAddress(BaseModel):
    country: str = "IN"
    stateCode: str = "PB"
    districtCode: str = "PB-LDH"
    blockCode: Optional[str] = None
    blockNameManual: Optional[str] = None
    line: str = Field(default="", max_length=250)
    village: Optional[str] = None
    pincode: str = "141001"

    @field_validator("line", "village", mode="before")
    @classmethod
    def check_aadhaar(cls, v):
        return validate_no_aadhaar(v)

class UserConsent(BaseModel):
    type: ConsentType
    version: str = "1.0"
    grantedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ip: Optional[str] = None

class UserPrefs(BaseModel):
    landUnit: LandUnit = LandUnit.ACRE
    digitStyle: str = "latin"  # "latin" | "native"
    textSize: str = "md"  # "sm" | "md" | "lg"
    simpleMode: bool = False

class UserModel(BaseDocument):
    role: Role = Role.FARMER
    name: str = Field(..., min_length=2, max_length=80)
    email: str
    emailVerified: bool = False
    phone: str
    phoneVerified: bool = False
    passwordHash: Optional[str] = None
    language: str = "hi"
    address: UserAddress = Field(default_factory=UserAddress)
    kycStatus: KycStatus = KycStatus.NOT_SUBMITTED
    kycRejectReason: Optional[str] = None
    is18Confirmed: bool = True
    consents: List[UserConsent] = []
    prefs: UserPrefs = Field(default_factory=UserPrefs)
    lastLoginAt: Optional[datetime] = None
    anonymizedAt: Optional[datetime] = None

    # Backward compatibility properties & fields
    is_active: bool = True
    avatar_url: Optional[str] = None

    @field_validator("name", mode="before")
    @classmethod
    def check_name_aadhaar(cls, v):
        return validate_no_aadhaar(v)

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, v):
        return v.strip().lower() if isinstance(v, str) else v

    @property
    def city(self) -> str:
        return self.address.districtCode or "Ludhiana"

    @property
    def state(self) -> str:
        return self.address.stateCode or "Punjab"
