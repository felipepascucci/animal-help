# 🐾 Animal Help - Plataforma de Adoção e Resgate de Animais

Este projeto tem como objetivo facilitar a adoção e o resgate de animais, conectando pessoas interessadas em adotar com organizações e voluntários que resgatam animais.

## 🚀 Funcionalidades

- Cadastro de animais para adoção.
- Registro de denúncias de maus-tratos e abandono.
- Listagem de animais disponíveis.
- Sistema de gerenciamento para organizações e voluntários.

## 🛠 Como Executar o Projeto

### ✅ Requisitos

- Python 3.7 ou superior.
- Pip para gerenciar pacotes.
- Visual Studio Code, ou qualquer outro editor de código-fonte com acesso ao terminal de sua preferência 😊

### 📌 Instalação e Execução

1. **Clone o repositório a partir do terminal no Visual Studio:**

   Utilize o atalho Ctrl + ` para abrir o terminal

   ```sh
   git clone https://github.com/felipepascucci/animal-help.git
   ```

2. **Instale as dependências do backend através do terminal utilizando o gerenciador de pacotes do pyhton, PIP:**

   ```sh
   pip install -r requirements.txt
   ```

3. **Execute a API (backend):**

   ```sh
   python -m backend.main
   ```

   ```sh
   uvicorn backend.main:app --reload
   ```

   &#x20;  &#x20;

   A API estará disponível em:

   - API: [http\://localhost:8000](http\://localhost:8000)
   - Documentação interativa (Swagger): [http\://localhost:8000/docs](http\://localhost:8000/docs)

4. **Instale as dependências do frontend através do terminal utilizando o npm:**

   ```sh
   cd frontend
   ```

   ```sh
   npm install --force
   ```

5. **Inicie a aplicação (frontend):**
   ```sh
   npm run dev
   ```

   &#x20;  &#x20;

   O frontend estará disponível em:

   - Página principal: [http\://localhost:3000](http\://localhost:3000)
