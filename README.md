# AI Customer Support Agent

A full stack AI-powered customer support system built with FastAPI, React, and Cohere API.

## Tech Stack
- **Backend:** FastAPI (Python)
- **AI Layer:** Cohere API (command-r-plus)
- **Frontend:** React + TypeScript (coming soon)
- **Storage:** In-memory (database coming soon)

## Project Structure
ai-support-agent/
├── backend/
│   ├── main.py          # FastAPI app, route handlers
│   ├── agent.py         # AI brain, Cohere integration
│   ├── models.py        # Ticket data models
│   └── queue_worker.py  # Message queue (coming soon)
├── frontend/            # React app (coming soon)
└── README.md

## What's Been Built

### ✅ Phase 1 - Backend & AI Agent
- [x] FastAPI project setup with virtual environment
- [x] Ticket model with status tracking (open, in_progress, escalated, resolved)
- [x] REST API endpoints
  - POST /tickets — create a ticket, auto-process with AI
  - GET /tickets — retrieve all tickets
  - GET /tickets/{ticket_id} — retrieve a single ticket
- [x] AI agent wired into ticket creation
  - Resolves simple issues automatically
  - Escalates fraud, legal, and complex issues
  - System prompt controls AI behavior

## What's Coming Next

### ✅ Phase 2 - React Frontend
- [x] Chat interface for submitting tickets
- [x] Real time AI response display
- [x] Ticket status indicators (resolved vs escalated)

### 🔲 Phase 3 - Database
- [ ] PostgreSQL integration
- [ ] Persistent ticket storage

### 🔲 Phase 4 - Distributed Systems
- [ ] Message queue (Redis)
- [ ] Multiple backend workers
- [ ] Load balancer

### 🔲 Phase 5 - Polish
- [ ] Authentication
- [ ] Admin dashboard
- [ ] Deployment

## Running Locally

### Backend
```bash
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn cohere python-dotenv
uvicorn backend.main:app --reload
```

### Environment Variables
Create a `.env` file in the root:
COHERE_API_KEY=your_key_here

### API Docs
Visit `http://localhost:8000/docs` for interactive API documentation.