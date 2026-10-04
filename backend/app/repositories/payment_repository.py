from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from app.utils.helpers import generate_id

INITIAL_PAYMENTS: List[Dict[str, Any]] = [
    {
        "id": "pay_001",
        "booking_id": "bk_001",
        "farmer_id": "usr_farmer_01",
        "owner_id": "usr_owner_01",
        "amount": 6499.0,
        "platform_fee": 99.0,
        "security_deposit": 2500.0,
        "currency": "INR",
        "payment_method": "UPI",
        "status": "completed",
        "created_at": datetime.now(timezone.utc)
    }
]

class PaymentRepository:
    def __init__(self):
        self.memory_store = {p["id"]: p.copy() for p in INITIAL_PAYMENTS}

    async def get_by_id(self, payment_id: str) -> Optional[Dict[str, Any]]:
        return self.memory_store.get(payment_id)

    async def get_by_booking(self, booking_id: str) -> Optional[Dict[str, Any]]:
        for p in self.memory_store.values():
            if p["booking_id"] == booking_id:
                return p
        return None

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("pay")
        payment = {
            **data,
            "id": new_id,
            "created_at": datetime.now(timezone.utc)
        }
        self.memory_store[new_id] = payment
        return payment

payment_repo = PaymentRepository()
