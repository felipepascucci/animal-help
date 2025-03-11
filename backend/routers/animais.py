from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database
from typing import List
from backend.database import get_db

router = APIRouter(prefix="/animais", tags=["animais"])

@router.post("/", response_model=schemas.Animal)
def create_animal(animal: schemas.AnimalCreate, db: Session = Depends(database.get_db)):
    return crud.create_animal(db=db, animal=animal)

@router.get("/", response_model=List[schemas.Animal])
def read_animais(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    animais = crud.get_animais(db, skip=skip, limit=limit)
    return animais

@router.get("/{animal_id}", response_model=schemas.Animal)
def read_animal(animal_id: int, db: Session = Depends(database.get_db)):
    db_animal = crud.get_animal(db, animal_id=animal_id)
    if db_animal is None:
        raise HTTPException(status_code=404, detail="Animal not found")
    return db_animal