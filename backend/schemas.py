from pydantic import BaseModel
from typing import Optional


class AnimalBase(BaseModel):
    nome: str
    idade: int
    raca: str
    porte: str
    caracteristicas_fisicas: str
    historico_saude: str
    fotos: Optional[str]
    comportamento: str
    requisitos_adoção: str

class AnimalCreate(AnimalBase):
    pass

class Animal(AnimalBase):
    id: int

    class Config:
        orm_mode = True

class DenunciaBase(BaseModel):
    localizacao: str
    descricao: str
    fotos: Optional[str]
    anonimo: bool = True

class DenunciaCreate(DenunciaBase):
    pass

class Denuncia(DenunciaBase):
    id: int

    class Config:
        orm_mode = True

class VoluntarioBase(BaseModel):
    fotos: Optional[str]
    nome: str
    telefone: str
    endereco: str
    disponibilidade: str
    experiencia: str

class VoluntarioCreate(VoluntarioBase):
    pass

class Voluntario(VoluntarioBase):
    id: int

    class Config:
        orm_mode = True

class VeterinarioBase(BaseModel):
    fotos: Optional[str]
    nome: str
    telefone: str
    especialidade: str
    disponibilidade: str
    localizacao: str

class VeterinarioCreate(VeterinarioBase):
    pass

class Veterinario(VeterinarioBase):
    id: int

    class Config:
        orm_mode = True