'use client'

import { useLarguraDaTela } from "@/hooks/useLarguraDaTela"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { BsLightning } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import { GiGooeyImpact, GiMaterialsScience, GiScreenImpact } from "react-icons/gi"
import { GrDocumentText } from "react-icons/gr"
import { IoCubeOutline } from "react-icons/io5"
import { LuImport } from "react-icons/lu"
import { MdOutlineIntegrationInstructions, MdOutlineScience } from "react-icons/md"
import { SiMaterialdesignicons } from "react-icons/si"
import { TbCircuitVoltmeter, TbClockHour11 } from "react-icons/tb"
import { VscGraph, VscGraphLine } from "react-icons/vsc"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const CORES = [
    "#f97316",
    "#fb923c",
    "#fdba74",
    "#ea580c",
    "#c2410c",
    "#9a3412",
    "#7c2d12",
];

export default function Dados() {
    const [simulacoes, setSimulacoes] = useState<any[]>([])
    const larguraTela = useLarguraDaTela()

    useEffect(() => {
        async function carregarSimulacoes() {
            const response = await fetch("/api/simulacao");
            const data = await response.json();

            setSimulacoes(data);
        }

        carregarSimulacoes();
    }, [])

    const dadosGrafico = useMemo(() => {
        if (simulacoes.length === 0) {
            return [];
        }

        return Object.entries(
            simulacoes.length > 0 ? simulacoes.reduce((acc, simulacao) => {
                acc[simulacao.material] =
                    (acc[simulacao.material] || 0) + 1;

                return acc;
            }, {} as Record<string, number>) : []
        )
            .map(([material, quantidade]) => ({
                material: material.replaceAll("-", " "),
                quantidade: Number(quantidade),
            }))
            .sort((a, b) => b.quantidade - a.quantidade);
    }, [simulacoes])

    const gerarCampo = (icone: React.ReactNode, titulo: string, paragrafo: string) => {
        return <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-lg border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-2xl">
                {icone}
            </div>
            <div>
                <h3 className="font-bold text-2xl">{titulo}</h3>
                <p className="line-clamp-1">{paragrafo}</p>
            </div>
        </div>
    }
    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-zinc-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-2xl">
                        <SiMaterialdesignicons className="text-laranja-impacto" />
                        <h3>Material mais utilizado</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold">Cobre</p>
                        <span>Simulações realizadas</span>
                    </div>
                </div>
                <div className="bg-zinc-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-2xl">
                        <GiGooeyImpact className="text-laranja-impacto" />
                        <h3>Maior Impacto</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold">24000J</p>
                        <span className="line-clamp-1">Objeto deaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaW 80kg ............</span>
                    </div>
                </div>
                <div className="bg-zinc-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-2xl">
                        <MdOutlineIntegrationInstructions className="text-laranja-impacto" />
                        <h3>Melhor Integridade Obtida</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold">Chumbo</p>
                        <span>aquiii</span>
                    </div>
                </div>
                <div className="bg-zinc-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-2xl">
                        <TbCircuitVoltmeter className="text-laranja-impacto" />
                        <h3>Maior Tensão Obtida</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-2xl font-bold">Chumbo</p>
                        <span>156456 MPa</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 3xl:grid-rows-[auto_280px]">
                <div className="bg-zinc-700 w-full h-full col-start-1 col-end-2 row-start-1 row-end-3 rounded-xl p-4">
                    <div className="font-bold text-2xl flex items-center gap-2">
                        <TbClockHour11 className="text-laranja-impacto text-3xl" />
                        <h3>Simulações Recentes</h3>
                    </div>
                </div>
                <div className="bg-zinc-700 border border-zinc-700 rounded-xl p-4 flex flex-col 2xl:p-6">
                    <h3 className="text-3xl font-bold mb-4">
                        Materiais mais Utilizados
                    </h3>
                    {
                        simulacoes.length > 0 ? (
                            <div className="w-full h-full 4xl:grid 4xl:grid-cols-2 3xl:gap-4">
                                <div className="w-full h-full mx-auto z-10 3xl:m-0">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={dadosGrafico}
                                                dataKey="quantidade"
                                                nameKey="material"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                            >
                                                {dadosGrafico.map((_, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={CORES[index % CORES.length]}
                                                    />
                                                ))}
                                            </Pie>

                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="hidden flex-col gap-2 4xl:flex">
                                    <h3 className="text-2xl font-bold text-shadow-[1px_1px_2px_black]">Legendas</h3>
                                    <ul>
                                        <li className="flex items-center gap-2">
                                            <div className="w-6 h-4 bg-red-500"></div>
                                            <p>Material</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 h-full justify-center items-center">
                                <h2 className="text-center text-2xl">Faça uma simulação para gerar um gráfico</h2>
                                <Link href={'/simulacao'} className="border border-laranja-impacto px-4 py-2 rounded-xl text-xl bg-laranja-impacto text-white text-shadow-[1px_1px_2px_black] flex items-center gap-1">
                                    <MdOutlineScience className="text-3xl" />
                                    <p>Faça uma nova simulação!</p>
                                </Link>
                            </div>
                        )
                    }
                </div>
                <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                    <div className="font-bold text-2xl flex items-center gap-2">
                        <BsLightning className="text-laranja-impacto text-3xl" />
                        <h3>Acesso Rápido</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center leading-5 3xl:grid-cols-4 3xl:my-auto">
                        <div>
                            <Link href={'/'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <FaPlus className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Nova Simulação</h4>
                                <span className="text-zinc-500 text-center leading-5">Criar uma nova simulação</span>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <LuImport className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Importar Dados</h4>
                                <span className="text-zinc-500 text-center leading-5">CSV ou Excel</span>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <IoCubeOutline className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Modelos</h4>
                                <span className="text-zinc-500 text-center leading-5">Usar modelos prontos</span>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <GrDocumentText className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Relatórios</h4>
                                <span className="text-zinc-500 text-center leading-5">Gerar Relatório</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 p-4 bg-zinc-700 rounded-xl">
                {gerarCampo(<VscGraph />, 'Insights dos seus dados', 'Descubra padrões e tendências nas suas simulações')}
                {gerarCampo(<GiScreenImpact />, 'Material mais utilizado', 'Aço estrutural')}
                {gerarCampo(<GiMaterialsScience />, 'Você realizou este mês', '12 simulações')}
                {gerarCampo(<VscGraphLine />, 'Você realizou no total', '18 simulações')}
            </div>
        </div>
    )
}