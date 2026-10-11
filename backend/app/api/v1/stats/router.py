from fastapi import APIRouter
from app.repositories.equipment_repository import equipment_repo
from app.repositories.booking_repository import booking_repo

router = APIRouter(prefix="/stats", tags=["Stats"])

@router.get("/public")
async def get_public_stats():
    equipment = await equipment_repo.get_all()
    districts = set()
    for e in equipment:
        city = e.get("city") or e.get("location", {}).get("districtCode")
        if city:
            districts.add(city.strip().lower())

    completed_bookings = len([b for b in booking_repo.memory_store.values() if b.get("status") == "completed"])

    return {
        "machines_listed": len(equipment),
        "districts_active": len(districts),
        "completed_bookings": completed_bookings,
        "pilot_districts": ["Ludhiana", "Karnal"],
        "status": "verified"
    }
