# Gerenciador de Tarefas — Fullstack

Projeto de demonstração: um gerenciador de tarefas simples com backend em Node/Express + Prisma e frontend em React + Vite.

Este repositório contém duas pastas principais:

- `backend/` — API REST (TypeScript, Express, Prisma (SQLite))
- `frontend/` — cliente React + TypeScript + Vite + Tailwind

## Visão geral do fluxo

1.  O frontend (React) consome a API REST do backend para listar, criar, atualizar e remover tarefas.
2.  O backend persiste os dados usando Prisma em um banco SQLite por padrão (configurado via `prisma/schema.prisma`).

## Como executar localmente (passo-a-passo)

Pré-requisitos:

- Node.js (>= 18 recomendado)
- npm

Passos resumidos:

1.  Backend

```bash
cd backend
npm install
# criar .env com DATABASE_URL="file:./dev.db"
npx prisma generate
npx prisma migrate dev --name init
npx ts-node src/index.ts
```

2.  Frontend (em outra aba/terminal)

```bash
cd frontend
npm install
npm run dev
```

Abra o frontend no navegador (o Vite mostrará o endereço, por exemplo `http://localhost:5173` ou `http://localhost:5174`) e verifique a lista de tarefas.

## APIs principais (resumo)

- GET `/tarefas` — lista todas as tarefas
- POST `/tarefas` — cria tarefa (body: `{ descricao }`)
- PUT `/tarefas/:id` — atualiza tarefa (body: `{ descricao?, concluida? }`)
- DELETE `/tarefas/:id` — remove tarefa

## Observações

- O projeto foi preparado para desenvolvimento local. Para produção, adapte `DATABASE_URL` e processos de build/deploy.
- O frontend atualmente referencia `http://localhost:3001` diretamente em `src/App.tsx`; recomendo mover para variável de ambiente Vite (`VITE_API_URL`).

## Autor

**Swetony Ancelmo**
- GitHub: [Swetony Ancelmo](https://github.com/swetonyancelmo)
- LinkedIn: [Swetony Ancelmo](https://www.linkedin.com/in/swetony-ancelmo/?trk=opento_sprofile_details)