from typing import Optional, Dict, Any, List
from app.core.security import hash_password
from app.utils.helpers import generate_id
from datetime import datetime, timezone

DEMO_USERS: List[Dict[str, Any]] = [
    {
        "id": "usr_farmer_01",
        "name": "Rajesh Kumar Sharma",
        "email": "rajesh.farmer@example.com",
        "phone": "+919876543211",
        "hashed_password": hash_password("Password@123"),
        "role": "farmer",
        "city": "Ludhiana",
        "state": "Punjab",
        "latitude": 30.9010,
        "longitude": 75.8573,
        "is_active": True,
        "is_phone_verified": True,
        "verification_status": "verified",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "usr_owner_01",
        "name": "Gurpreet Singh Gill",
        "email": "gurpreet.owner@example.com",
        "phone": "+919876543210",
        "hashed_password": hash_password("Password@123"),
        "role": "owner",
        "city": "Ludhiana",
        "state": "Punjab",
        "latitude": 30.9010,
        "longitude": 75.8573,
        "is_active": True,
        "is_phone_verified": True,
        "verification_status": "verified",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "usr_admin_01",
        "name": "FarmRentHub Admin",
        "email": "admin@farmrenthub.in",
        "phone": "+919999999999",
        "hashed_password": hash_password("Admin@12345"),
        "role": "admin",
        "city": "New Delhi",
        "state": "Delhi",
        "latitude": 28.6139,
        "longitude": 77.2090,
        "is_active": True,
        "is_phone_verified": True,
        "verification_status": "verified",
        "avatar_url": None,
        "created_at": datetime.now(timezone.utc)
    }
]

class UserRepository:
    def __init__(self):
        self.memory_store = {u["id"]: u.copy() for u in DEMO_USERS}

    async def get_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        return self.memory_store.get(user_id)

    async def get_by_email_or_phone(self, identifier: str) -> Optional[Dict[str, Any]]:
        for user in self.memory_store.values():
            if user["email"].lower() == identifier.lower() or user["phone"] == identifier:
                return user
        return None

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("usr")
        user = {
            **data,
            "id": new_id,
            "is_active": True,
            "is_phone_verified": False,
            "verification_status": "pending",
            "avatar_url": None,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        self.memory_store[new_id] = user
        return user

    async def update(self, user_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        if user_id in self.memory_store:
            self.memory_store[user_id].update(updates)
            self.memory_store[user_id]["updated_at"] = datetime.now(timezone.utc)
            return self.memory_store[user_id]
        return None

user_repo = UserRepository()
