import { useState, useEffect } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";


export function Quadro() {

  const [todasTarefas, setTarefas] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/tarefas")
      .then((res) => setTarefas(res.data))
      .catch((err) => console.error("Erro ao buscar tarefas", err));
  }, [])

  const tarefasAFazer = todasTarefas.filter((t) => t.status === "A Fazer");
  const tarefasEmAndamento = todasTarefas.filter((t) => t.status === "Fazendo");
  const tarefasFinalizadas = todasTarefas.filter((t) => t.status === "Pronta");

  return (
    <main className="quadro">
      <h1>✨Tarefas ✨</h1>
      <Coluna titulo="A Fazer" tarefas={tarefasAFazer} />
      <Coluna titulo="Em Andamento" tarefas={tarefasEmAndamento} />
      <Coluna titulo="Finalizado" tarefas={tarefasFinalizadas} />
    </main>
  );
}