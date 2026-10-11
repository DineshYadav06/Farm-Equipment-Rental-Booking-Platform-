from datetime import datetime, timezone
from typing import Dict
from app.core.database import get_collection, COUNTERS_COLLECTION, is_mongo_connected

class CountersRepository:
    def __init__(self):
        self._memory_counters: Dict[str, int] = {}

    async def get_next_sequence(self, counter_name: str) -> int:
        col = get_collection(COUNTERS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                res = await col.find_one_and_update(
                    {"_id": counter_name},
                    {"$inc": {"seq": 1}},
                    upsert=True,
                    return_document=True
                )
                return res["seq"]
            except Exception:
                pass

        # In-memory fallback
        seq = self._memory_counters.get(counter_name, 0) + 1
        self._memory_counters[counter_name] = seq
        return seq

    async def generate_booking_no(self) -> str:
        year = datetime.now(timezone.utc).year
        counter_name = f"booking-{year}"
        seq = await self.get_next_sequence(counter_name)
        return f"FRH-{year}-{seq:06d}"

counters_repo = CountersRepository()
