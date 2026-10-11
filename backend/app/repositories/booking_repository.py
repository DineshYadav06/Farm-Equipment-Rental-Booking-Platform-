from typing import List, Optional, Dict, Any
from datetime import datetime, timezone, timedelta
from app.core.database import (
    get_collection,
    BOOKINGS_COLLECTION,
    AVAILABILITY_BLOCKS_COLLECTION,
    is_mongo_connected
)
from app.repositories.counters_repository import counters_repo
from app.utils.helpers import generate_id
from fastapi import HTTPException

INITIAL_BOOKINGS: List[Dict[str, Any]] = [
    {
        "id": "bk_001",
        "bookingNo": "FRH-2026-000001",
        "farmer_id": "usr_farmer_01",
        "farmerId": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma",
        "farmer_phone": "+919876543211",
        "equipment_id": "eq_tractor_01",
        "equipmentId": "eq_tractor_01",
        "equipment_title": "Mahindra 575 DI Sarpanch 47 HP Tractor",
        "equipment_category": "Tractor",
        "owner_id": "usr_owner_01",
        "ownerId": "usr_owner_01",
        "owner_name": "Gurpreet Singh Gill",
        "owner_phone": "+919876543210",
        "rental_type": "daily",
        "start_date": datetime.now(timezone.utc) + timedelta(days=1),
        "end_date": datetime.now(timezone.utc) + timedelta(days=3),
        "start": datetime.now(timezone.utc) + timedelta(days=1),
        "end": datetime.now(timezone.utc) + timedelta(days=3),
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
        "version": 1,
        "deletedAt": None,
        "created_at": datetime.now(timezone.utc),
        "createdAt": datetime.now(timezone.utc),
        "updatedAt": datetime.now(timezone.utc)
    },
    {
        "id": "bk_002",
        "bookingNo": "FRH-2026-000002",
        "farmer_id": "usr_farmer_01",
        "farmerId": "usr_farmer_01",
        "farmer_name": "Rajesh Kumar Sharma",
        "farmer_phone": "+919876543211",
        "equipment_id": "eq_rotavator_01",
        "equipmentId": "eq_rotavator_01",
        "equipment_title": "Shaktiman Semi-Champion 7 Feet Rotavator",
        "equipment_category": "Rotavator",
        "owner_id": "usr_owner_03",
        "ownerId": "usr_owner_03",
        "owner_name": "Balwant Yadav",
        "owner_phone": "+919712345678",
        "rental_type": "hourly",
        "start_date": datetime.now(timezone.utc) + timedelta(days=4),
        "end_date": datetime.now(timezone.utc) + timedelta(days=4, hours=6),
        "start": datetime.now(timezone.utc) + timedelta(days=4),
        "end": datetime.now(timezone.utc) + timedelta(days=4, hours=6),
        "duration_hours": 6,
        "duration_days": 1,
        "total_amount": 2199.0,
        "platform_fee": 99.0,
        "security_deposit": 1500.0,
        "status": "requested",
        "delivery_type": "self_pickup",
        "delivery_address": "Kisan Seva Kendra, GT Road",
        "payment_status": "pending",
        "payment_id": None,
        "version": 1,
        "deletedAt": None,
        "created_at": datetime.now(timezone.utc),
        "createdAt": datetime.now(timezone.utc),
        "updatedAt": datetime.now(timezone.utc)
    }
]

VALID_TRANSITIONS = {
    "requested": ["accepted", "rejected", "expired", "cancelled"],
    "accepted": ["confirmed", "cancelled"],
    "confirmed": ["in_progress", "cancelled"],
    "in_progress": ["completed"],
    "completed": [],
    "rejected": [],
    "expired": [],
    "cancelled": [],
    # Backward compatibility with existing simple statuses:
    "pending": ["confirmed", "accepted", "rejected", "cancelled"],
    "active": ["completed", "cancelled"]
}

