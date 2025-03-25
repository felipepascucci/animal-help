from sqlalchemy import Column, Integer, String, Text, Boolean
from .database import Base

class Animal(Base):
    __tablename__ = "animais"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    idade = Column(Integer)
    raca = Column(String)
    porte = Column(String)
    caracteristicas_fisicas = Column(Text)
    historico_saude = Column(Text)
    fotos = Column(String, nullable=True)
    comportamento = Column(Text)
    requisitos_adoção = Column(Text)

class Denuncia(Base):
    __tablename__ = "denuncias"

    id = Column(Integer, primary_key=True, index=True)
    localizacao = Column(String)
    descricao = Column(Text)
    fotos = Column(String, nullable=True)
    anonimo = Column(Boolean, default=True)

class Voluntario(Base):
    __tablename__ = "voluntarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    telefone = Column(String)
    endereco = Column(String)
    disponibilidade = Column(String)
    experiencia = Column(Text)

class Veterinario(Base):
    __tablename__ = "veterinarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    telefone = Column(String)
    especialidade = Column(String)
    disponibilidade = Column(String)
    localizacao = Column(String)