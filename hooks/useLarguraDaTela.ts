import { useEffect, useState } from "react";

export function useLarguraDaTela() {
    const [largura, setLargura] = useState(0);

    useEffect(() => {
        const atualizarLargura = () => {
            setLargura(window.innerWidth);
        };

        atualizarLargura();

        window.addEventListener(
            "resize",
            atualizarLargura
        );

        return () => {
            window.removeEventListener(
                "resize",
                atualizarLargura
            );
        };
    }, []);

    return largura;
}