from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field
from app.models.base import BaseDocument
from app.models.enums import KycDocType, KycDocStatus

class KycDocumentModel(BaseDocument):
    userId: str
    docType: KycDocType = KycDocType.VOTER_ID
    last4: Optional[str] = Field(None, min_length=4, max_length=4)
    fileKey: str  # Private internal storage key (NEVER public URL)
    mimeType: str = "application/pdf"
    sizeBytes: int = Field(..., le=5 * 1024 * 1024)
    sha256: str
    status: KycDocStatus = KycDocStatus.PENDING
    reviewedBy: Optional[str] = None
    reviewedAt: Optional[datetime] = None
    rejectReason: Optional[str] = None
    retentionUntil: Optional[datetime] = None
