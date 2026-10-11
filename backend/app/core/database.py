import motor.motor_asyncio
import certifi
import logging
from typing import Optional
from pymongo import ASCENDING, DESCENDING, TEXT, GEOSPHERE
from app.core.config import settings

logger = logging.getLogger(__name__)

client: Optional[motor.motor_asyncio.AsyncIOMotorClient] = None
db: Optional[motor.motor_asyncio.AsyncIOMotorDatabase] = None
is_mongo_connected: bool = False

async def connect_db():
    global client, db, is_mongo_connected
    try:
        # Connect with certifi CA bundle for resilient TLS handling on Atlas
        client = motor.motor_asyncio.AsyncIOMotorClient(
            settings.MONGODB_URL,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=4000
        )
        db = client[settings.DATABASE_NAME]
        # Ping check
        await client.admin.command("ping")
        is_mongo_connected = True
        logger.info(f"✅ Successfully connected to MongoDB Atlas / Database: {settings.DATABASE_NAME}")
        # Automatically ensure all collections and indexes are set up
        await ensure_indexes()
    except Exception as e:
        is_mongo_connected = False
        logger.warning(
            f"⚠️ MongoDB connection notice: {e}. "
            "Running in resilient in-memory fallback mode until Atlas IP access is active."
        )

async def close_db():
    global client, is_mongo_connected
    if client:
        client.close()
        is_mongo_connected = False
        logger.info("MongoDB connection closed.")

def get_db() -> Optional[motor.motor_asyncio.AsyncIOMotorDatabase]:
    return db

def get_collection(name: str):
    if db is not None:
        return db[name]
    return None

# Collection Names
USERS_COLLECTION = "users"
KYC_DOCS_COLLECTION = "kyc_documents"
CATEGORIES_COLLECTION = "categories"
EQUIPMENT_COLLECTION = "equipment"
AVAILABILITY_BLOCKS_COLLECTION = "availability_blocks"
BOOKINGS_COLLECTION = "bookings"
PAYMENTS_COLLECTION = "payments"
REVIEWS_COLLECTION = "reviews"
NOTIFICATIONS_COLLECTION = "notifications"
CALLBACK_REQUESTS_COLLECTION = "callback_requests"
GEO_STATES_COLLECTION = "geo_states"
GEO_DISTRICTS_COLLECTION = "geo_districts"
GEO_BLOCKS_COLLECTION = "geo_blocks"
OTP_CODES_COLLECTION = "otp_codes"
AUDIT_LOGS_COLLECTION = "audit_logs"
COUNTERS_COLLECTION = "counters"
CONTENT_REGISTRY_COLLECTION = "content_registry"
SITE_FLAGS_COLLECTION = "site_flags"

async def ensure_indexes():
    """
    Idempotent index creation across all collections.
    """
    if db is None:
        return

    try:
        # 1. users
        await db[USERS_COLLECTION].create_index("email", unique=True, sparse=True)
        await db[USERS_COLLECTION].create_index("phone", unique=True, sparse=True)
        await db[USERS_COLLECTION].create_index("role")
        await db[USERS_COLLECTION].create_index([("address.stateCode", ASCENDING), ("address.districtCode", ASCENDING)])

        # 2. kyc_documents
        await db[KYC_DOCS_COLLECTION].create_index("userId")
        await db[KYC_DOCS_COLLECTION].create_index("status")

        # 3. categories
        await db[CATEGORIES_COLLECTION].create_index("slug", unique=True)
        await db[CATEGORIES_COLLECTION].create_index([("parentSlug", ASCENDING), ("order", ASCENDING)])

        # 4. equipment
        await db[EQUIPMENT_COLLECTION].create_index([("location.public", GEOSPHERE)])
        await db[EQUIPMENT_COLLECTION].create_index([("categorySlug", ASCENDING), ("status", ASCENDING)])
        await db[EQUIPMENT_COLLECTION].create_index([
            ("location.stateCode", ASCENDING),
            ("location.districtCode", ASCENDING),
            ("status", ASCENDING)
        ])
        await db[EQUIPMENT_COLLECTION].create_index("ownerId")
        await db[EQUIPMENT_COLLECTION].create_index([("status", ASCENDING), ("isAvailable", ASCENDING)])
        try:
            await db[EQUIPMENT_COLLECTION].create_index([
                ("name", TEXT),
                ("localName", TEXT),
                ("searchKeywords", TEXT)
            ])
        except Exception:
            pass  # Text index might already exist

        # 5. availability_blocks
        await db[AVAILABILITY_BLOCKS_COLLECTION].create_index([
            ("equipmentId", ASCENDING),
            ("start", ASCENDING),
            ("end", ASCENDING)
        ])

        # 6. bookings
        await db[BOOKINGS_COLLECTION].create_index("bookingNo", unique=True, sparse=True)
        await db[BOOKINGS_COLLECTION].create_index([("farmerId", ASCENDING), ("createdAt", DESCENDING)])
        await db[BOOKINGS_COLLECTION].create_index([("ownerId", ASCENDING), ("status", ASCENDING), ("createdAt", DESCENDING)])
        await db[BOOKINGS_COLLECTION].create_index([("equipmentId", ASCENDING), ("start", ASCENDING)])
        await db[BOOKINGS_COLLECTION].create_index("expiresAt")

        # 7. payments
        await db[PAYMENTS_COLLECTION].create_index("bookingId")
        await db[PAYMENTS_COLLECTION].create_index("gatewayOrderId", unique=True, sparse=True)
        await db[PAYMENTS_COLLECTION].create_index("gatewayPaymentId", unique=True, sparse=True)

        # 8. reviews
        await db[REVIEWS_COLLECTION].create_index("bookingId", unique=True, sparse=True)
        await db[REVIEWS_COLLECTION].create_index([("equipmentId", ASCENDING), ("status", ASCENDING), ("createdAt", DESCENDING)])

        # 9. notifications
        await db[NOTIFICATIONS_COLLECTION].create_index([("userId", ASCENDING), ("readAt", ASCENDING), ("createdAt", DESCENDING)])

        # 10. callback_requests
        await db[CALLBACK_REQUESTS_COLLECTION].create_index([("status", ASCENDING), ("createdAt", DESCENDING)])

        # 11. geo
        await db[GEO_STATES_COLLECTION].create_index("code", unique=True)
        await db[GEO_DISTRICTS_COLLECTION].create_index("code", unique=True)
        await db[GEO_DISTRICTS_COLLECTION].create_index("stateCode")
        await db[GEO_BLOCKS_COLLECTION].create_index("code", unique=True)
        await db[GEO_BLOCKS_COLLECTION].create_index([("districtCode", ASCENDING), ("stateCode", ASCENDING)])

        # 12. otp_codes (TTL)
        await db[OTP_CODES_COLLECTION].create_index("expiresAt", expireAfterSeconds=0)
        await db[OTP_CODES_COLLECTION].create_index([("target", ASCENDING), ("purpose", ASCENDING)])

        # 13. audit_logs
        await db[AUDIT_LOGS_COLLECTION].create_index([("entity", ASCENDING), ("entityId", ASCENDING)])
        await db[AUDIT_LOGS_COLLECTION].create_index([("actorId", ASCENDING), ("at", DESCENDING)])

        # 14. content_registry & site_flags
        await db[CONTENT_REGISTRY_COLLECTION].create_index("key", unique=True)
        await db[SITE_FLAGS_COLLECTION].create_index("key", unique=True)

        logger.info("⚡ All MongoDB collection indexes verified and ensured.")
    except Exception as e:
        logger.warning(f"Index creation notice: {e}")
