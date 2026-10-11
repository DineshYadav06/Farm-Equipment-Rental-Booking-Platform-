from typing import Dict, Any, Optional
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.utils.geo import GeoPoint

class GeoStateModel(BaseDocument):
    code: str  # e.g. "PB"
    lgdCode: int
    name: str
    nameI18n: Dict[str, str] = Field(default_factory=dict)
    centroid: GeoPoint

class GeoDistrictModel(BaseDocument):
    code: str  # e.g. "PB-LDH"
    lgdCode: int
    stateCode: str
    name: str
    nameI18n: Dict[str, str] = Field(default_factory=dict)
    centroid: GeoPoint

class GeoBlockModel(BaseDocument):
    code: str
    lgdCode: int
    districtCode: str
    stateCode: str
    name: str
    nameI18n: Dict[str, str] = Field(default_factory=dict)
    centroid: GeoPoint
