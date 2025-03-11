from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database
from typing import List
from backend.database import get_db

router = APIRouter(prefix="/voluntarios", tags=["voluntarios"])

@router.post("/", response_model=schemas.Voluntario)
def create_voluntario(voluntario: schemas.VoluntarioCreate, db: Session = Depends(database.get_db)):
    return crud.create_voluntario(db=db, voluntario=voluntario)

@router.get("/", response_model=List[schemas.Voluntario])
def read_voluntarios(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    voluntarios = crud.get_voluntarios(db, skip=skip, limit=limit)
    return voluntarios

@router.get("/{voluntario_id}", response_model=schemas.Voluntario)
def read_voluntario(voluntario_id: int, db: Session = Depends(database.get_db)):
    db_voluntario = crud.get_voluntario(db, voluntario_id=voluntario_id)
    if db_voluntario is None:
        raise HTTPException(status_code=404, detail="Voluntario not found")
    return db_voluntario