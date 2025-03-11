from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database
from typing import List
from backend.database import get_db

router = APIRouter(prefix="/denuncias", tags=["denuncias"])

@router.post("/", response_model=schemas.Denuncia)
def create_denuncia(denuncia: schemas.DenunciaCreate, db: Session = Depends(database.get_db)):
    return crud.create_denuncia(db=db, denuncia=denuncia)

@router.get("/", response_model=List[schemas.Denuncia])
def read_denuncias(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    denuncias = crud.get_denuncias(db, skip=skip, limit=limit)
    return denuncias

@router.get("/{denuncia_id}", response_model=schemas.Denuncia)
def read_denuncia(denuncia_id: int, db: Session = Depends(database.get_db)):
    db_denuncia = crud.get_denuncia(db, denuncia_id=denuncia_id)
    if db_denuncia is None:
        raise HTTPException(status_code=404, detail="Denuncia not found")
    return db_denuncia