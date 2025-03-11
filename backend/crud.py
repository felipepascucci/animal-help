from sqlalchemy.orm import Session
from . import models, schemas
from typing import List

def create_animal(db: Session, animal: schemas.AnimalCreate):
    db_animal = models.Animal(**animal.dict())
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal

def get_animais(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Animal).offset(skip).limit(limit).all()

def get_animal(db: Session, animal_id: int):
    return db.query(models.Animal).filter(models.Animal.id == animal_id).first()

def create_denuncia(db: Session, denuncia: schemas.DenunciaCreate):
    db_denuncia = models.Denuncia(**denuncia.dict())
    db.add(db_denuncia)
    db.commit()
    db.refresh(db_denuncia)
    return db_denuncia

def get_denuncias(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Denuncia).offset(skip).limit(limit).all()

def get_denuncia(db: Session, denuncia_id: int):
    return db.query(models.Denuncia).filter(models.Denuncia.id == denuncia_id).first()

def create_voluntario(db: Session, voluntario: schemas.VoluntarioCreate):
    db_voluntario = models.Voluntario(**voluntario.dict())
    db.add(db_voluntario)
    db.commit()
    db.refresh(db_voluntario)
    return db_voluntario

def get_voluntarios(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Voluntario).offset(skip).limit(limit).all()

def get_voluntario(db: Session, voluntario_id: int):
    return db.query(models.Voluntario).filter(models.Voluntario.id == voluntario_id).first()

def create_veterinario(db: Session, veterinario: schemas.VeterinarioCreate):
    db_veterinario = models.Veterinario(**veterinario.dict())
    db.add(db_veterinario)
    db.commit()
    db.refresh(db_veterinario)
    return db_veterinario

def get_veterinarios(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Veterinario).offset(skip).limit(limit).all()

def get_veterinario(db: Session, veterinario_id: int):
    return db.query(models.Veterinario).filter(models.Veterinario.id == veterinario_id).first()