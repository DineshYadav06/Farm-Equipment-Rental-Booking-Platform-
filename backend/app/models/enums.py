from enum import Enum

class Role(str, Enum):
    FARMER = "farmer"
    OWNER = "owner"
    ADMIN = "admin"

class KycStatus(str, Enum):
    NOT_SUBMITTED = "not_submitted"
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"

class KycDocType(str, Enum):
    VOTER_ID = "voter_id"
    DRIVING_LICENCE = "driving_licence"
    PASSPORT = "passport"
    AADHAAR_MASKED = "aadhaar_masked"
    OTHER = "other"

class KycDocStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class RateUnit(str, Enum):
    HOUR = "hour"
    DAY = "day"
    ACRE = "acre"
    QUINTAL = "quintal"
    TRIP = "trip"

class FuelType(str, Enum):
    DIESEL = "diesel"
    PETROL = "petrol"
    ELECTRIC = "electric"
    SOLAR = "solar"
    MANUAL = "manual"
    NONE = "none"

class DriveType(str, Enum):
    TWO_WD = "two_wd"
    FOUR_WD = "four_wd"
    TRACKED = "tracked"
    NOT_APPLICABLE = "not_applicable"

class EquipmentStatus(str, Enum):
    DRAFT = "draft"
    PENDING_REVIEW = "pending_review"
    ACTIVE = "active"
    PAUSED = "paused"
    REJECTED = "rejected"

class BookingStatus(str, Enum):
    REQUESTED = "requested"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"

class PaymentStatus(str, Enum):
    UNPAID = "unpaid"
    PENDING = "pending"
    PAID = "paid"
    REFUNDED = "refunded"
    PARTIALLY_REFUNDED = "partially_refunded"

class GatewayPaymentStatus(str, Enum):
    CREATED = "created"
    AUTHORIZED = "authorized"
    CAPTURED = "captured"
    FAILED = "failed"
    REFUNDED = "refunded"

class AvailabilityReason(str, Enum):
    BOOKED = "booked"
    OWNER_BLOCKED = "owner_blocked"
    MAINTENANCE = "maintenance"

class ReviewStatus(str, Enum):
    PENDING = "pending"
    PUBLISHED = "published"
    HIDDEN = "hidden"

class NotificationChannel(str, Enum):
    IN_APP = "in_app"
    SMS = "sms"
    WHATSAPP = "whatsapp"
    EMAIL = "email"

class CallbackStatus(str, Enum):
    NEW = "new"
    CALLED = "called"
    CLOSED = "closed"

class ConsentType(str, Enum):
    AGE_18 = "age_18"
    TERMS_PRIVACY = "terms_privacy"
    KYC_STORAGE = "kyc_storage"
    MARKETING_UPDATES = "marketing_updates"

class LandUnit(str, Enum):
    ACRE = "acre"
    HECTARE = "hectare"
    BIGHA = "bigha"
    KANAL = "kanal"
    GUNTHA = "guntha"
    CENT = "cent"
    KATHA = "katha"
