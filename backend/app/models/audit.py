from datetime import datetime, timezone
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.core.database import get_collection, AUDIT_LOGS_COLLECTION, is_mongo_connected
from app.utils.helpers import generate_id

class AuditLogModel(BaseDocument):
    actorId: str
    actorRole: str
    action: str  # e.g. "kyc.approve", "user.delete_request"
    entity: str
    entityId: str
    at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ip: Optional[str] = None
    meta: Dict[str, Any] = Field(default_factory=dict)

class AuditRepository:
    def __init__(self):
        self.logs = []

    async def log_action(self, actor_id: str, actor_role: str, action: str, entity: str, entity_id: str, ip: Optional[str] = None, meta: Optional[Dict[str, Any]] = None):
        doc = {
            "id": generate_id("aud"),
            "actorId": actor_id,
            "actorRole": actor_role,
            "action": action,
            "entity": entity,
            "entityId": entity_id,
            "at": datetime.now(timezone.utc),
            "ip": ip,
            "meta": meta or {}
        }
        col = get_collection(AUDIT_LOGS_COLLECTION)
        if is_mongo_connected and col is not None:
            try:
                await col.insert_one(doc)
            except Exception:
                pass
        self.logs.append(doc)

audit_repo = AuditRepository()
