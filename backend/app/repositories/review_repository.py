from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from app.utils.helpers import generate_id

INITIAL_REVIEWS: List[Dict[str, Any]] = [
    {
        "id": "rev_001",
        "booking_id": "bk_hist_01",
        "equipment_id": "eq_tractor_01",
        "farmer_id": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma",
        "rating": 5,
        "comment": "Tractor arrived on time with driver Jagjit ji. Diesel consumption was very economical and harrowing for 5 acres was completed in just 4.5 hours. Very genuine owner!",
        "equipment_condition_rating": 5,
        "owner_behavior_rating": 5,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "rev_002",
        "booking_id": "bk_hist_02",
        "equipment_id": "eq_tractor_02",
        "farmer_id": "usr_farmer_02",
        "farmer_name": "Manjeet Sandhu",
        "rating": 5,
        "comment": "John Deere 4WD machine is exceptionally powerful. Excellent laser leveling performance in our wheat field. Booking through FarmRentHub was smooth.",
        "equipment_condition_rating": 5,
        "owner_behavior_rating": 5,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "rev_003",
        "booking_id": "bk_hist_03",
        "equipment_id": "eq_rotavator_01",
        "farmer_id": "usr_farmer_03",
        "farmer_name": "Satish Chand",
        "rating": 5,
        "comment": "Shaktiman rotavator blades were brand new. Soil pulverization was top notch. Saved me 2 extra passes and reduced diesel cost.",
        "equipment_condition_rating": 5,
        "owner_behavior_rating": 4,
        "created_at": datetime.now(timezone.utc)
    }
]

class ReviewRepository:
    def __init__(self):
        self.memory_store = {r["id"]: r.copy() for r in INITIAL_REVIEWS}

    async def get_by_equipment(self, equipment_id: str) -> List[Dict[str, Any]]:
        return [r for r in self.memory_store.values() if r["equipment_id"] == equipment_id]

    async def get_all(self) -> List[Dict[str, Any]]:
        return list(self.memory_store.values())

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("rev")
        review = {
            **data,
            "id": new_id,
            "created_at": datetime.now(timezone.utc)
        }
        self.memory_store[new_id] = review
        return review

review_repo = ReviewRepository()
