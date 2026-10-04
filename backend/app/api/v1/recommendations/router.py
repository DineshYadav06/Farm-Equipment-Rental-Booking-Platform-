from fastapi import APIRouter, Query
from typing import List, Optional
from app.schemas.review import RecommendationResponse
from app.repositories.equipment_repository import equipment_repo

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])

@router.get("", response_model=List[RecommendationResponse])
async def get_farm_recommendations(
    crop: Optional[str] = Query("Wheat", description="Crop type: Wheat, Paddy, Sugarcane, Cotton, Mustard"),
    farm_size_acres: Optional[float] = Query(5.0, description="Farm size in acres"),
    season: Optional[str] = Query("Rabi", description="Season: Rabi, Kharif, Zaid")
):
    recommendations = [
        RecommendationResponse(
            equipment_id="eq_tractor_01",
            title="Mahindra 575 DI Sarpanch 47 HP",
            category="Tractor",
            brand="Mahindra",
            model="575 DI XP Plus",
            daily_rate=3200.0,
            hourly_rate=450.0,
            average_rating=4.9,
            distance_km=3.2,
            image_url="https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1c?auto=format&fit=crop&w=800&q=80",
            match_score=98,
            recommended_reason="Optimal HP for 5-acre seedbed preparation in Rabi season.",
            best_for_crop="Wheat & Mustard"
        ),
        RecommendationResponse(
            equipment_id="eq_rotavator_01",
            title="Shaktiman Semi-Champion 7 Feet Rotavator",
            category="Rotavator",
            brand="Shaktiman",
            model="Semi-Champion 84 Inch",
            daily_rate=2200.0,
            hourly_rate=350.0,
            average_rating=4.75,
            distance_km=5.1,
            image_url="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
            match_score=94,
            recommended_reason="Produces ultra-fine tilth in 1 single pass, cutting diesel cost by 30%.",
            best_for_crop="Wheat, Vegetables & Pulses"
        ),
        RecommendationResponse(
            equipment_id="eq_seeddrill_01",
            title="National Happy Seeder 11 Tyne",
            category="Seed Drill",
            brand="National",
            model="Eco-Seeder 11-Tyne",
            daily_rate=2800.0,
            hourly_rate=400.0,
            average_rating=4.9,
            distance_km=7.8,
            image_url="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
            match_score=91,
            recommended_reason="Enables zero-tillage direct sowing into rice residue, saving 10 days.",
            best_for_crop="Wheat direct sowing"
        )
    ]
    return recommendations
