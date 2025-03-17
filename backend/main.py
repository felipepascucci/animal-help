from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import animais, denuncias, voluntarios, veterinarios
from backend.database import engine, Base

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Inicializa o aplicativo FastAPI
app = FastAPI()

# Configura o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui os routers
app.include_router(animais.router)
app.include_router(denuncias.router)
app.include_router(voluntarios.router)
app.include_router(veterinarios.router)