from fastapi import APIRouter, status, Query
from typing import List, Optional
from app.schemas.equipment import (
    EquipmentResponse,
    EquipmentCreate,
    EquipmentUpdate
)
from app.repositories.equipment_repository import equipment_repo
from app.core.exceptions import NotFoundException

router = APIRouter(prefix="/equipment", tags=["Equipment"])

@router.get("", response_model=List[EquipmentResponse])
async def list_equipment(
    category: Optional[str] = Query(None, description="Category filter"),
    city: Optional[str] = Query(None, description="City filter"),
    max_price: Optional[float] = Query(None, description="Max daily or hourly price"),
    min_rating: Optional[float] = Query(None, description="Minimum star rating"),
    q: Optional[str] = Query(None, description="Search keyword in title, brand, or model")
):
    items = await equipment_repo.get_all(
        category=category,
        city=city,
        max_price=max_price,
        min_rating=min_rating,
        search_query=q
    )
    return [EquipmentResponse(**item) for item in items]

@router.get("/nearby", response_model=List[EquipmentResponse])
async def get_nearby_equipment(
    lat: float = Query(..., description="Farmer's current latitude"),
    lon: float = Query(..., description="Farmer's current longitude"),
    radius_km: float = Query(50.0, description="Search radius in kilometers"),
    category: Optional[str] = Query(None, description="Optional equipment category filter")
):
    items = await equipment_repo.get_nearby(lat=lat, lon=lon, radius_km=radius_km, category=category)
    return [EquipmentResponse(**item) for item in items]

@router.get("/{equipment_id}", response_model=EquipmentResponse)
async def get_equipment(equipment_id: str):
    item = await equipment_repo.get_by_id(equipment_id)
    if not item:
        raise NotFoundException("Equipment", equipment_id)
    return EquipmentResponse(**item)

@router.post("", response_model=EquipmentResponse, status_code=status.HTTP_201_CREATED)
async def create_equipment(data: EquipmentCreate):
    # Simulated current owner
    owner_info = {
        "id": "usr_owner_01",
        "name": "Gurpreet Singh Gill",
        "phone": "+919876543210"
    }
    item = await equipment_repo.create(data.model_dump(), owner=owner_info)
    return EquipmentResponse(**item)

@router.patch("/{equipment_id}", response_model=EquipmentResponse)
async def update_equipment(equipment_id: str, updates: EquipmentUpdate):
    item = await equipment_repo.update(equipment_id, updates.model_dump(exclude_unset=True))
    if not item:
        raise NotFoundException("Equipment", equipment_id)
    return EquipmentResponse(**item)
