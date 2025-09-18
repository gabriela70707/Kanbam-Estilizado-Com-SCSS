import { useState, useEffect } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";

export function Quadro() {
  const [todasTarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = () => {
    axios.get("http://127.0.0.1:8000/tarefas")
      .then((res) => {
        setTarefas(res.data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar tarefas", err);
        setCarregando(false);
      });
  };

  const handleAtualizarTarefa = async (id, dadosAtualizados) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/tarefas/${id}/status`, dadosAtualizados);
      carregarTarefas();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      alert("Erro ao atualizar tarefa");
    }
  };

  const handleDeletarTarefa = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tarefas/${id}`);
      carregarTarefas();
      alert("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Erro ao excluir tarefa");
    }
  };

  const tarefasAFazer = todasTarefas.filter((t) => t.status === "A Fazer");
  const tarefasEmAndamento = todasTarefas.filter((t) => t.status === "Fazendo");
  const tarefasFinalizadas = todasTarefas.filter((t) => t.status === "Pronta");

  if (carregando) {
    return (
      <main className="quadro">
        <div className="carregando">
          <div className="spinner"></div>
          <p>Carregando tarefas...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="quadro">
      <h1>Quadro de Tarefas</h1>
      <div className="colunas">
        <Coluna
          titulo="A Fazer"
          tarefas={tarefasAFazer}
          onAtualizarTarefa={handleAtualizarTarefa}
          onDeletarTarefa={handleDeletarTarefa}
        />
        <Coluna
          titulo="Em Andamento"
          tarefas={tarefasEmAndamento}
          onAtualizarTarefa={handleAtualizarTarefa}
          onDeletarTarefa={handleDeletarTarefa}
        />
        <Coluna
          titulo="Finalizado"
          tarefas={tarefasFinalizadas}
          onAtualizarTarefa={handleAtualizarTarefa}
          onDeletarTarefa={handleDeletarTarefa}
        />
      </div>
    </main>
  );
}