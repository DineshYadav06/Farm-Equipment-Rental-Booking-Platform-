import asyncio
from datetime import datetime, timezone
import motor.motor_asyncio
import certifi
from app.core.config import settings
from app.core.database import (
    CATEGORIES_COLLECTION,
    GEO_STATES_COLLECTION,
    GEO_DISTRICTS_COLLECTION,
    EQUIPMENT_COLLECTION,
    USERS_COLLECTION
)
from app.repositories.category_repository import INITIAL_CATEGORIES
from app.repositories.geo_repository import INITIAL_STATES, INITIAL_DISTRICTS
from app.repositories.user_repository import INITIAL_USERS
from app.repositories.equipment_repository import INITIAL_EQUIPMENT, generate_keywords
from app.utils.geo import create_geopoint, compute_public_point
from app.utils.money import rupees_to_paise

async def run_seed():
    print("🌱 Starting FarmRentHub MongoDB Atlas Seeding...")
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(
            settings.MONGODB_URL,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=4000
        )
        db = client[settings.DATABASE_NAME]
        await client.admin.command("ping")
        print("Connected to MongoDB:", settings.DATABASE_NAME)

        # 1. Categories
        for cat in INITIAL_CATEGORIES:
            doc = {**cat, "isSample": True, "createdAt": datetime.now(timezone.utc)}
            await db[CATEGORIES_COLLECTION].update_one({"slug": cat["slug"]}, {"$set": doc}, upsert=True)
        print("✓ Categories seeded.")

        # 2. Geo States & Districts
        for st in INITIAL_STATES:
            doc = {**st, "isSample": True, "createdAt": datetime.now(timezone.utc)}
            await db[GEO_STATES_COLLECTION].update_one({"code": st["code"]}, {"$set": doc}, upsert=True)
        for dist in INITIAL_DISTRICTS:
            doc = {**dist, "isSample": True, "createdAt": datetime.now(timezone.utc)}
            await db[GEO_DISTRICTS_COLLECTION].update_one({"code": dist["code"]}, {"$set": doc}, upsert=True)
        print("✓ Geo entities seeded.")

        # 3. Users
        for u in INITIAL_USERS:
            doc = {**u, "isSample": True, "createdAt": datetime.now(timezone.utc)}
            await db[USERS_COLLECTION].update_one({"_id": u["id"]}, {"$set": doc}, upsert=True)
        print("✓ Sample users seeded.")

        # 4. Equipment
        for eq in INITIAL_EQUIPMENT:
            lat = float(eq.get("latitude", 30.9010))
            lon = float(eq.get("longitude", 75.8573))
            doc = {
                **eq,
                "_id": eq["id"],
                "isSample": True,
                "location": {
                    "exact": create_geopoint(lon, lat),
                    "public": compute_public_point(lat, lon, seed_key=eq["id"]),
                    "stateCode": eq.get("state", "Punjab"),
                    "districtCode": eq.get("city", "Ludhiana")
                },
                "pricing": {
                    "perHour": rupees_to_paise(eq.get("hourly_rate", 450)),
                    "perDay": rupees_to_paise(eq.get("daily_rate", 3200)),
                    "currency": "INR"
                },
                "searchKeywords": generate_keywords(eq.get("title", ""), eq.get("category", ""), eq.get("city", "")),
                "version": 1,
                "deletedAt": None,
                "createdAt": datetime.now(timezone.utc),
                "updatedAt": datetime.now(timezone.utc)
            }
            await db[EQUIPMENT_COLLECTION].update_one({"_id": eq["id"]}, {"$set": doc}, upsert=True)
        print("✓ Realistic sample equipment seeded.")

        print("🎉 Seeding completed successfully!")
    except Exception as e:
        print(f"⚠️ Seeding notice (running in memory-fallback if Atlas blocked): {e}")

if __name__ == "__main__":
    asyncio.run(run_seed())
