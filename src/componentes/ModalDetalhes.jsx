export function ModalDetalhes({ tarefa, onClose }) {
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-detalhe-conteudo">
                <div className="modal-cabecalho">
                    <h2>Detalhes da Tarefa</h2>
                    <button className="modal-fechar" onClick={onClose}>×</button>
                </div>
                <p><strong>Titulo: </strong>{tarefa.titulo}</p>
                <p><strong>Descrição: </strong>{tarefa.descricao_tarefa}</p>
                <p><strong>Setor responsável: </strong>{tarefa.nome_setor}</p>
                <p><strong>Data do Cadastro da Tarefa: </strong>{new Date(tarefa.data_cadastro).toLocaleDateString("pt-BR")}</p> {/*convertendo data para o formato BR*/}

            </div>
        </div>
    );
}