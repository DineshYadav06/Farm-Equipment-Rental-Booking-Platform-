from datetime import datetime, timezone
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.models.enums import NotificationChannel

class NotificationModel(BaseDocument):
    userId: str
    type: str = "booking_update"
    titleKey: str
    bodyKey: str
    params: Dict[str, Any] = Field(default_factory=dict)
    channel: NotificationChannel = NotificationChannel.IN_APP
    language: str = "hi"
    readAt: Optional[datetime] = None
    sentAt: Optional[datetime] = None
    status: str = "sent"  # "queued" | "sent" | "failed"

    # Backward compatibility
    title: Optional[str] = None
    message: Optional[str] = None
    is_read: Optional[bool] = False
