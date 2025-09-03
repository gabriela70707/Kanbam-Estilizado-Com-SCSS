export function Coluna({ titulo, tarefas }) {

    return (
        <section className="coluna">
            <h2>{titulo}</h2>
            <ul>
                {tarefas.map((tarefa) => (
                    <li key={tarefa.id}>{tarefa.descricao_tarefa} - {tarefa.status} </li>
                ))}
            </ul>
        </section>
    );
}