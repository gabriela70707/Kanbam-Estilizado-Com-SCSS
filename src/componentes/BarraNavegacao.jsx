import { Link } from "react-router-dom";
import ButtonIntro from "./BotaoIntro";

export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ButtonIntro />
            <ul>
                <li><Link to= 'CadUsuario'>Cadastro de Usuário</Link></li>
                <li><Link to='CadTarefa'>Cadastro de Tarefa</Link></li>
                <li><Link to="/"> Gerenciamento de Tarefas</Link></li>
            </ul>
        </nav>
    );
}