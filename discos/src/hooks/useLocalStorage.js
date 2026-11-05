import { useEffect, useState } from "react";

export function useLocalStorage(clave, valorInicial) {
    const [valor, setValor] = useState(() => {
        try {
            const guardado = localStorage.getItem(clave);
            if (guardado === null) {
                return valorInicial;
            }
            return JSON.parse(guardado);
        } catch {
            return valorInicial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                clave,
                JSON.stringify(valor));
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    }, [clave, valor]);

    return [valor, setValor];
}