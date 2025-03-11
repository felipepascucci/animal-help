from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import atexit

# Configuração do banco de dados SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./projeto_adoção_animais.db"

# Criação do engine do SQLAlchemy
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Fábrica de sessões
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()

# Função para dropar todas as tabelas
def drop_all_tables():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)

# Registrar a função para ser chamada ao encerrar o sistema
atexit.register(drop_all_tables)

# Função para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()