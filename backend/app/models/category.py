from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.models.enums import RateUnit

class SpecFieldDefinition(BaseModel):
    key: str
    labelI18n: Dict[str, str] = Field(default_factory=dict)
    type: str  # "number" | "text" | "enum"
    unit: Optional[str] = None
    options: Optional[List[str]] = None

class CategoryModel(BaseDocument):
    slug: str
    parentSlug: Optional[str] = None
    name: str
    nameI18n: Dict[str, str] = Field(default_factory=dict)
    synonyms: Dict[str, List[str]] = Field(default_factory=dict)
    defaultRateUnit: RateUnit = RateUnit.DAY
    icon: str = "Tractor"
    order: int = 1
    isActive: bool = True
    specFields: List[SpecFieldDefinition] = []
