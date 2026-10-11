import sys
import asyncio
import motor.motor_asyncio
import certifi
from app.core.config import settings
from app.core.database import EQUIPMENT_COLLECTION
from app.utils.geo import create_geopoint, compute_public_point
from app.utils.money import rupees_to_paise
from app.repositories.equipment_repository import generate_keywords

async def migrate(dry_run: bool = True):
    print(f"🔄 Running FarmRentHub v1 to v2 migration (Dry Run: {dry_run})...")
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(
            settings.MONGODB_URL,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=4000
        )
        db = client[settings.DATABASE_NAME]
        await client.admin.command("ping")

        col = db[EQUIPMENT_COLLECTION]
        cursor = col.find({"pricing.perDay": {"$exists": False}})
        count = 0
        async for doc in cursor:
            count += 1
            lat = float(doc.get("latitude", 30.9010))
            lon = float(doc.get("longitude", 75.8573))
            hourly = float(doc.get("hourly_rate", 400))
            daily = float(doc.get("daily_rate", 3000))
            doc_id = str(doc.get("_id", doc.get("id")))

            updates = {
                "location": {
                    "exact": create_geopoint(lon, lat),
                    "public": compute_public_point(lat, lon, seed_key=doc_id),
                    "stateCode": doc.get("state", "Punjab"),
                    "districtCode": doc.get("city", "Ludhiana")
                },
                "pricing": {
                    "perHour": rupees_to_paise(hourly),
                    "perDay": rupees_to_paise(daily),
                    "currency": "INR"
                },
                "searchKeywords": generate_keywords(doc.get("title", ""), doc.get("category", ""), doc.get("city", "")),
                "version": doc.get("version", 1)
            }

            if not dry_run:
                await col.update_one({"_id": doc["_id"]}, {"$set": updates})

        print(f"✓ Migration inspected/processed {count} documents.")
        if dry_run:
            print("ℹ Dry-run finished. No records were modified.")
        else:
            print("🎉 Migration committed successfully.")
    except Exception as e:
        print(f"Migration notice: {e}")

if __name__ == "__main__":
    is_dry = "--commit" not in sys.argv
    asyncio.run(migrate(dry_run=is_dry))
