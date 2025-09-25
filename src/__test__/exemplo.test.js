// arquivo que ira gerenciar os testes automatizados

import { describe, it, expect } from "vitest";

// Meus casos de teste
describe("matematica basica", () => {
    // cada IT é um cenário de teste
    it("soma 2 + 2", ()=>{
        expect(2+2).toBe(4);
    })

    it("multiplicação 3*3", ()=>{
        expect(3 * 3).toBe(9);
    })
})

//OBS::
//Para que isso funcione é neessário alterar o vite.config.js e o package.json
// A alteração lá deve ser a adição das linhas que estão comentadas no arquivo :)