import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useCarrito() {
    const [carrito, setCarrito] = useLocalStorage("viniloverse.carrito", []);

    function agregarDisco(disco) {
        setCarrito(actual => {
            const existe = actual.find(item => item.id === disco.id);

            if (existe) {
                return actual.map(item =>
                    item.id === disco.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...actual, { ...disco, cantidad: 1 }];
        });
    }

    function incrementar(id) {
        setCarrito(actual =>
            actual.map(item =>
                item.id === id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    }

    function decrementar(id) {
        setCarrito(actual =>
            actual
                .map(item =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter(item => item.cantidad > 0) // Remueve el ítem si la cantidad llega a 0
        );
    }

    function eliminarDisco(id) {
        setCarrito(actual =>
            actual.filter(item => item.id !== id)
        );
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    const cantidadTotal = useMemo(
        () => carrito.reduce((total, item) => total + item.cantidad, 0),
        [carrito]
    );

    const subtotal = useMemo(
        () => carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0),
        [carrito]
    );

    return {
        carrito,
        agregarDisco,
        incrementar,
        decrementar,
        eliminarDisco,
        vaciarCarrito,
        cantidadTotal,
        subtotal
    };
}