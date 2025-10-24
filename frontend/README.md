# Frontend — Gerenciador de Tarefas

Aplicação cliente construída com React + TypeScript e Vite. Estilização com Tailwind CSS (integração via plugin `@tailwindcss/vite`). O frontend consome a API do backend para listar, criar, atualizar e deletar tarefas.

## Tecnologias

- React 19 + TypeScript
- Vite (dev server / build)
- Tailwind CSS (via `@tailwindcss/vite` plugin)
- Fetch API para comunicação com o backend

## Estrutura principal

- `src/main.tsx` — bootstrap da aplicação (importa `index.css`)
- `src/index.css` — import do Tailwind e estilos globais
- `src/App.tsx` — componente principal e lógica de listagem/CRUD
- `src/components/TarefaItem.tsx` — componente que renderiza cada tarefa

## Configuração / Execução

1.  Instalar dependências:

```bash
cd frontend
npm install
```

2.  Rodar em modo desenvolvimento:

```bash
npm run dev
```

3.  Build para produção:

```bash
npm run build
npm run preview
```

## Comunicação com o backend

O frontend atualmente usa a URL fixa `http://localhost:3001` (ver `src/App.tsx`) para chamar os endpoints do backend. Se desejar alterar, você pode:

- substituir as chamadas `fetch('http://localhost:3001/tarefas')` por uma variável de ambiente;
- ou criar um arquivo `.env` e usar `import.meta.env.VITE_API_URL` (Vite) para definir a base da API.

Exemplo (usar variável):

```ts
const API = import.meta.env.VITE_API_URL || "http://localhost:3001";
const resposta = await fetch(`${API}/tarefas`);
```

## Componentes e comportamento

- `App.tsx`:

  - busca tarefas em `useEffect` ao montar
  - `handleAdicionarTarefa` faz POST `/tarefas`
  - `handleDeletarTarefa` faz DELETE `/tarefas/:id`
  - `handleToggleConcluida` faz PUT `/tarefas/:id` alterando o campo `concluida`

- `TarefaItem.tsx`:
  - recebe `tarefa`, `onDelete`, `onToggle`
  - renderiza checkbox, descrição e botão remover

## Tailwind e build

- O projeto usa o plugin `@tailwindcss/vite` configurado em `vite.config.ts`.
- O arquivo `src/index.css` importa o Tailwind via `@import "tailwindcss";` (processado pelo plugin).
- Caso os estilos não apareçam, verifique se o dev server do Vite está rodando (`npm run dev`) e se `src/main.tsx` importa `./index.css`.
