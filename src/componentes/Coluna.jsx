import { useState } from "react";
import { TarefaCard } from "./CartaoTarefa";

export function Coluna({ titulo, tarefas, cor, onAtualizarTarefa, onDeletarTarefa }) {
    return (
        <div className={`coluna ${tarefas.length === 0 ? 'coluna-vazia' : ''}`}>
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