import { Routes, Route } from "react-router-dom"
import { Inicial } from "../paginas/Inicial"
import { Quadro } from "../componentes/Quadro"
import { CadTarefa } from "../paginas/CadTarefa"
import { CadUsuario } from "../paginas/CadUsuario"

export function Rotas(){
    return(
        <Routes>
            <Route path="/" element = {<Inicial/>}>
                {/* Preenchendo o outlet do inicial */}
                <Route index element = {<Quadro />}/>
                <Route path="cadTarefa" element = {<CadTarefa />}/>
                <Route path="cadUsuario" element = {<CadUsuario/>}/>
            </Route>
        </Routes>
    )
}