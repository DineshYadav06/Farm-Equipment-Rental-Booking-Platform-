import hashlib
from typing import Dict, Any, List
from pydantic import BaseModel, Field

class GeoPoint(BaseModel):
    type: str = "Point"
    coordinates: List[float] = Field(..., description="[longitude, latitude] (lng first)")

def create_geopoint(longitude: float, latitude: float) -> Dict[str, Any]:
    return {
        "type": "Point",
        "coordinates": [float(longitude), float(latitude)]
    }

def compute_public_point(exact_lat: float, exact_lon: float, seed_key: str = "") -> Dict[str, Any]:
    """
    Rounds coordinates to 3 decimals (~100m) and adds deterministic jitter up to ~1 km
    based on a hash of seed_key so that the public point is stable and never jumps on re-renders.
    Note: 1 degree latitude ~= 111 km. 0.008 degrees ~= 880 meters.
    """
    if seed_key:
        h = int(hashlib.md5(seed_key.encode("utf-8")).hexdigest()[:8], 16)
        # Produce offsets between -0.006 and +0.006 degrees (~600m)
        lat_offset = (((h % 1000) / 1000.0) - 0.5) * 0.012
        lon_offset = ((((h // 1000) % 1000) / 1000.0) - 0.5) * 0.012
    else:
        lat_offset = 0.0
        lon_offset = 0.0

    pub_lat = round(exact_lat + lat_offset, 3)
    pub_lon = round(exact_lon + lon_offset, 3)

    return create_geopoint(pub_lon, pub_lat)
