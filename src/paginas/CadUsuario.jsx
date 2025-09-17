import axios from "axios";
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaCadUsuario = z.object({
    nome: z.string()
        .regex(/^(?!.* {2})[A-Za-zÁ-ÿ]+(?: [A-Za-zÁ-ÿ]+)*$/, {
            message: "Digite apenas letras, e coloque espaços somente onde necessário"
        })
        .min(5, "Informe um nome válido")
        .max(50, "Informe no máximo 50 caracteres"),
    email: z.string()
        .min(9, "Infome ao menos 9 digitos")
        .max(50, "Informe até 50 caracteres")
        .email("Informe um email válido")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
            message: "Email inválido"
        }),
});

export function CadUsuario() {
    const {
        register,
        handleSubmit,
        formState: { errors },
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
        <section className="container">
            <form className="formulario" onSubmit={handleSubmit(obterDados)}>
            <h1 className="titulo">Cadastro de Usuário</h1>
            <p className="subtitulo">Preencha os dados abaixo para criar sua conta</p>

                <div className="campo">
                    <label>Nome:</label>
                    <input
                        placeholder="Ex: Mateus Martins"
                        type="text"
                        {...register("nome")}
                    />
                    {errors.nome && <p className="erro">{errors.nome.message}</p>}
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Ex: mateusmartins07@gmail.com"
                        {...register("email")}
                    />
                    {errors.email && <p className="erro">{errors.email.message}</p>}
                </div>

                <button type="submit">Cadastrar</button>
            </form>
        </section>
    );
}