'use client'
import { areaImpacto, forcaImpacto, tensaoMecanica } from "@/constants/formulas";
import { materiais } from "@/constants/materiais";
import Usuario from "@/interfaces/Usuario";
import { useEffect, useMemo, useState } from "react";

const CORES = [
    "#CB2957",
    "#FF6A1C",
    "#112E81",
    "#FFD400",
    "#007979",
    "#4F252E",
    "#0A7C6E",
];

export function useEstatisticasUsuario() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);
    const [simulacoes, setSimulacoes] = useState<any[]>([])
    const qtdeSimulacoes = simulacoes.length || 0
    const qtdeMateriaisDisponiveis = materiais.length || 0

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const response =
                    await fetch("/api/user/me")
                const data =
                    await response.json()
                setUsuario(data)
            } catch {
                setUsuario(null)
            } finally {
                setLoading(false)
            }
        }
        carregarUsuario()
    }, [])
    const carregarSimulacoes = async () => {
        const response = await fetch("/api/simulacao");
        const data = await response.json();

        setSimulacoes(data);
    }
    useEffect(() => {
        carregarSimulacoes();
    }, [usuario]);

    const simulacoesMesAtual = simulacoes.length > 0 ? simulacoes.filter((simulacao) => {
        const data = new Date(simulacao.createdAt);

        return (
            data.getMonth() === mesAtual &&
            data.getFullYear() === anoAtual
        )
    }).length : 0

    const maiorForcaImpacto = simulacoes.length > 0 ? Math.max(
        ...simulacoes.map((simulacao) =>
            forcaImpacto(
                simulacao.massa,
                simulacao.velocidade,
                simulacao.tempoImpacto
            )
        )
    ) : 0

    const maiorVelocidadeUsada = simulacoes.length > 0 ? Math.max(
        ...simulacoes.map((simulacao) => simulacao.velocidade)
    ) : 0

    const dadosGraficoPizza = useMemo(() => {
        if (simulacoes.length === 0) {
            return [];
        }

        const materiaisOrdenados = Object.entries(
            simulacoes.length > 0
                ? simulacoes.reduce((acc, simulacao) => {
                    acc[simulacao.material] =
                        (acc[simulacao.material] || 0) + 1;

                    return acc;
                }, {} as Record<string, number>)
                : {}
        )
            .map(([material, quantidade]) => ({
                material: material.replaceAll("-", " "),
                quantidade: Number(quantidade),
            }))
            .sort((a, b) => b.quantidade - a.quantidade)

        const top6 = materiaisOrdenados.slice(0, 6);

        const quantidadeOutros = materiaisOrdenados
            .slice(6)
            .reduce((total, item) => total + item.quantidade, 0);

        const resultado = [
            ...top6,
            ...(quantidadeOutros > 0
                ? [{
                    material: "Outros",
                    quantidade: quantidadeOutros,
                }]
                : [])
        ].map((item, i) => ({
            ...item,
            cor: CORES[i]
        }));

        return resultado;
    }, [simulacoes]);

    const contagemMateriais: Record<string, number> =
        simulacoes.length > 0 ?
            simulacoes.reduce((acc, simulacao) => {
                acc[simulacao.material] =
                    (acc[simulacao.material] || 0) + 1;

                return acc;
            }, {} as Record<string, number>) : {}

    const materialMaisUtilizado =
        Object.entries(contagemMateriais)
            .sort((a, b) => b[1] - a[1])[0] ?? ["Nenhum", 0];

    const maiorTensao =
        simulacoes.length > 0
            ? Math.max(
                ...simulacoes.map(simulacao => {
                    const forca =
                        forcaImpacto(
                            simulacao.massa,
                            simulacao.velocidade
                        );

                    const area =
                        areaImpacto(
                            simulacao.diametroProjetil
                        )

                    return tensaoMecanica(
                        forca,
                        area
                    )
                })
            )
            : 0



    return {
        simulacoes,
        qtdeSimulacoes,
        simulacoesMesAtual,
        qtdeMateriaisDisponiveis,
        maiorForcaImpacto,
        maiorTensao,
        maiorVelocidadeUsada,
        dadosGraficoPizza,
        materialMaisUtilizado,
        carregarSimulacoes
    }
}