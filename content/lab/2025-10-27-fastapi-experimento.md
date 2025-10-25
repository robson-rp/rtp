Title: FastAPI: Experimento com Validação Automática
Date: 2025-10-27
Category: lab
Tags: python, fastapi, api, tutorial
Slug: fastapi-experimento

# FastAPI: Experimento com Validação Automática

Experimentando com FastAPI para criar validações elegantes usando Pydantic. O objetivo é construir uma API minimalista mas robusta.

## Setup inicial

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import Optional
import re

app = FastAPI(title="Minimal API", version="0.1.0")
```

## Modelo de dados

```python
class User(BaseModel):
    name: str
    email: str
    age: Optional[int] = None
    
    @validator('email')
    def validate_email(cls, v):
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(pattern, v):
            raise ValueError('Email inválido')
        return v
    
    @validator('age')
    def validate_age(cls, v):
        if v is not None and (v < 0 or v > 120):
            raise ValueError('Idade deve estar entre 0 e 120 anos')
        return v
```

## Endpoints simples

```python
@app.post("/users/")
async def create_user(user: User):
    # Simulação de salvar no banco
    return {"message": f"Usuário {user.name} criado com sucesso!"}

@app.get("/")
async def root():
    return {"message": "API minimalista funcionando"}
```

## Testando

```bash
# Instalar dependências
pip install fastapi uvicorn

# Executar
uvicorn main:app --reload

# Testar
curl -X POST "http://localhost:8000/users/" \
     -H "Content-Type: application/json" \
     -d '{"name": "Robson", "email": "robson@test.com", "age": 30}'
```

## Próximos passos

- [ ] Adicionar autenticação JWT
- [ ] Implementar CRUD completo  
- [ ] Configurar banco de dados
- [ ] Deploy com Docker

---

*FastAPI continua a impressionar pela simplicidade e poder.*