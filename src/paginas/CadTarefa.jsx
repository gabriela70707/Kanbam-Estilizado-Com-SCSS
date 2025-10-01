import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

export function CadTarefa() {
    const [descricao, setDescricao] = useState("");
    const [setor, setSetor] = useState("");
    const [usuario, setUsuario] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    //Para fazer o contador de caracteres
    const [descricaoLength, setDescricaoLength] = useState(0);
    const [setorLength, setSetorLength] = useState(0);


    //validações
    const schemaCadTarefa = z.object({

        titulo: z.string().trim().min(1, "Título é obrigatório").max(100, "Máximo de 100 caracteres")
            .regex(/^(?!.* {2}).*$/, {
                message: "Coloque espaços somente onde necessário"
                //^(?!.* {2}) → nega a presença de dois espaços consecutivos em qualquer lugar da string.
                //$ → garante que a verificação seja feita até o fim da string.
            }),

        descricao: z.string().trim().min(5, "Mínimo de 5 caracteres (sem contar espaços)").max(210, "Máximo de 210 caracteres")
            .regex(/^(?!.* {2}).*$/, {
                message: "Coloque espaços somente onde necessário"
                //^(?!.* {2}) → nega a presença de dois espaços consecutivos em qualquer lugar da string.
                //$ → garante que a verificação seja feita até o fim da string.
            }),
        setor: z.string().trim().min(1, "Setor é obrigatório e não pode conter apenas espaços").max(30, "Máximo de 30 caracteres")
            .regex(/^(?!.* {2}).*$/, { //permite qualquer conteudo
                message: "Coloque espaços somente onde necessário"
                //^(?!.* {2}) → nega a presença de dois espaços consecutivos em qualquer lugar da string.
                //$ → garante que a verificação seja feita até o fim da string.
            }),
        usuario: z.string().min(1, "Usuário é obrigatório"),
        prioridade: z.string().min(1, "Prioridade é obrigatória"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schemaCadTarefa),
    })


    // Buscar os usuarios registrados
    useEffect(() => {
        axios.get("http://localhost:8000/usuarios")
            .then((res) => setUsuarios(res.data))
            .catch((err) => console.error("Erro ao buscar usuários:", err));
    }, []);



    const onSubmit = (data) => {
        const novaTarefa = {
            titulo: data.titulo,
            descricao_tarefa: data.descricao,
            nome_setor: data.setor,
            id_usuario: parseInt(data.usuario),
            prioridade: data.prioridade,
            status: "A Fazer",
            data_cadastro: new Date().toISOString().split("T")[0],
        };

        axios
            .post("http://localhost:8000/tarefas", novaTarefa)
            .then(() => alert("Tarefa cadastrada com sucesso!"))
            .catch((err) => console.error("Erro ao cadastrar tarefa:", err));
    };


    return (
        <section className="container">
            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>

                <h1 className="titulo">Cadastro de Tarefas</h1>
                <p className="subtitulo">Preencha os dados abaixo para criar as Tarefas</p>

                <div className="campo">
                    <label htmlFor="titulo">Título:</label>
                    <input id="titulo"
                        type="text"
                        placeholder="Insira o título da tarefa"
                        {...register("titulo")}
                    />
                    {errors.titulo && <span>{errors.titulo.message}</span>}
                </div>


                <div className="campo">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea id="descricao"
                        placeholder="Insira a descrição da Tarefa"
                        {...register("descricao")}
                        onChange={(e) => {
                            setDescricaoLength(e.target.value.length);
                            e.target.style.height = "auto"; {/*Reseta a altura do campo de texto para o valor mínimo necessário.*/ }
                            e.target.style.height = `${e.target.scrollHeight}px`; {/*Define a altura do campo de texto com base na quantidade de conteúdo que ele precisa exibir.*/ }
                        }}
                        rows={1}
                        style={{ resize: "none", overflow: "hidden", width: "100%" }}
                    />
                    <div style={{ fontSize: "0.9rem", color: descricaoLength > 210 ? "red" : "dark gray" }}>
                        {descricaoLength}/210 caracteres {/*Demonstração visual exemplo 33/210*/}
                    </div>
                    {errors.descricao && <span>{errors.descricao.message}</span>}
                </div>

                <div className="campo">
                    <label htmlFor="setor">Setor:</label>
                    <textarea id="setor"
                        placeholder="Ex: TI"
                        {...register("setor")}
                        onChange={(e) => {
                            setSetorLength(e.target.value.length);
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        rows={1}
                        style={{ resize: "none", overflow: "hidden", width: "100%" }}
                    />
                    <div style={{ fontSize: "0.9rem", color: setorLength > 150 ? "red" : "dark gray" }}>
                        {setorLength}/150 caracteres
                    </div>
                    {errors.setor && <span style={{ color: "red" }}>{errors.setor.message}</span>}
                </div>

                <div className="campo">
                    <label htmlFor="usuario">Usuário</label>
                    <select id="usuario" {...register("usuario")}>
                        <option value="">Selecione o Usuário</option>
                        {usuarios.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.nome} - {u.email}
                            </option>
                        ))}
                    </select>
                    {errors.usuario && <span>{errors.usuario.message}</span>}

                    <label htmlFor="prioridade">Prioridade</label>
                    <select id="prioridade" {...register("prioridade")}>
                        <option value="">Selecione a Prioridade</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                    {errors.prioridade && <span>{errors.prioridade.message}</span>}
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </section>
    );
}


/*

Aprendizados de validações 

- Quando quiser que o campo de inserção de texto se expanda é melhor usar textarea

e.target.style.height = "auto";
O que faz: Reseta a altura do campo de texto para o valor mínimo necessário.

Por que é importante: Sem isso, o campo pode continuar com uma altura antiga e não se ajustar corretamente ao novo conteúdo. É como dizer: “comece do zero antes de calcular o novo tamanho”.

e.target.style.height =${e.target.scrollHeight}px;
O que faz: Define a altura do campo de texto com base na quantidade de conteúdo que ele precisa exibir.

e.target.scrollHeight é a altura total necessária para mostrar todo o texto sem rolagem.

px é a unidade de medida em pixels.


O .trim() - ja resolve o problema de cadastrar somente espaços

O que muda com .trim()?
" " → vira "" → falha na validação

" TI " → vira "TI" → passa na validação

"Tarefa urgente" → permanece igual → passa

*/