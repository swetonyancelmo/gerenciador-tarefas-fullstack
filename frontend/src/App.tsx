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

      if (!resposta.ok && resposta.status !== 204) {
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
    } catch (error) {
      console.error('Erro ao atualizar tarefa: ', error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-black via-brand-purple to-brand-pink p-6">
      <div className="relative w-full max-w-3xl">
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-purple-900/40 blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-pink-900/30 blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10 bg-glass border border-white/6 rounded-2xl p-6 shadow-2xl">
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Lista de Tarefas</h1>
            <p className="text-sm text-white/70 mt-1">Organize seu dia de forma elegante ✨</p>
          </header>

          <form onSubmit={handleAdicionarTarefa} className="flex gap-3 mb-6">
            <input
              className="flex-1 bg-white/6 placeholder-white/60 text-white rounded-lg px-4 py-3 focus:ring-0 input-focus transition-shadow duration-200 border border-white/6"
              type="text"
              placeholder="Adicionar nova tarefa..."
              value={novaDescricao}
              onChange={(evento) => setNovaDescricao(evento.target.value)}
            />
            <button
              type="submit"
              className="bg-brand-purple hover:bg-brand-pink text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-transform active:scale-95"
            >
              Adicionar
            </button>
          </form>

          <ul className="space-y-3">
            {tarefas.map(tarefa => (
              <TarefaItem
                key={tarefa.id}
                tarefa={tarefa}
                onDelete={handleDeletarTarefa}
                onToggle={handleToggleConcluida}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App;
