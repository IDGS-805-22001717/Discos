import { useEffect, useState } from "react";
import { discosIniciales } from "../data/discos";

export function useDiscos(){
    const [discos, setDiscos] = useState([]);
    const [cargando, setCargando] = useState([true]);
    const [error, setError] = useState("");

    useEffect(()=>{
        let activo = true;

        async function cargarDiscos(){
            try{
                setCargando(true);
                setError("");

                //simulamos el tiempo de respuesta
                await new Promise(resolve =>
                    setTimeout(resolve, 700)
                );
                if (!activo) return;

                setDiscos(discosIniciales);
            } catch{
                if(activo){
                    setError("No fue posible cargar el catalogo");
                }
            } finally {
                if(activo){
                    setCargando(false);
                }
            }
        }

        cargarDiscos();

        return ()=>{
            activo = false;
        };
    },[]);

    return {discos,cargando, error};
}

