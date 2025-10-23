import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const PORT = 3001;

// GET | url: /tarefas
app.get('/tarefas', async (req: Request, res: Response) => {
  const todasTarefa = await prisma.tarefa.findMany();
  return res.status(200).json(todasTarefa);
});

// POST | url: /tarefas
app.post('/tarefas', async (req: Request, res: Response) => {
  const { descricao } = req.body;

  if(!descricao) {
    return res.status(400).json({ message: "A descrição é obrigatória." })
  }

  const novaTarefa = await prisma.tarefa.create({
    data: {
      descricao: descricao
    },
  });
  return res.status(201).json(novaTarefa);
});

// UPDATE | url: /tarefas/id
app.put('/tarefas/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  const { descricao, concluida } = req.body;

  try {
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: id },
      data: {
        descricao: descricao,
        concluida: concluida,
      },
    });
    return res.status(200).json(tarefaAtualizada);
  } catch(error){
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }
});

// DELETE | url: /tarefas/id
app.delete('/tarefas/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    await prisma.tarefa.delete({
      where: { id: id },
    });
    return res.sendStatus(204);
  } catch (error){
    return res.status(404).json({ message: "Tarefa não encontrada." });
  }
});


app.listen(PORT, () => {
  console.log(`😏 Servidor iniciado na porta: ${PORT}`);
});