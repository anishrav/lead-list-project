from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/leads/", response_model=schemas.Lead)
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    db_lead = crud.get_lead(db, lead_id=lead.id)
    if db_lead:
        raise HTTPException(status_code=400, detail="Task already in database")
    return crud.create_lead(db=db, lead=lead)


@app.get("/leads/", response_model=List[schemas.Lead])
def read_leads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    leads = crud.get_leads(db, skip=skip, limit=limit)
    return leads


@app.get("/leads/{lead_id}", response_model=schemas.Lead)
def read_lead(lead_id: str, db: Session = Depends(get_db)):
    db_lead = crud.get_lead(db, lead_id=lead_id)
    if db_lead is None:
        raise HTTPException(status_code=404, detail="lead not found")
    return db_lead


@app.delete("/leads/{lead_id}")
def delete_lead(lead_id: str, db: Session = Depends(get_db)):
    db_lead = crud.get_lead(db, lead_id=lead_id)
    if db_lead is None:
        raise HTTPException(status_code=404, detail="lead not found")
    crud.delete_lead(db, db_lead)
    return "Successfully deleted lead with id: " + lead_id