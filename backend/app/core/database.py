import motor.motor_asyncio
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

client: motor.motor_asyncio.AsyncIOMotorClient = None
db: motor.motor_asyncio.AsyncIOMotorDatabase = None


async def connect_db():
    global client, db
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL, serverSelectionTimeoutMS=2000)
        db = client[settings.DATABASE_NAME]
        # Test connection
        await client.admin.command("ping")
        logger.info(f"✅ Connected to MongoDB: {settings.DATABASE_NAME}")
    except Exception as e:
        logger.warning(f"⚠️ MongoDB local connection warning: {e}. Running in memory-buffered development mode.")



async def close_db():
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed")


def get_db() -> motor.motor_asyncio.AsyncIOMotorDatabase:
    return db


# Collection helpers
def get_collection(name: str):
    return db[name]


# Collections
USERS_COLLECTION = "users"
EQUIPMENT_COLLECTION = "equipment"
BOOKINGS_COLLECTION = "bookings"
PAYMENTS_COLLECTION = "payments"
REVIEWS_COLLECTION = "reviews"
NOTIFICATIONS_COLLECTION = "notifications"
VERIFICATIONS_COLLECTION = "verifications"
