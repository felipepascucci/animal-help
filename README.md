# Sistema de Adoção de Animais

Este é um sistema simples para gerenciar adoções de animais, denúncias de maus-tratos, cadastro de voluntários e veterinários. O projeto foi desenvolvido com **FastAPI** no backend e **HTML/CSS/JavaScript** no frontend.

---

## Funcionalidades

1. **Animais:**
   - Cadastrar animais para adoção.
   - Listar animais cadastrados.

2. **Denúncias:**
   - Registrar denúncias de maus-tratos ou abandono.
   - Listar denúncias registradas.

3. **Voluntários:**
   - Cadastrar voluntários dispostos a ajudar.
   - Listar voluntários cadastrados.

4. **Veterinários:**
   - Cadastrar veterinários disponíveis para atendimento.
   - Listar veterinários cadastrados.

---

## Como Executar o Projeto

### Pré-requisitos

- Python 3.7 ou superior.
- Pip (gerenciador de pacotes do Python).

### Passos para Configuração

1. **Clone o repositório:**

    ```sh
    git clone https://github.com/felipepascucci/animal-help.git
    ```

2. **Instale as dependências:**

    ```sh
    pip install fastapi uvicorn sqlalchemy pydantic
    ```

3. **Execute o backend:**

    ```sh
    python -m backend.main
    uvicorn backend.main:app --reload
    ```

    O backend estará disponível em:
    - API: [http://localhost:8000](http://localhost:8000)
    - Documentação interativa (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Execute o Frontend:**

    ```sh
    cd ../frontend
    python -m http.server 8080
    ```

    O frontend estará disponível em:
    - Página principal: [http://localhost:8080](http://localhost:8080)

---

## Estrutura do Projeto

```
animal-help-project/
│
├── backend/               # Código do backend (FastAPI)
│   ├── main.py            # Ponto de entrada do backend
│   ├── models.py          # Modelos do banco de dados
│   ├── schemas.py         # Schemas Pydantic para validação
│   ├── crud.py            # Operações CRUD
│   ├── database.py        # Configuração do banco de dados
│   └── routers/           # Rotas da API
│       ├── animais.py
│       ├── denuncias.py
│       ├── voluntarios.py
│       └── veterinarios.py
│
├── frontend/              # Código do frontend (HTML/CSS/JavaScript)
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos globais
│   ├── scripts.js         # Scripts globais
│   ├── animais/           # Página de animais
│   ├── denuncias/         # Página de denúncias
│   ├── veterinarios/      # Página de veterinários
│   └── voluntarios/       # Página de voluntários
│
└── README.md              # Este arquivo
```

---

## Observações

- **Banco de Dados:** O projeto usa SQLite como banco de dados. Todas as tabelas são droppadas automaticamente quando o sistema é encerrado (apenas em desenvolvimento).
- **CORS:** O backend está configurado para permitir requisições de qualquer origem. Em produção, ajuste as permissões conforme necessário.
