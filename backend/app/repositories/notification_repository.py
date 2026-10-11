from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from app.core.database import get_collection, NOTIFICATIONS_COLLECTION, is_mongo_connected
from app.utils.helpers import generate_id

INITIAL_NOTIFICATIONS: List[Dict[str, Any]] = [
    {
        "id": "notif_001",
        "userId": "usr_farmer_01",
        "type": "booking_confirmed",
        "titleKey": "notifications.bookingConfirmedTitle",
        "bodyKey": "notifications.bookingConfirmedBody",
        "params": {"equipment": "Mahindra 575 DI"},
        "channel": "in_app",
        "language": "hi",
        "title": "बुकिंग स्वीकृत (Booking Confirmed)",
        "message": "Gurpreet Singh Gill has confirmed your booking for Mahindra 575 DI Tractor.",
        "is_read": False,
        "readAt": None,
        "sentAt": datetime.now(timezone.utc),
        "status": "sent",
        "createdAt": datetime.now(timezone.utc),
        "deletedAt": None
    }
]

class NotificationRepository:
    def __init__(self):
        self.memory_store = {n["id"]: n.copy() for n in INITIAL_NOTIFICATIONS}

    async def get_by_user(self, user_id: str) -> List[Dict[str, Any]]:
        col = get_collection(NOTIFICATIONS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                docs = await col.find({"userId": user_id, "deletedAt": None}).sort("createdAt", -1).to_list(length=100)
                if docs:
                    for d in docs:
                        d["id"] = str(d.get("_id", d.get("id")))
                    return docs
            except Exception:
                pass
        return [n for n in self.memory_store.values() if n.get("userId") == user_id and n.get("deletedAt") is None]

    async def mark_read(self, notif_id: str) -> Optional[Dict[str, Any]]:
        now = datetime.now(timezone.utc)
        col = get_collection(NOTIFICATIONS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.update_one(
                    {"$or": [{"_id": notif_id}, {"id": notif_id}]},
                    {"$set": {"readAt": now, "is_read": True, "updatedAt": now}}
                )
            except Exception:
                pass
        if notif_id in self.memory_store:
            self.memory_store[notif_id]["readAt"] = now
            self.memory_store[notif_id]["is_read"] = True
            return self.memory_store[notif_id]
        return None

notification_repo = NotificationRepository()
