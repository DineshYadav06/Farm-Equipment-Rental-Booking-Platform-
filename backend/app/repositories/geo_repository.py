from typing import List, Dict, Any, Optional
from app.core.database import (
    get_collection,
    GEO_STATES_COLLECTION,
    GEO_DISTRICTS_COLLECTION,
    GEO_BLOCKS_COLLECTION,
    is_mongo_connected
)

INITIAL_STATES: List[Dict[str, Any]] = [
    {
        "code": "PB",
        "lgdCode": 3,
        "name": "Punjab",
        "nameI18n": {"hi": "पंजाब", "pa": "ਪੰਜਾਬ"},
        "centroid": {"type": "Point", "coordinates": [75.3412, 31.1471]}
    },
    {
        "code": "UP",
        "lgdCode": 9,
        "name": "Uttar Pradesh",
        "nameI18n": {"hi": "उत्तर प्रदेश"},
        "centroid": {"type": "Point", "coordinates": [80.9462, 26.8467]}
    },
    {
        "code": "MH",
        "lgdCode": 27,
        "name": "Maharashtra",
        "nameI18n": {"hi": "महाराष्ट्र", "mr": "महाराष्ट्र"},
        "centroid": {"type": "Point", "coordinates": [75.7139, 19.7515]}
    },
    {
        "code": "TN",
        "lgdCode": 33,
        "name": "Tamil Nadu",
        "nameI18n": {"hi": "तमिलनाडु", "ta": "தமிழ்நாடு"},
        "centroid": {"type": "Point", "coordinates": [78.6569, 11.1271]}
    }
]

INITIAL_DISTRICTS: List[Dict[str, Any]] = [
    {
        "code": "PB-LDH",
        "lgdCode": 38,
        "stateCode": "PB",
        "name": "Ludhiana",
        "nameI18n": {"hi": "लुधियाना", "pa": "ਲੁਧਿਆਣਾ"},
        "centroid": {"type": "Point", "coordinates": [75.8573, 30.9010]}
    },
    {
        "code": "PB-JAL",
        "lgdCode": 37,
        "stateCode": "PB",
        "name": "Jalandhar",
        "nameI18n": {"hi": "जालंधर", "pa": "ਜਲੰਧਰ"},
        "centroid": {"type": "Point", "coordinates": [75.5762, 31.3260]}
    },
    {
        "code": "UP-LKO",
        "lgdCode": 157,
        "stateCode": "UP",
        "name": "Lucknow",
        "nameI18n": {"hi": "लखनऊ"},
        "centroid": {"type": "Point", "coordinates": [80.9462, 26.8467]}
    }
]

class GeoRepository:
    def __init__(self):
        self.states_store = {s["code"]: s.copy() for s in INITIAL_STATES}
        self.districts_store = {d["code"]: d.copy() for d in INITIAL_DISTRICTS}

    async def get_states(self) -> List[Dict[str, Any]]:
        col = get_collection(GEO_STATES_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                items = await col.find({"deletedAt": None}).to_list(length=100)
                if items:
                    return items
            except Exception:
                pass
        return list(self.states_store.values())

    async def get_districts_by_state(self, state_code: str) -> List[Dict[str, Any]]:
        col = get_collection(GEO_DISTRICTS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                items = await col.find({"stateCode": state_code.upper(), "deletedAt": None}).to_list(length=200)
                if items:
                    return items
            except Exception:
                pass
        return [d for d in self.districts_store.values() if d.get("stateCode") == state_code.upper()]

geo_repo = GeoRepository()
