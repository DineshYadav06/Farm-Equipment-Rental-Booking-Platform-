from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from app.core.database import get_collection, REVIEWS_COLLECTION, EQUIPMENT_COLLECTION, is_mongo_connected
from app.utils.helpers import generate_id

INITIAL_REVIEWS: List[Dict[str, Any]] = [
    {
        "id": "rev_001",
        "bookingId": "bk_mock_001",
        "booking_id": "bk_mock_001",
        "equipmentId": "eq_tractor_01",
        "equipment_id": "eq_tractor_01",
        "farmerId": "usr_farmer_01",
        "ownerId": "usr_owner_01",
        "farmer_name": "Sukhwinder Sandhu",
        "farmer_location": "Ludhiana, Punjab",
        "rating": 5,
        "text": "Tractor arrived on time with driver. Powerful engine, plowed 10 acres smoothly. Very cooperative owner.",
        "comment": "Tractor arrived on time with driver. Powerful engine, plowed 10 acres smoothly. Very cooperative owner.",
        "status": "published",
        "consentToDisplay": True,
        "created_at": "2026-09-28",
        "createdAt": datetime.now(timezone.utc),
        "deletedAt": None
    },
    {
        "id": "rev_002",
        "bookingId": "bk_mock_002",
        "booking_id": "bk_mock_002",
        "equipmentId": "eq_tractor_02",
        "equipment_id": "eq_tractor_02",
        "farmerId": "usr_farmer_02",
        "ownerId": "usr_owner_02",
        "farmer_name": "Harbhajan Maan",
        "farmer_location": "Khanna, Punjab",
        "rating": 5,
        "text": "Excellent John Deere 4WD machine. The laser leveling implement saved a full day of field preparation.",
        "comment": "Excellent John Deere 4WD machine. The laser leveling implement saved a full day of field preparation.",
        "status": "published",
        "consentToDisplay": True,
        "created_at": "2026-09-15",
        "createdAt": datetime.now(timezone.utc),
        "deletedAt": None
    }
]

class ReviewRepository:
    def __init__(self):
        self.memory_store = {r["id"]: r.copy() for r in INITIAL_REVIEWS}

    async def get_by_equipment(self, equipment_id: str) -> List[Dict[str, Any]]:
        col = get_collection(REVIEWS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                docs = await col.find({
                    "$or": [{"equipmentId": equipment_id}, {"equipment_id": equipment_id}],
                    "status": "published",
                    "deletedAt": None
                }).sort("createdAt", -1).to_list(length=100)
                if docs:
                    for d in docs:
                        d["id"] = str(d.get("_id", d.get("id")))
                    return docs
            except Exception:
                pass
        return [
            r for r in self.memory_store.values()
            if (r.get("equipmentId") == equipment_id or r.get("equipment_id") == equipment_id)
            and r.get("status") == "published"
            and r.get("deletedAt") is None
        ]

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("rev")
        now = datetime.now(timezone.utc)
        doc = {
            **data,
            "id": new_id,
            "_id": new_id,
            "status": "published",
            "consentToDisplay": True,
            "createdAt": now,
            "created_at": now.strftime("%Y-%m-%d"),
            "deletedAt": None
        }

        col = get_collection(REVIEWS_COLLECTION)
        col_eq = get_collection(EQUIPMENT_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.insert_one(doc)
                # Recalculate rating atomically on equipment
                eq_id = data.get("equipmentId") or data.get("equipment_id")
                all_revs = await col.find({"equipmentId": eq_id, "status": "published"}).to_list(length=500)
                if all_revs:
                    avg_rt = round(sum(r["rating"] for r in all_revs) / len(all_revs), 2)
                    await col_eq.update_one(
                        {"$or": [{"_id": eq_id}, {"id": eq_id}]},
                        {"$set": {"ratingAvg": avg_rt, "ratingCount": len(all_revs), "average_rating": avg_rt, "total_reviews": len(all_revs)}}
                    )
            except Exception:
                pass

        self.memory_store[new_id] = doc
        return doc

review_repo = ReviewRepository()
