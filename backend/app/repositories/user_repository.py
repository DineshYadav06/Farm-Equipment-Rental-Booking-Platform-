from typing import Optional, Dict, Any, List
from datetime import datetime, timezone
from app.core.database import get_collection, USERS_COLLECTION, is_mongo_connected
from app.utils.helpers import generate_id

INITIAL_USERS: List[Dict[str, Any]] = [
    {
        "id": "usr_farmer_01",
        "name": "Rajesh Kumar Sharma",
        "email": "rajesh.farmer@example.com",
        "emailVerified": True,
        "phone": "+919876543211",
        "phoneVerified": True,
        "role": "farmer",
        "language": "hi",
        "address": {
            "country": "IN",
            "stateCode": "PB",
            "districtCode": "PB-LDH",
            "blockCode": "PB-LDH-01",
            "line": "Farm #12, Near Canal Road",
            "village": "Samrala",
            "pincode": "141114"
        },
        "kycStatus": "verified",
        "is18Confirmed": True,
        "city": "Ludhiana",
        "state": "Punjab",
        "is_active": True,
        "is_phone_verified": True,
        "verification_status": "verified",
        "createdAt": datetime.now(timezone.utc),
        "updatedAt": datetime.now(timezone.utc)
    },
    {
        "id": "usr_owner_01",
        "name": "Gurpreet Singh Gill",
        "email": "gurpreet.owner@example.com",
        "emailVerified": True,
        "phone": "+919876543210",
        "phoneVerified": True,
        "role": "owner",
        "language": "pa",
        "address": {
            "country": "IN",
            "stateCode": "PB",
            "districtCode": "PB-LDH",
            "blockCode": "PB-LDH-02",
            "line": "Gill Agricultural Machinery Works, GT Road",
            "village": "Sahnewal",
            "pincode": "141120"
        },
        "kycStatus": "verified",
        "is18Confirmed": True,
        "city": "Ludhiana",
        "state": "Punjab",
        "is_active": True,
        "is_phone_verified": True,
        "verification_status": "verified",
        "createdAt": datetime.now(timezone.utc),
        "updatedAt": datetime.now(timezone.utc)
    }
]

class UserRepository:
    def __init__(self):
        self.memory_store = {u["id"]: u.copy() for u in INITIAL_USERS}

    async def get_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        col = get_collection(USERS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({"$or": [{"_id": user_id}, {"id": user_id}], "deletedAt": None})
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("id")))
                    return doc
            except Exception:
                pass
        user = self.memory_store.get(user_id)
        if user and user.get("deletedAt") is None:
            return user
        return None

    async def get_by_phone(self, phone: str) -> Optional[Dict[str, Any]]:
        col = get_collection(USERS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({"phone": phone, "deletedAt": None})
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("id")))
                    return doc
            except Exception:
                pass
        for u in self.memory_store.values():
            if u.get("phone") == phone and u.get("deletedAt") is None:
                return u
        return None

    async def get_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        col = get_collection(USERS_COLLECTION)
        normalized = email.strip().lower()
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({"email": normalized, "deletedAt": None})
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("id")))
                    return doc
            except Exception:
                pass
        for u in self.memory_store.values():
            if u.get("email", "").lower() == normalized and u.get("deletedAt") is None:
                return u
        return None

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        user_id = data.get("id") or generate_id("usr")
        doc = {
            **data,
            "id": user_id,
            "_id": user_id,
            "createdAt": datetime.now(timezone.utc),
            "updatedAt": datetime.now(timezone.utc),
            "deletedAt": None
        }
        col = get_collection(USERS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.insert_one(doc)
            except Exception:
                pass
        self.memory_store[user_id] = doc
        return doc

    async def update(self, user_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        updates["updatedAt"] = datetime.now(timezone.utc)
        col = get_collection(USERS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.update_one(
                    {"$or": [{"_id": user_id}, {"id": user_id}]},
                    {"$set": updates}
                )
            except Exception:
                pass
        if user_id in self.memory_store:
            self.memory_store[user_id].update(updates)
            return self.memory_store[user_id]
        return None

user_repo = UserRepository()
