import re
import uuid
from datetime import datetime

def generate_id(prefix: str = "id") -> str:
    return f"{prefix}_{uuid.uuid4().hex[:12]}"

def validate_indian_phone(phone: str) -> bool:
    cleaned = re.sub(r"[^\d+]", "", phone)
    pattern = r"^(\+91)?[6-9]\d{9}$"
    return bool(re.match(pattern, cleaned))
