from typing import Dict, Any
from app.core.database import get_collection, SITE_FLAGS_COLLECTION, is_mongo_connected

DEFAULT_FLAGS: Dict[str, bool] = {
    "ESCROW_LIVE": False,
    "OWNER_VERIFICATION_LIVE": False,
    "FREE_LISTING": True,
    "VERIFY_MOBILE_OTP": False,
    "REQUIRE_ID_FOR_FARMER": False,
    "SHOW_TOP_STRIP": True,
    "SHOW_TICKER": False,
    "GEOCODE_SEARCH": False,
    "WHY_NEARBY": True,
    "WHY_COMPARE": True,
    "WHY_BOOKING_LIVE": True,
    "WHY_LANGUAGES_LIVE": True
}

class FlagsRepository:
    def __init__(self):
        self.flags = DEFAULT_FLAGS.copy()

    async def get_all(self) -> Dict[str, bool]:
        col = get_collection(SITE_FLAGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                docs = await col.find({}).to_list(length=50)
                if docs:
                    res = self.flags.copy()
                    for d in docs:
                        res[d["key"]] = d["value"]
                    return res
            except Exception:
                pass
        return self.flags.copy()

    async def get_flag(self, key: str) -> bool:
        flags = await self.get_all()
        return flags.get(key, False)

    async def set_flag(self, key: str, value: bool):
        self.flags[key] = value
        col = get_collection(SITE_FLAGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.update_one(
                    {"key": key},
                    {"$set": {"key": key, "value": value}},
                    upsert=True
                )
            except Exception:
                pass

flags_repo = FlagsRepository()
