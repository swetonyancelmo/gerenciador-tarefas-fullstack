import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());
const PORT = 3001;

interface ITarefa {
  id: number;
  descricao: string;
  concluida: boolean;
}

let tarefas: ITarefa[] = [];

// GET | url: /tarefas
app.get('/tarefas', (req: Request, res: Response) => {
  return res.status(200).json(tarefas);
});

// POST | url: /tarefas
app.post('/tarefas', (req: Request, res: Response) => {
  const { descricao } = req.body;

  if(!descricao) {
    return res.status(400).json({ message: "A descrição é obrigatória." })
  }

  const novaTarefa: ITarefa = {
    id: tarefas.length + 1,
    descricao: descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);

  return res.status(201).json(novaTarefa); // 201 CREATED
});

// UPDATE | url: /tarefas/id
app.put('/tarefas/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  const { descricao, concluida } = req.body;

  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === id);

  if (tarefaIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  const tarefaExistente = tarefas[tarefaIndex];

  const tarefaAtualizada: ITarefa = {
    id: tarefaExistente.id,
    descricao: descricao !== undefined ? descricao : tarefaExistente.descricao,
    concluida: concluida !== undefined ? concluida : tarefaExistente.concluida,
  };

  tarefas[tarefaIndex] = tarefaAtualizada;

  return res.status(200).json(tarefaAtualizada);
});

// DELETE | url: /tarefas/id
app.delete('/tarefas/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === id);

  if (tarefaIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }
  //               Index    Quantidade
  tarefas.splice(tarefaIndex, 1);

  return res.sendStatus(204);
});


app.listen(PORT, () => {
  console.log(`😏 Servidor iniciado na porta: ${PORT}`);
});