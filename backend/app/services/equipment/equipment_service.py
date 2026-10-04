from typing import Dict, Any, Optional
from app.repositories.equipment_repository import equipment_repo
from app.repositories.booking_repository import booking_repo

class EquipmentService:
    @staticmethod
    async def get_equipment_catalog(category: Optional[str] = None):
        return await equipment_repo.get_all(category=category)

    @staticmethod
    async def get_equipment_detail(equipment_id: str):
        return await equipment_repo.get_by_id(equipment_id)

class BookingService:
    @staticmethod
    async def create_booking_request(data: Dict[str, Any]):
        return await booking_repo.create(data)

    @staticmethod
    async def get_booking_details(booking_id: str):
        return await booking_repo.get_by_id(booking_id)
