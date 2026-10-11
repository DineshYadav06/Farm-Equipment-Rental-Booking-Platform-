from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from app.core.database import get_collection, PAYMENTS_COLLECTION, is_mongo_connected
from app.utils.helpers import generate_id

INITIAL_PAYMENTS: List[Dict[str, Any]] = [
    {
        "id": "pay_001",
        "bookingId": "bk_001",
        "booking_id": "bk_001",
        "payerId": "usr_farmer_01",
        "gateway": "razorpay",
        "gatewayOrderId": "order_mock_001",
        "gatewayPaymentId": "pay_mock_001",
        "amount": 649900,  # paise
        "currency": "INR",
        "status": "captured",
        "refunds": [],
        "webhookEvents": [],
        "escrow": {"enabled": False, "releasedAt": None},
        "created_at": datetime.now(timezone.utc),
        "createdAt": datetime.now(timezone.utc),
        "deletedAt": None
    }
]

class PaymentRepository:
    def __init__(self):
        self.memory_store = {p["id"]: p.copy() for p in INITIAL_PAYMENTS}

    async def get_by_id(self, payment_id: str) -> Optional[Dict[str, Any]]:
        col = get_collection(PAYMENTS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({"$or": [{"_id": payment_id}, {"id": payment_id}], "deletedAt": None})
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("id")))
                    return doc
            except Exception:
                pass
        return self.memory_store.get(payment_id)

    async def get_by_booking_id(self, booking_id: str) -> Optional[Dict[str, Any]]:
        col = get_collection(PAYMENTS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({
                    "$or": [{"bookingId": booking_id}, {"booking_id": booking_id}],
                    "deletedAt": None
                })
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("id")))
                    return doc
            except Exception:
                pass
        for p in self.memory_store.values():
            if (p.get("bookingId") == booking_id or p.get("booking_id") == booking_id) and p.get("deletedAt") is None:
                return p
        return None

    async def has_processed_webhook(self, event_id: str) -> bool:
        col = get_collection(PAYMENTS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                found = await col.find_one({"webhookEvents.eventId": event_id})
                return found is not None
            except Exception:
                pass
        for p in self.memory_store.values():
            for evt in p.get("webhookEvents", []):
                if evt.get("eventId") == event_id:
                    return True
        return False

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("pay")
        now = datetime.now(timezone.utc)
        doc = {
            **data,
            "id": new_id,
            "_id": new_id,
            "createdAt": now,
            "created_at": now,
            "updatedAt": now,
            "deletedAt": None,
            "refunds": [],
            "webhookEvents": []
        }
        col = get_collection(PAYMENTS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.insert_one(doc)
            except Exception:
                pass
        self.memory_store[new_id] = doc
        return doc

payment_repo = PaymentRepository()
