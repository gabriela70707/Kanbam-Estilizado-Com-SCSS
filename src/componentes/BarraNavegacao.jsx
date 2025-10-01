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
            
            <ul className={`menu ${menuAberto ? "ativo" : ""}`} role="navigation">
                <li><Link to='CadUsuario' role="menuitem">Cadastro de Usuário</Link></li>
                <li><Link to='CadTarefa' role="menuitem">Cadastro de Tarefa</Link></li>
                <li><Link to="/" role="menuitem">Gerenciamento de Tarefas</Link></li>
            </ul>

            <div 
                aria-label="Abrir menu de opções" //acessibilidade, melhora a compreensão do leitor de tela sobre o que é esse botão
                aria-haspopup="true" // indica que um botao abre um menu
                aria-expanded={menuAberto} //Esse atributo informa se o menu está aberto ou fechado. Ele deve refletir o estado de menuAberto.
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