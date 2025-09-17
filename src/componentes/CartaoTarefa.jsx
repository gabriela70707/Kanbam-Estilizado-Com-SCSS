import { useState } from "react";
import { ModalEditarTarefa } from "./ModalEditarTarefa";

export function TarefaCard({ tarefa, onAtualizarTarefa, onDeletarTarefa }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const handleStatusChange = (novoStatus) => {
    onAtualizarTarefa(tarefa.id, { status: novoStatus });
    setMostrarOpcoes(false);
  };

  const handleDeletar = () => {
    if (window.confirm(`Tem certeza que deseja excluir a tarefa "${tarefa.titulo}"?`)) {
      onDeletarTarefa(tarefa.id);
    }
    setMostrarOpcoes(false);
  };

  return (
    <>
      <div className="tarefa">
        <div className="tarefa-cabecalho">
          <h3>{tarefa.titulo}</h3>
          <div className="tarefa-acoes">
            <button 
              className="botao-opcoes"
              onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
            >
              ⋮
            </button>
            {mostrarOpcoes && (
              <div className="menu-opcoes">
                <button onClick={() => setMostrarModal(true)}>
                  ✏️ Editar
                </button>
                <button onClick={handleDeletar}>
                  🗑️ Excluir
                </button>
                <div className="menu-divisor"></div>
                <button onClick={() => handleStatusChange("A Fazer")}>
                  ↪️ Mover para A Fazer
                </button>
                <button onClick={() => handleStatusChange("Fazendo")}>
                  🔄 Mover para Fazendo
                </button>
                <button onClick={() => handleStatusChange("Pronta")}>
                  ✅ Mover para Pronta
                </button>
              </div>
            )}
          </div>
        </div>
        <p>{tarefa.descricao}</p>
        <div className="meta">
          <span>#{tarefa.id}</span>
          {tarefa.prioridade && (
            <span className={`prioridade ${tarefa.prioridade.toLowerCase()}`}>
              {tarefa.prioridade}
            </span>
          )}
        </div>
      </div>

      {mostrarModal && (
        <ModalEditarTarefa
          tarefa={tarefa}
          onClose={() => setMostrarModal(false)}
          onSalvar={(dadosAtualizados) => {
            onAtualizarTarefa(tarefa.id, dadosAtualizados);
            setMostrarModal(false);
          }}
        />
      )}
    </>
  );
}