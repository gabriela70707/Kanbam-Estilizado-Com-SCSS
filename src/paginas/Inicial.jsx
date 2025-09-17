import { BarraNavegacao } from "../componentes/BarraNavegacao";
import { Outlet } from "react-router-dom";

export function Inicial(){
    return(
        <>
            <BarraNavegacao />
            <Outlet />
        </>
    )
}