class BookingRepository:
    def __init__(self):
        self.memory_store = {b["id"]: b.copy() for b in INITIAL_BOOKINGS}
        self.availability_blocks: List[Dict[str, Any]] = []

    async def get_by_id(self, booking_id: str) -> Optional[Dict[str, Any]]:
        col = get_collection(BOOKINGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({"$or": [{"_id": booking_id}, {"id": booking_id}], "deletedAt": None})
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("id")))
                    return doc
            except Exception:
                pass
        return self.memory_store.get(booking_id)

    async def get_by_farmer(self, farmer_id: str) -> List[Dict[str, Any]]:
        col = get_collection(BOOKINGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                docs = await col.find({
                    "$or": [{"farmerId": farmer_id}, {"farmer_id": farmer_id}],
                    "deletedAt": None
                }).sort("createdAt", -1).to_list(length=100)
                if docs:
                    for d in docs:
                        d["id"] = str(d.get("_id", d.get("id")))
                    return docs
            except Exception:
                pass
        return [b for b in self.memory_store.values() if (b.get("farmerId") == farmer_id or b.get("farmer_id") == farmer_id) and b.get("deletedAt") is None]

    async def get_by_owner(self, owner_id: str) -> List[Dict[str, Any]]:
        col = get_collection(BOOKINGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                docs = await col.find({
                    "$or": [{"ownerId": owner_id}, {"owner_id": owner_id}],
                    "deletedAt": None
                }).sort("createdAt", -1).to_list(length=100)
                if docs:
                    for d in docs:
                        d["id"] = str(d.get("_id", d.get("id")))
                    return docs
            except Exception:
                pass
        return [b for b in self.memory_store.values() if (b.get("ownerId") == owner_id or b.get("owner_id") == owner_id) and b.get("deletedAt") is None]

    async def check_overlap(self, equipment_id: str, start: datetime, end: datetime) -> bool:
        col = get_collection(AVAILABILITY_BLOCKS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                overlap = await col.find_one({
                    "equipmentId": equipment_id,
                    "start": {"$lt": end},
                    "end": {"$gt": start}
                })
                return overlap is not None
            except Exception:
                pass
        for blk in self.availability_blocks:
            if blk["equipmentId"] == equipment_id and blk["start"] < end and blk["end"] > start:
                return True
        return False

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("bk")
        booking_no = await counters_repo.generate_booking_no()
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(hours=24)

        eq_id = data.get("equipmentId") or data.get("equipment_id")
        start_time = data.get("start") or now + timedelta(days=1)
        end_time = data.get("end") or start_time + timedelta(days=1)

        # Check overlapping blocks
        has_overlap = await self.check_overlap(eq_id, start_time, end_time)
        if has_overlap:
            raise HTTPException(
                status_code=409,
                detail="Booking conflict: The requested equipment is already booked for this time slot."
            )

        booking = {
            **data,
            "id": new_id,
            "_id": new_id,
            "bookingNo": booking_no,
            "equipmentId": eq_id,
            "equipment_id": eq_id,
            "farmerId": data.get("farmerId") or data.get("farmer_id", "usr_farmer_01"),
            "farmer_id": data.get("farmerId") or data.get("farmer_id", "usr_farmer_01"),
            "ownerId": data.get("ownerId") or data.get("owner_id", "usr_owner_01"),
            "owner_id": data.get("ownerId") or data.get("owner_id", "usr_owner_01"),
            "start": start_time,
            "end": end_time,
            "status": data.get("status", "requested"),
            "version": 1,
            "expiresAt": expires_at,
            "statusHistory": [
                {
                    "status": data.get("status", "requested"),
                    "at": now,
                    "by": data.get("farmerId") or "usr_farmer_01",
                    "note": "Initial booking request created"
                }
            ],
            "deletedAt": None,
            "createdAt": now,
            "created_at": now,
            "updatedAt": now,
            "updated_at": now
        }

        # Create availability block to reserve slot
        block = {
            "equipmentId": eq_id,
            "bookingId": new_id,
            "start": start_time,
            "end": end_time,
            "reason": "booked"
        }
        self.availability_blocks.append(block)

        col = get_collection(BOOKINGS_COLLECTION)
        col_blk = get_collection(AVAILABILITY_BLOCKS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.insert_one(booking)
                if col_blk is not None:
                    await col_blk.insert_one(block)
            except Exception:
                pass

        self.memory_store[new_id] = booking
        return booking

    async def update_status(self, booking_id: str, new_status: str, by_user: str = "system", note: Optional[str] = None) -> Optional[Dict[str, Any]]:
        booking = await self.get_by_id(booking_id)
        if not booking:
            return None

        current_status = booking.get("status", "requested")
        allowed = VALID_TRANSITIONS.get(current_status, [])
        if allowed and new_status not in allowed:
            raise HTTPException(
                status_code=409,
                detail=f"Invalid state transition: Cannot transition booking from '{current_status}' to '{new_status}'."
            )

        now = datetime.now(timezone.utc)
        history_entry = {
            "status": new_status,
            "at": now,
            "by": by_user,
            "note": note
        }

        updates = {
            "status": new_status,
            "updatedAt": now,
            "updated_at": now
        }

        col = get_collection(BOOKINGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.update_one(
                    {"$or": [{"_id": booking_id}, {"id": booking_id}]},
                    {
                        "$set": updates,
                        "$push": {"statusHistory": history_entry},
                        "$inc": {"version": 1}
                    }
                )
            except Exception:
                pass

        if booking_id in self.memory_store:
            self.memory_store[booking_id].update(updates)
            if "statusHistory" not in self.memory_store[booking_id]:
                self.memory_store[booking_id]["statusHistory"] = []
            self.memory_store[booking_id]["statusHistory"].append(history_entry)
            return self.memory_store[booking_id]
        return None

booking_repo = BookingRepository()
