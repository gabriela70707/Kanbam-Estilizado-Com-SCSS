export function CadTarefa(){
    return(
        <form className="formulario">
            <h1 className="titulo">Cadastro de Tarefas</h1>
            <label>Descrição:</label>
            <input type="text" alt="Campo de descrição" required/>
            <label>Setor:</label>
            <input type="text" alt="Campo de setor" required/>

            <label>Usuário</label>
            <select>
                <option>Selecione o Usuario</option>
                <option>Leticia</option>
                <option>Arthur</option>
                <option>Paulo</option>
            </select>

            <label>Prioridade</label>
            <select>
                <option>Selecione a Prioridade</option>
                <option>Alta</option>
                <option>Media</option>
                <option>Baixa</option>
            </select>

            <button>Cadastrar</button>

        </form>
    )
}