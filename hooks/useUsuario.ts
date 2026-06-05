'use client'
import { useEffect, useState } from "react";

export function useUsuario() {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const response =
                    await fetch("/api/user/me");
                const data =
                    await response.json();
                setUsuario(data);
            } catch {
                setUsuario(null);
            } finally {
                setLoading(false);
            }
        }
        carregarUsuario();
    }, [])
    return {
        usuario,
        loading
    }
}