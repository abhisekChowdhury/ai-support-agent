from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.models import Ticket, TicketCreate, TicketStatus
from backend.agent import process_ticket
import uuid
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# temporary in-memory storage for now
tickets = {}

@app.get("/")
def root():
    return {"message": "AI Support Agent is alive"}

@app.post("/tickets")
def create_ticket(data: TicketCreate):
    # step 1 - create the ticket
    ticket = Ticket(
        id=str(uuid.uuid4()),
        customer_name=data.customer_name,
        issue=data.issue,
        created_at=str(datetime.now())
    )

    # step 2 - process it through the AI agent
    result = process_ticket(ticket.issue)

    # step 3 - update ticket based on AI decision
    ticket.response = result["response"]
    ticket.status = TicketStatus.ESCALATED if result["escalated"] else TicketStatus.RESOLVED

    # step 4 - store and return it
    tickets[ticket.id] = ticket
    return ticket

@app.get("/tickets")
def get_tickets():
    return list(tickets.values())

@app.get("/tickets/{ticket_id}")
def get_ticket(ticket_id: str):
    ticket = tickets.get(ticket_id)
    if not ticket:
        return {"error": "Ticket not found"}
    return ticket