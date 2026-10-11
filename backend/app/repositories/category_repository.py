from typing import Optional, Dict, Any, List
from app.core.database import get_collection, CATEGORIES_COLLECTION, is_mongo_connected

INITIAL_CATEGORIES: List[Dict[str, Any]] = [
    {
        "slug": "tractor",
        "parentSlug": None,
        "name": "Tractor",
        "nameI18n": {"hi": "ट्रैक्टर", "pa": "ਟਰੈਕਟਰ", "ta": "டிராக்டர்", "te": "ట్రాక్టర్"},
        "synonyms": {
            "en": ["tractor", "farm tractor"],
            "hi": ["ट्रैक्टर", "ट्रेक्टर"],
            "pa": ["ਟਰੈਕਟਰ"],
            "ta": ["டிராக்டர்"]
        },
        "defaultRateUnit": "day",
        "icon": "Tractor",
        "order": 1,
        "isActive": True
    },
    {
        "slug": "harvesting",
        "parentSlug": None,
        "name": "Harvesting",
        "nameI18n": {"hi": "कटाई मशीन", "pa": "ਵਾਢੀ ਮਸ਼ੀਨ", "ta": "அறுவடை இயந்திரம்"},
        "synonyms": {
            "en": ["harvester", "combine", "reaper"],
            "hi": ["कंबाइन", "हार्वेस्टर", "कटाई मशीन"],
            "pa": ["ਕੰਬਾਈਨ", "ਰੀਪਰ"],
            "ta": ["அறுவடை"]
        },
        "defaultRateUnit": "acre",
        "icon": "Wheat",
        "order": 2,
        "isActive": True
    },
    {
        "slug": "land-preparation",
        "parentSlug": None,
        "name": "Land Preparation",
        "nameI18n": {"hi": "जुताई व भूमि तैयारी", "pa": "ਜ਼ਮੀਨ ਦੀ ਤਿਆਰੀ"},
        "synonyms": {
            "en": ["rotavator", "cultivator", "plough", "rotary tiller"],
            "hi": ["रोटावेटर", "कल्टीवेटर", "हल", "जुताई मशीन"],
            "pa": ["ਰੋਟਾਵੇਟਰ", "ਕਲਟੀਵੇਟਰ"]
        },
        "defaultRateUnit": "hour",
        "icon": "Sprout",
        "order": 3,
        "isActive": True
    }
]

class CategoryRepository:
    def __init__(self):
        self.memory_store = {c["slug"]: c.copy() for c in INITIAL_CATEGORIES}

    async def get_all(self) -> List[Dict[str, Any]]:
        col = get_collection(CATEGORIES_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                cursor = col.find({"isActive": True, "deletedAt": None}).sort("order", 1)
                items = await cursor.to_list(length=100)
                if items:
                    for it in items:
                        it["id"] = str(it.get("_id", it.get("slug")))
                    return items
            except Exception:
                pass
        return list(self.memory_store.values())

    async def get_by_slug(self, slug: str) -> Optional[Dict[str, Any]]:
        col = get_collection(CATEGORIES_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                doc = await col.find_one({"slug": slug, "deletedAt": None})
                if doc:
                    doc["id"] = str(doc.get("_id", doc.get("slug")))
                    return doc
            except Exception:
                pass
        return self.memory_store.get(slug)

category_repo = CategoryRepository()
