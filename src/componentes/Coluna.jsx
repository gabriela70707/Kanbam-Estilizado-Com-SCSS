import { useState } from "react";
import { TarefaCard } from "./CartaoTarefa";
// uso da biblioteca de Drag and Drop - aqui é o local de soltura
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ titulo, id, tarefas, onAtualizarTarefa, onDeletarTarefa }) {
    //faço o uso da referencia do item no drag and drop
    const {setNodeRef} = useDroppable({ id });
    return (
        <div className={`coluna ${tarefas.length === 0 ? 'coluna-vazia' : ''}` } ref = { setNodeRef }>
            <h2>
                {titulo}
                <span className="contador">{tarefas.length}</span>
            </h2>
            <div className="tarefas">
                {tarefas.length > 0 ? (
                    tarefas.map(tarefa => (
                        <TarefaCard
                            key={tarefa.id}
                            tarefa={tarefa}
                            onAtualizarTarefa={onAtualizarTarefa}
                            onDeletarTarefa={onDeletarTarefa}
                        />
                    ))
                ) : (
                    <p>Nenhuma tarefa nesta coluna</p>
                )}
            </div>
        </div>
    );
}