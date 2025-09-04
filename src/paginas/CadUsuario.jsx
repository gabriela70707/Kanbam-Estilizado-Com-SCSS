import axios from "axios";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaCadUsuario = z.object({
    nome: z.string()
        .regex(/^(?!.* {2})[A-Za-zÁ-ÿ]+(?: [A-Za-zÁ-ÿ]+)*$/, {
            message: "Digite apenas letras, e coloque espaços somente onde necessário"
            //^(?!.* {2}) → nega a presença de dois espaços consecutivos em qualquer lugar da string.
            //[A-Za-zÁ-ÿ]+ → exige que a primeira palavra tenha apenas letras
            //$ → garante que a verificação seja feita até o fim da string.
        })

        .min(5, "Informe um nome válido")
        .max(50, "Informe no máximo 50 caracteres"),
    email: z.string()
        .min(9, "Infome ao menos 9 digitos")
        .max(50, "Informe até 50 caracteres")
        .email("Informe um email válido")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{
            message:"Email inválido"
        }),
});

export function CadUsuario() {
    const {
        register, // registra para mim o que o usuário inputar
        handleSubmit, // no momento em que ele submeter o formulario
        formState: { errors }, // e se ele errar guarda os erros nos errors
        reset
    } = useForm({ resolver: zodResolver(schemaCadUsuario) });

    async function obterDados(data) {
        console.log("Dados recebidos", data);

        try {
            await axios.post("http://localhost:8000/usuarios", data);
            alert("Usuário cadastrado com sucesso")
            reset();
        }

        catch (error) {
            alert("Erro ao cadastrar usuário");
            console.error("Vish, o erro ta na frente do monitor", error);
        }

    }

    return (
        <form className="formulario" onSubmit={handleSubmit(obterDados)}>
            <h1 className="titulo">Cadastro de Usuário</h1>

            <label>Nome:</label>
            <input type="text" {...register("nome")} />
            {errors.nome && <p className="erro">{errors.nome.message}</p>}

            <label>Email:</label>
            <input type="email" {...register("email")} />
            {errors.email && <p className="erro">{errors.email.message}</p>}

            <button type="submit">Cadastrar</button>
        </form>
    );


}