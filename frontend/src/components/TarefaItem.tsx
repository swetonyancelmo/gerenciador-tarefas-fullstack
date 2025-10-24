import React from "react";

interface ITarefa {
  id: number,
  descricao: string,
  concluida: boolean,
}

interface TarefaItemProps {
  tarefa: ITarefa; // O objeto da tarefa em si
  onDelete: (id: number) => void; // A função para deletar
  onToggle: (id: number, statusAtual: boolean) => void; // A função para atualizar
}

const TarefaItem: React.FC<TarefaItemProps> = ({ tarefa, onDelete, onToggle }) => {
  return (
    <li className="flex items-center justify-between gap-4 bg-white/3 hover:bg-white/5 transition-colors rounded-xl p-4 border border-white/6">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={() => onToggle(tarefa.id, tarefa.concluida)}
            className="w-5 h-5 rounded-md accent-pink-500"
          />
          <span className={`${tarefa.concluida ? 'line-through text-white/60' : 'text-white'} font-medium`}>{tarefa.descricao}</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDelete(tarefa.id)}
          className="text-sm text-white/80 bg-transparent px-3 py-2 rounded-md border border-white/6 hover:bg-red-600/30 transition-colors"
          aria-label={`Remover ${tarefa.descricao}`}
        >
          Remover
        </button>
      </div>
    </li>
  )
}

export default TarefaItem;