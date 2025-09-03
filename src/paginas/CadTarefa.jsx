import { useState, useEffect } from "react";
import axios from "axios";

export function CadTarefa() {
    const [descricao, setDescricao] = useState("");
    const [setor, setSetor] = useState("");
    const [usuario, setUsuario] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/usuarios")
            .then((res) => setUsuarios(res.data))
            .catch((err) => console.error("Erro ao buscar usuários:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const novaTarefa = {
            descricao_tarefa: descricao,
            nome_setor: setor,
            id_usuario: parseInt(usuario),
            prioridade: prioridade,
            status: "A Fazer",
            data_cadastro: new Date().toISOString().split("T")[0]
        };

        axios.post("http://localhost:8000/tarefas", novaTarefa)
            .then(() => alert("Tarefa cadastrada com sucesso!"))
            .catch((err) => console.error("Erro ao cadastrar tarefa:", err));
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}> {/* A função handleSubmit é chamada quando enviamos o formulario */}
            <h1 className="titulo">Cadastro de Tarefas</h1>

            <label>Descrição:</label>
            {/* 
            onChange = função que é chamada sempre que o valor do input muda.
            "e" representa o evento de mudança.
            e.target = o próprio elemento HTML que disparou o evento (neste caso, o <input>).
            e.target.value = o novo valor digitado pelo usuário.
            setDescricao(e.target.value) = atualiza o estado 'descricao' com esse novo valor.
            */}

            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

            <label>Setor:</label>
            <input type="text" value={setor} onChange={(e) => setSetor(e.target.value)} required />

            <label>Usuário</label>
            <select value={usuario} onChange={(e) => setUsuario(e.target.value)} required>
                <option value="">Selecione o Usuário</option>
                {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>{u.nome} - {u.email}</option>
                ))}
            </select>

            <label>Prioridade</label>
            <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required>
                <option value="">Selecione a Prioridade</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baixa">Baixa</option>
            </select>

            <button type="submit">Cadastrar</button>
        </form>
    );
}
