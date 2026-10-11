from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
from app.models.base import BaseDocument, validate_no_aadhaar
from app.models.enums import FuelType, DriveType, EquipmentStatus
from app.utils.geo import GeoPoint, compute_public_point
from app.utils.money import rupees_to_paise, paise_to_rupees

class EquipmentImage(BaseModel):
    imageId: str
    path: str
    alt: str = ""
    isCover: bool = False
    creditName: Optional[str] = None
    license: Optional[str] = None

class EquipmentSpecs(BaseModel):
    hp: Optional[int] = None
    fuel: Optional[FuelType] = FuelType.DIESEL
    driveType: Optional[DriveType] = DriveType.TWO_WD
    capacity: Optional[float] = None
    capacityUnit: Optional[str] = None
    workingWidthM: Optional[float] = None
    yearOfManufacture: Optional[int] = 2023
    extra: Dict[str, Any] = Field(default_factory=dict)

class EquipmentPricing(BaseModel):
    perHour: Optional[int] = None  # in paise
    perDay: Optional[int] = None   # in paise
    perAcre: Optional[int] = None  # in paise
    minBookingHours: int = 1
    currency: str = "INR"

class EquipmentWithDriver(BaseModel):
    available: bool = True
    extraPerDay: Optional[int] = None  # in paise

class EquipmentLocation(BaseModel):
    exact: GeoPoint
    public: GeoPoint
    stateCode: str = "PB"
    districtCode: str = "PB-LDH"
    blockCode: Optional[str] = None
    village: Optional[str] = None

class EquipmentModel(BaseDocument):
    ownerId: str = "usr_owner_01"
    categorySlug: str = "tractor"
    name: str = "50 HP Farm Tractor"
    nameI18n: Optional[Dict[str, str]] = None
    localName: Optional[str] = None
    description: str = Field(default="", max_length=1000)
    descriptionLanguage: Optional[str] = "en"
    specs: EquipmentSpecs = Field(default_factory=EquipmentSpecs)
    pricing: EquipmentPricing = Field(default_factory=EquipmentPricing)
    withDriver: EquipmentWithDriver = Field(default_factory=EquipmentWithDriver)
    operatingRadiusKm: int = 25
    deliveryAvailable: bool = True
    location: EquipmentLocation
    images: List[EquipmentImage] = []
    rcDocKey: Optional[str] = None
    status: EquipmentStatus = EquipmentStatus.ACTIVE
    isAvailable: bool = True
    ratingAvg: float = 4.8
    ratingCount: int = 0
    bookingsCompleted: int = 0
    searchKeywords: List[str] = []

    # Backward compatibility attributes & overrides
    title: Optional[str] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = 2023
    hp: Optional[int] = None
    fuel_type: Optional[str] = "Diesel"
    hourly_rate: Optional[float] = None
    daily_rate: Optional[float] = None
    security_deposit: Optional[float] = 2000.0
    with_driver: Optional[bool] = True
    city: Optional[str] = "Ludhiana"
    state: Optional[str] = "Punjab"
    pincode: Optional[str] = "141001"
    latitude: Optional[float] = 30.9010
    longitude: Optional[float] = 75.8573
    is_available: Optional[bool] = True
    average_rating: Optional[float] = 4.8
    total_reviews: Optional[int] = 0
    total_bookings: Optional[int] = 0
    owner_id: Optional[str] = None
    owner_name: Optional[str] = "Farm Equipment Owner"
    owner_phone: Optional[str] = "+919876543210"

    @field_validator("name", "localName", "description", mode="before")
    @classmethod
    def check_aadhaar(cls, v):
        return validate_no_aadhaar(v)
