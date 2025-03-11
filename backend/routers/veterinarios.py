from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database
from typing import List
from backend.database import get_db

router = APIRouter(prefix="/veterinarios", tags=["veterinarios"])

@router.post("/", response_model=schemas.Veterinario)
def create_veterinario(veterinario: schemas.VeterinarioCreate, db: Session = Depends(database.get_db)):
    return crud.create_veterinario(db=db, veterinario=veterinario)

@router.get("/", response_model=List[schemas.Veterinario])
def read_veterinarios(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    veterinarios = crud.get_veterinarios(db, skip=skip, limit=limit)
    return veterinarios

@router.get("/{veterinario_id}", response_model=schemas.Veterinario)
def read_veterinario(veterinario_id: int, db: Session = Depends(database.get_db)):
    db_veterinario = crud.get_veterinario(db, veterinario_id=veterinario_id)
    if db_veterinario is None:
        raise HTTPException(status_code=404, detail="Veterinario not found")
    return db_veterinario