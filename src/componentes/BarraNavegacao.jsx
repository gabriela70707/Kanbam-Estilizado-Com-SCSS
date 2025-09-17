import { Link } from "react-router-dom";
import ButtonIntro from "./BotaoIntro";
import { useState } from "react";

export function BarraNavegacao(){
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return(
        <nav className="barra">
            <div className="logo">
                <ButtonIntro />
            </div>
            
            <ul className={`menu ${menuAberto ? "ativo" : ""}`}>
                <li><Link to='CadUsuario'>Cadastro de Usuário</Link></li>
                <li><Link to='CadTarefa'>Cadastro de Tarefa</Link></li>
                <li><Link to="/">Gerenciamento de Tarefas</Link></li>
            </ul>

            <div 
                className={`menu-hamburguer ${menuAberto ? "ativo" : ""}`} 
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}