# Backend — Gerenciador de Tarefas

> API REST simples para gerenciar tarefas, construída com Node.js, Express e Prisma (SQLite).

## Visão geral

O backend expõe endpoints REST para criar, listar, atualizar e deletar tarefas. As tarefas são persistidas com Prisma + SQLite (configurado via `prisma/schema.prisma`). A API utiliza CORS para permitir chamadas do frontend em `localhost`.

Tecnologias principais:

- Node.js + Express
- TypeScript
- Prisma (SQLite)
- CORS

## Estrutura relevante

- `src/index.ts` — arquivo principal do servidor (rotas/handlers)
- `prisma/schema.prisma` — modelo de dados (Tarefa)
- `prisma/migrations/` — migrações geradas pelo Prisma

## Modelo de dados (Prisma)

```prisma
model Tarefa {
  id        Int      @id @default(autoincrement())
  descricao String
  concluida Boolean  @default(false)
  criadaEm  DateTime @default(now())
}
```

## Variáveis de ambiente

Crie um arquivo `.env` no diretório `backend/` com a variável `DATABASE_URL`. Exemplo para SQLite local:

```
DATABASE_URL="file:./dev.db"
```

## Instalação e execução (local)

1.  Instale dependências:

```bash
cd backend
npm install
```

2.  Gerar cliente Prisma (caso não esteja gerado):

```bash
npx prisma generate
```

3.  Executar migração para criar o banco (apenas na primeira vez):

```bash
npx prisma migrate dev --name init
```

4.  Rodar a API em desenvolvimento (usando ts-node):

```bash
npx ts-node src/index.ts
```

> Observação: o `package.json` do backend neste repositório não possui scripts de start prontos — você pode adicioná-los conforme desejar (por exemplo: `start`, `dev`).

## Endpoints

Base URL padrão: `http://localhost:3001`

1.  Listar tarefas

- Método: GET
- URL: `/tarefas`
- Retorno: 200 OK
- Corpo: array de objetos `Tarefa`

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "descricao": "Estudar TypeScript",
    "concluida": false,
    "criadaEm": "2025-10-24T..."
  }
]
```

2.  Criar tarefa

- Método: POST
- URL: `/tarefas`
- Body (JSON): `{ "descricao": "Texto da tarefa" }`
- Retorno: 201 Created com o objeto criado
- Validação: `descricao` é obrigatório

3.  Atualizar tarefa

- Método: PUT
- URL: `/tarefas/:id`
- Body (JSON): `{ "descricao": "novo texto", "concluida": true }` (pode enviar parcial)
- Retorno: 200 OK com objeto atualizado
- Erros: 400 para ID inválido, 404 se não encontrada

4.  Deletar tarefa

- Método: DELETE
- URL: `/tarefas/:id`
- Retorno: 204 No Content em sucesso
- Erros: 400 para ID inválido, 404 se não encontrada

## Observações e dicas

- A API está preparada para uso local e usa SQLite por padrão. Para usar outro banco, atualize `prisma/schema.prisma` e `DATABASE_URL` conforme a documentação do Prisma.
- Se for iniciar a aplicação em produção, recomendo adicionar scripts npm (`dev`, `start`, `build`) e usar `tsc` para compilar antes de rodar com `node`.
- Habilite logs adicionais ou use um process manager (pm2) para deploy.

