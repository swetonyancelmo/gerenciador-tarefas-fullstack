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
    <li>
      <input
        type="checkbox"
        checked={tarefa.concluida}
        onChange={() => onToggle(tarefa.id, tarefa.concluida)}
      />
      <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
        {tarefa.descricao}
      </span>

      <button onClick={() => onDelete(tarefa.id)} style={{ marginLeft: '10px' }}>
        Remover
      </button>
    </li>
  )
}

export default TarefaItem;