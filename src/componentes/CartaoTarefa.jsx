import { useState } from "react";
import { ModalEditarTarefa } from "./ModalEditarTarefa";
import { ModalDetalhes } from "./ModalDetalhes"
// biblioteca que permite o drag and drop - items que são movimentados
import { useDraggable } from "@dnd-kit/core";

//criando um portal para redenrizar o modal diretamente no body e nao no card
import { createPortal } from "react-dom";

export function TarefaCard({ tarefa, onAtualizarTarefa, onDeletarTarefa }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarDetalhe, setMostrarDetalhe] = useState(false);
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  // inserindo o controle atual do meu card
  //setNodeRef: é o que liga o elemento arrastavel, ao DOM ele que dá acesso ao elemento
  // listerners: é o fofoqueiro ele fica escutando quando a ação começa e termina
  //attributes: é o que di que pode ser movimentados pelo teclado ou mouse
  // transform: é o que da a sensação de arrasto
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.id,
  })
  // ele controla as posições do plano cartesiano. Ele pega as coordenadas X e Y e vai 
  // dar a impressão ao usuário do movimento do mouse
  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
      zIndex: 1000, // evitar que a tarefa passe por de tras das colunas
      position: "absolute", // deixa o card menorzinho quando ele esta sendo arrastado
    }
    : undefined;


  const handleStatusChange = (novoStatus) => {
    onAtualizarTarefa(tarefa.id, { status: novoStatus });
    setMostrarOpcoes(false);
  }

  const handleDeletar = () => {
    if (window.confirm(`Tem certeza que deseja excluir a tarefa "${tarefa.titulo}"?`)) {
      onDeletarTarefa(tarefa.id);
    }
    setMostrarOpcoes(false);
  };

  return (
    <>
      <div className="tarefa" ref={setNodeRef} style={style}>
        {mostrarDetalhe && createPortal(
          <ModalDetalhes
            onClose={() => setMostrarDetalhe(false)}
            tarefa={tarefa}
          />,
          document.body // renderizar o elemento diretamente no body para evitar bugs na tela
        )}
        <div className="tarefa-cabecalho">
          <h3>{tarefa.titulo}</h3>
          <div className="tarefa-acoes">
            <button
              className="botao-opcoes"
              onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
              aria-label="Abrir menu de opções" //acessibilidade, melhora a compreensão do leitor de tela sobre o que é esse botão
              aria-haspopup="true"
              aria-expanded={mostrarOpcoes}
            >
              ⋮
            </button>
            {mostrarOpcoes && (
              <div className="menu-opcoes" role="menu">
                <button role="menuitem" onClick={() => setMostrarModal(true)}>Editar</button>
                <button role="menuitem" onClick={handleDeletar}> Excluir </button>
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
        <div className="opcoes-card">
          
          <div className="drag-handle" 
            role="button"
            tabIndex={0}
            aria-label="Arrastar tarefa" 
            {...listeners} 
            {...attributes}>
              ⠿ clique aqui para arrastar
          </div> {/*Botao para arrastar a tarefa*/}

          <button className="detalhes" onClick={() => setMostrarDetalhe(!mostrarDetalhe)}>Ver detalhes</button> {/*Botao para arrastar a tarefa*/}
        </div>
      </div>

      {mostrarModal && createPortal(
        <ModalEditarTarefa
          tarefa={tarefa}
          onClose={() => setMostrarModal(false)}
          onSalvar={(dadosAtualizados) => {
            onAtualizarTarefa(tarefa.id, dadosAtualizados);
            setMostrarModal(false);
          }}
        />,
        document.body // renderizar o elemento diretamente no body para evitar bugs na tela
      )}
    </>
  );
}