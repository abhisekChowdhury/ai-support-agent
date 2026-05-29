from pydantic import BaseModel
from enum import Enum
from datetime import datetime
import uuid

class TicketStatus(Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    ESCALATED = "escalated"
    RESOLVED = "resolved"

class TicketCreate(BaseModel):
    customer_name: str
    issue: str

class Ticket(BaseModel):
    id: str = str(uuid.uuid4())
    customer_name: str
    issue: str
    status: TicketStatus = TicketStatus.OPEN
    response: str = ""
    created_at: str = str(datetime.now())