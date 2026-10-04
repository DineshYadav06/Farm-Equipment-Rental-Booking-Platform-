from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
from app.utils.helpers import generate_id

INITIAL_BOOKINGS: List[Dict[str, Any]] = [
    {
        "id": "bk_001",
        "farmer_id": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma",
        "farmer_phone": "+919876543211",
        "equipment_id": "eq_tractor_01",
        "equipment_title": "Mahindra 575 DI Sarpanch 47 HP Tractor",
        "equipment_category": "Tractor",
        "owner_id": "usr_owner_01",
        "owner_name": "Gurpreet Singh Gill",
        "owner_phone": "+919876543210",
        "rental_type": "daily",
        "start_date": datetime.now(timezone.utc) + timedelta(days=1),
        "end_date": datetime.now(timezone.utc) + timedelta(days=3),
        "duration_hours": 16,
        "duration_days": 2,
        "total_amount": 6499.0,
        "platform_fee": 99.0,
        "security_deposit": 2500.0,
        "status": "confirmed",
        "delivery_type": "owner_delivery",
        "delivery_address": "Village Samrala, Field Plot #12, Ludhiana",
        "payment_status": "paid",
        "payment_id": "pay_001",
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "bk_002",
        "farmer_id": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma",
        "farmer_phone": "+919876543211",
        "equipment_id": "eq_rotavator_01",
        "equipment_title": "Shaktiman Semi-Champion 7 Feet Rotavator",
        "equipment_category": "Rotavator",
        "owner_id": "usr_owner_03",
        "owner_name": "Balwant Yadav",
        "owner_phone": "+919712345678",
        "rental_type": "hourly",
        "start_date": datetime.now(timezone.utc) + timedelta(days=4),
        "end_date": datetime.now(timezone.utc) + timedelta(days=4, hours=6),
        "duration_hours": 6,
        "duration_days": 1,
        "total_amount": 2199.0,
        "platform_fee": 99.0,
        "security_deposit": 1500.0,
        "status": "pending",
        "delivery_type": "self_pickup",
        "delivery_address": "Kisan Seva Kendra, GT Road",
        "payment_status": "pending",
        "payment_id": None,
        "created_at": datetime.now(timezone.utc)
    }
]

class BookingRepository:
    def __init__(self):
        self.memory_store = {b["id"]: b.copy() for b in INITIAL_BOOKINGS}

    async def get_by_id(self, booking_id: str) -> Optional[Dict[str, Any]]:
        return self.memory_store.get(booking_id)

    async def get_by_farmer(self, farmer_id: str) -> List[Dict[str, Any]]:
        return [b for b in self.memory_store.values() if b["farmer_id"] == farmer_id]

    async def get_by_owner(self, owner_id: str) -> List[Dict[str, Any]]:
        return [b for b in self.memory_store.values() if b["owner_id"] == owner_id]

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("bk")
        booking = {
            **data,
            "id": new_id,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        self.memory_store[new_id] = booking
        return booking

    async def update_status(self, booking_id: str, status: str) -> Optional[Dict[str, Any]]:
        if booking_id in self.memory_store:
            self.memory_store[booking_id]["status"] = status
            self.memory_store[booking_id]["updated_at"] = datetime.now(timezone.utc)
            return self.memory_store[booking_id]
        return None

booking_repo = BookingRepository()
