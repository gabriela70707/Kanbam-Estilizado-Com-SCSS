import { useState } from "react";

export function ModalEditarTarefa({ tarefa, onClose, onSalvar }) {
    const [formData, setFormData] = useState({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao_tarefa || "",
        prioridade: tarefa.prioridade || "Media",
        status: tarefa.status, 
        nome_setor: tarefa.nome_setor || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.titulo.trim()) {
            alert("O título é obrigatório.");
            return;
        }

        onSalvar(formData);
    }; 


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
                <div className="modal-cabecalho">
                    <h2>Editar Tarefa</h2>
                    <button className="modal-fechar" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-formulario">
                    <div className="campo">
                        <label>Título:</label>
                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label>Setor:</label>
                        <input
                            type="text"
                            name="nome_setor"
                            value={formData.nome_setor || ""}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="campo">
                        <label>Descrição:</label>
                        <textarea
                            name="descricao_tarefa"
                            value={formData.descricao_tarefa}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>

                    <div className="campo">
                        <label>Prioridade:</label>
                        <select
                            name="prioridade"
                            value={formData.prioridade}
                            onChange={handleChange}
                        >
                            <option value="Alta">Alta</option>
                            <option value="Media">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="A Fazer">A Fazer</option>
                            <option value="Fazendo">Fazendo</option>
                            <option value="Pronta">Pronta</option>
                        </select>
                    </div>


                    <div className="modal-botoes">
                        <button type="button" onClick={onClose} className="botao-secundario">
                            Cancelar
                        </button>
                        <button type="submit" className="botao-primario">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}