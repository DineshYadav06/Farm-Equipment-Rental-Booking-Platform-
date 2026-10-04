from typing import List, Optional, Dict, Any
from app.core.database import get_collection, EQUIPMENT_COLLECTION, db
from app.utils.distance import calculate_haversine_distance
from app.utils.helpers import generate_id
from datetime import datetime, timezone

# Seed realistic agricultural equipment in India
INITIAL_EQUIPMENT: List[Dict[str, Any]] = [
    {
        "id": "eq_tractor_01",
        "owner_id": "usr_owner_01",
        "owner_name": "Gurpreet Singh Gill",
        "owner_phone": "+919876543210",
        "title": "Mahindra 575 DI Sarpanch 47 HP Tractor",
        "category": "Tractor",
        "brand": "Mahindra",
        "model": "575 DI XP Plus",
        "year": 2023,
        "hp": 47,
        "fuel_type": "Diesel",
        "description": "High performance 47HP tractor equipped with power steering, dual clutch, and heavy haulage capability. Ideal for plowing, haulage, and sowing.",
        "images": [
            "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 450.0,
        "daily_rate": 3200.0,
        "security_deposit": 2500.0,
        "with_driver": True,
        "city": "Ludhiana",
        "state": "Punjab",
        "pincode": "141001",
        "latitude": 30.9010,
        "longitude": 75.8573,
        "is_available": True,
        "condition": "Excellent",
        "average_rating": 4.9,
        "total_reviews": 38,
        "total_bookings": 64,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_tractor_02",
        "owner_id": "usr_owner_02",
        "owner_name": "Rameshwar Patel",
        "owner_phone": "+919823456789",
        "title": "John Deere 5310 PowerTech 55 HP 4WD",
        "category": "Tractor",
        "brand": "John Deere",
        "model": "5310 GearPro 4WD",
        "year": 2024,
        "hp": 55,
        "fuel_type": "Diesel",
        "description": "Heavy-duty 4-Wheel Drive tractor designed for tough field conditions, laser leveling, and heavy rotavator operations. Includes trained operator.",
        "images": [
            "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 600.0,
        "daily_rate": 4200.0,
        "security_deposit": 3500.0,
        "with_driver": True,
        "city": "Karnal",
        "state": "Haryana",
        "pincode": "132001",
        "latitude": 29.6857,
        "longitude": 76.9905,
        "is_available": True,
        "condition": "Like New",
        "average_rating": 4.95,
        "total_reviews": 52,
        "total_bookings": 89,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_harvester_01",
        "owner_id": "usr_owner_01",
        "owner_name": "Gurpreet Singh Gill",
        "owner_phone": "+919876543210",
        "title": "Preet 987 Self-Propelled Combine Harvester",
        "category": "Harvester",
        "brand": "Preet",
        "model": "987 Super Deluxe",
        "year": 2023,
        "hp": 101,
        "fuel_type": "Diesel",
        "description": "Multi-crop combine harvester equipped with heavy cutter bar, straw management system (SMS), and clean grain tank. Best for wheat, paddy, and soybean.",
        "images": [
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 1800.0,
        "daily_rate": 14000.0,
        "security_deposit": 10000.0,
        "with_driver": True,
        "city": "Ludhiana",
        "state": "Punjab",
        "pincode": "141001",
        "latitude": 30.9100,
        "longitude": 75.8450,
        "is_available": True,
        "condition": "Excellent",
        "average_rating": 4.85,
        "total_reviews": 29,
        "total_bookings": 41,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_rotavator_01",
        "owner_id": "usr_owner_03",
        "owner_name": "Balwant Yadav",
        "owner_phone": "+919712345678",
        "title": "Shaktiman Semi-Champion 7 Feet Rotavator",
        "category": "Rotavator",
        "brand": "Shaktiman",
        "model": "Semi-Champion 84 Inch",
        "year": 2023,
        "hp": 50,
        "fuel_type": "PTO Driven",
        "description": "Heavy-duty 54-blade rotary tiller for fine soil preparation in a single pass. Saves up to 35% fuel and ensures uniform seed bed preparation.",
        "images": [
            "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 350.0,
        "daily_rate": 2200.0,
        "security_deposit": 1500.0,
        "with_driver": False,
        "city": "Meerut",
        "state": "Uttar Pradesh",
        "pincode": "250001",
        "latitude": 28.9845,
        "longitude": 77.7064,
        "is_available": True,
        "condition": "Excellent",
        "average_rating": 4.75,
        "total_reviews": 19,
        "total_bookings": 33,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_seeddrill_01",
        "owner_id": "usr_owner_04",
        "owner_name": "Sukhdev Verma",
        "owner_phone": "+919456789012",
        "title": "National Happy Seeder 11 Tyne (Zero Tillage)",
        "category": "Seed Drill",
        "brand": "National",
        "model": "Eco-Seeder 11-Tyne",
        "year": 2024,
        "hp": 55,
        "fuel_type": "PTO Driven",
        "description": "Zero-till wheat sowing machine in standing paddy stubble. Eliminates stubble burning, preserves soil moisture, and achieves uniform germination.",
        "images": [
            "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 400.0,
        "daily_rate": 2800.0,
        "security_deposit": 2000.0,
        "with_driver": True,
        "city": "Patiala",
        "state": "Punjab",
        "pincode": "147001",
        "latitude": 30.3398,
        "longitude": 76.3869,
        "is_available": True,
        "condition": "New",
        "average_rating": 4.9,
        "total_reviews": 16,
        "total_bookings": 27,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_sprayer_01",
        "owner_id": "usr_owner_05",
        "owner_name": "Vikram Deshmukh",
        "owner_phone": "+919371234567",
        "title": "Aspee Tractor Mounted 600L Boom Sprayer",
        "category": "Sprayer",
        "brand": "Aspee",
        "model": "HTP-600 Turbo",
        "year": 2023,
        "hp": 35,
        "fuel_type": "PTO Driven",
        "description": "600-liter tractor-mounted boom sprayer with 12m swath width. Features ceramic nozzles for uniform pesticide and nutrient application across large acreage.",
        "images": [
            "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 300.0,
        "daily_rate": 2100.0,
        "security_deposit": 1500.0,
        "with_driver": True,
        "city": "Nashik",
        "state": "Maharashtra",
        "pincode": "422001",
        "latitude": 19.9975,
        "longitude": 73.7898,
        "is_available": True,
        "condition": "Excellent",
        "average_rating": 4.8,
        "total_reviews": 24,
        "total_bookings": 48,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_irrigation_01",
        "owner_id": "usr_owner_03",
        "owner_name": "Balwant Yadav",
        "owner_phone": "+919712345678",
        "title": "Kirloskar 10 HP Mobile Diesel Irrigation Pump",
        "category": "Irrigation Equipment",
        "brand": "Kirloskar",
        "model": "Jalraj 10HP Mobile",
        "year": 2022,
        "hp": 10,
        "fuel_type": "Diesel",
        "description": "High-head portable diesel water pump mounted on a trolley with 150-meter delivery pipe and sprinkler heads. Perfect for emergency canal and borewell lifting.",
        "images": [
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 200.0,
        "daily_rate": 1400.0,
        "security_deposit": 1000.0,
        "with_driver": False,
        "city": "Meerut",
        "state": "Uttar Pradesh",
        "pincode": "250001",
        "latitude": 28.9800,
        "longitude": 77.7100,
        "is_available": True,
        "condition": "Good",
        "average_rating": 4.6,
        "total_reviews": 14,
        "total_bookings": 22,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_thresher_01",
        "owner_id": "usr_owner_02",
        "owner_name": "Rameshwar Patel",
        "owner_phone": "+919823456789",
        "title": "Bhartiya Multi-Crop Thresher with Elevator",
        "category": "Thresher",
        "brand": "Bhartiya",
        "model": "Super Delux 40 HP",
        "year": 2023,
        "hp": 40,
        "fuel_type": "PTO Driven",
        "description": "High output multi-crop thresher for wheat, mustard, grams, and pulses. High capacity blower ensures 99.8% grain cleanliness without seed breakage.",
        "images": [
            "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 500.0,
        "daily_rate": 3500.0,
        "security_deposit": 2500.0,
        "with_driver": True,
        "city": "Karnal",
        "state": "Haryana",
        "pincode": "132001",
        "latitude": 29.6900,
        "longitude": 76.9800,
        "is_available": True,
        "condition": "Excellent",
        "average_rating": 4.7,
        "total_reviews": 31,
        "total_bookings": 54,
        "created_at": datetime.now(timezone.utc)
    },
    {
        "id": "eq_cultivator_01",
        "owner_id": "usr_owner_04",
        "owner_name": "Sukhdev Verma",
        "owner_phone": "+919456789012",
        "title": "Fieldking Spring Loaded 9-Tyne Cultivator",
        "category": "Cultivator",
        "brand": "Fieldking",
        "model": "Heavy Duty 9 Tyne",
        "year": 2023,
        "hp": 40,
        "fuel_type": "Tractor Mounted",
        "description": "Spring-loaded tynes capable of aerating hard soil and uprooting weed roots up to 9 inches deep. High-grade boron steel shovel points.",
        "images": [
            "https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=800&q=80"
        ],
        "hourly_rate": 250.0,
        "daily_rate": 1600.0,
        "security_deposit": 1200.0,
        "with_driver": False,
        "city": "Patiala",
        "state": "Punjab",
        "pincode": "147001",
        "latitude": 30.3450,
        "longitude": 76.3900,
        "is_available": True,
        "condition": "Excellent",
        "average_rating": 4.8,
        "total_reviews": 11,
        "total_bookings": 19,
        "created_at": datetime.now(timezone.utc)
    }
]

class EquipmentRepository:
    def __init__(self):
        self.memory_store = {item["id"]: item.copy() for item in INITIAL_EQUIPMENT}

    async def get_all(
        self,
        category: Optional[str] = None,
        city: Optional[str] = None,
        max_price: Optional[float] = None,
        min_rating: Optional[float] = None,
        search_query: Optional[str] = None,
    ) -> List[Dict[str, Any]]:
        results = list(self.memory_store.values())
        if category and category.lower() != "all":
            results = [e for e in results if e["category"].lower() == category.lower()]
        if city:
            results = [e for e in results if city.lower() in e["city"].lower()]
        if max_price:
            results = [e for e in results if e["daily_rate"] <= max_price or e["hourly_rate"] <= max_price]
        if min_rating:
            results = [e for e in results if e["average_rating"] >= min_rating]
        if search_query:
            q = search_query.lower()
            results = [
                e for e in results
                if q in e["title"].lower() or q in e["brand"].lower() or q in e["category"].lower() or q in e["city"].lower()
            ]
        return results

    async def get_by_id(self, equipment_id: str) -> Optional[Dict[str, Any]]:
        return self.memory_store.get(equipment_id)

    async def get_nearby(
        self,
        lat: float,
        lon: float,
        radius_km: float = 50.0,
        category: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        items = await self.get_all(category=category)
        nearby_items = []
        for item in items:
            d = calculate_haversine_distance(lat, lon, item["latitude"], item["longitude"])
            if d <= radius_km:
                item_copy = item.copy()
                item_copy["distance_km"] = d
                nearby_items.append(item_copy)
        
        nearby_items.sort(key=lambda x: x["distance_km"])
        return nearby_items

    async def create(self, data: Dict[str, Any], owner: Dict[str, Any]) -> Dict[str, Any]:
        new_id = generate_id("eq")
        item = {
            **data,
            "id": new_id,
            "owner_id": owner.get("id", "usr_owner_01"),
            "owner_name": owner.get("name", "Farm Equipment Owner"),
            "owner_phone": owner.get("phone", "+919876543210"),
            "is_available": True,
            "average_rating": 5.0,
            "total_reviews": 0,
            "total_bookings": 0,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc)
        }
        self.memory_store[new_id] = item
        return item

    async def update(self, equipment_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        if equipment_id in self.memory_store:
            self.memory_store[equipment_id].update(updates)
            self.memory_store[equipment_id]["updated_at"] = datetime.now(timezone.utc)
            return self.memory_store[equipment_id]
        return None

equipment_repo = EquipmentRepository()
