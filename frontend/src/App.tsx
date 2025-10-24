import { useState, useEffect } from "react"
import TarefaItem from "./components/TarefaItem"

interface ITarefa {
  id: number,
  descricao: string,
  concluida: boolean,
}

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [novaDescricao, setNovaDescricao] = useState<string>('');

  useEffect(() => {
    const buscarTarefas = async () => {
      try {
        const resposta = await fetch('http://localhost:3001/tarefas');

        const dados = await resposta.json();

        setTarefas(dados);
      } catch (error) {
        console.error('Erro ao buscar dados: ', error);
      }
    }

    buscarTarefas();
  }, []);

  const handleAdicionarTarefa = async (evento: React.FormEvent) => {
    evento.preventDefault();

    if (!novaDescricao) {
      alert("Digite uma descrição!");
      return;
    }

    try {
      const resposta = await fetch('http://localhost:3001/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao: novaDescricao }),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const novaTarefaCriada: ITarefa = await resposta.json();

      setTarefas([...tarefas, novaTarefaCriada]);

      setNovaDescricao('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa: ', error);
    }
  }

  const handleDeletarTarefa = async (id: number) => {
    try {
      const resposta = await fetch(`http://localhost:3001/tarefas/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Erro ao deletar tarefa');
      }

      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa: ', error);
    }
  }

  const handleToggleConcluida = async (id: number, statusAtual: boolean) => {
    try {
      const resposta = await fetch(`http://localhost:3001/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concluida: !statusAtual }),
      });

      if (!resposta.ok) {
        throw new Error('Erro ao atualizar tarefa')
      }

      const tarefaAtualizada = await resposta.json();

      setTarefas(
        tarefas.map(tarefa => tarefa.id === id ? tarefaAtualizada : tarefa)
      )
    } catch(error){
      console.error('Erro ao atualizar tarefa: ', error);
    }
  }

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>
      <form onSubmit={handleAdicionarTarefa}>
        <input
          type="text"
          value={novaDescricao}
          onChange={(evento) => setNovaDescricao(evento.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {
          tarefas.map(tarefa => 
            <TarefaItem 
              key={tarefa.id}
              tarefa={tarefa}
              onDelete={handleDeletarTarefa}
              onToggle={handleToggleConcluida}
            />
          )
        }
      </ul>
    </div>
  )
}

export default App;
