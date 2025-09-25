import { render, screen, fireEvent, waitfor } from "@testing-library/react"
import { CadUsuario } from '../paginas/CadUsuario';
import { describe, it, expect } from "vitest";


describe("Cadastro de Usuário", ()=>{
    it("Renderiza os campos necessários", ()=> {
        render(<CadUsuario />);

        const nomeInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(nomeInput).toBeTruthy(); //essa exibição é real?
        expect(emailInput).toBeTruthy();
        expect(botao).toBeTruthy();
    });
})