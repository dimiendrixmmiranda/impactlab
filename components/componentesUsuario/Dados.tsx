'use client'

import { areaImpacto, energiaCinetica, forcaImpacto, tensaoMecanica } from "@/constants/formulas"
import { materiais } from "@/constants/materiais"
import { useEstatisticasUsuario } from "@/hooks/useEstatisticasUsuario"
import { useLarguraDaTela } from "@/hooks/useLarguraDaTela"
import Image from "next/image"
import Link from "next/link"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
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
    "#CB2957",
    "#FF6A1C",
    "#112E81",
    "#FFD400",
    "#007979",
    "#4F252E",
    "#0A7C6E",
]

export default function Dados() {
    const [simulacoes, setSimulacoes] = useState<any[]>([])
    const larguraTela = useLarguraDaTela()
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);
    const { materialMaisUtilizado, maiorForcaImpacto, maiorTensao, dadosGraficoPizza } = useEstatisticasUsuario()


    const simulacoesPaginadas: any[] = simulacoes.length > 0 ? simulacoes.slice(
        first,
        first + rows
    ) : []

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    }

    useEffect(() => {
        async function carregarSimulacoes() {
            const response = await fetch("/api/simulacao");
            const data = await response.json();

            setSimulacoes(data);
        }

        carregarSimulacoes();
    }, [])

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const simulacoesMesAtual = simulacoes.filter((simulacao) => {
        const data = new Date(simulacao.createdAt);

        return (
            data.getMonth() === mesAtual &&
            data.getFullYear() === anoAtual
        )
    })

    const gerarCampoDados = (icone: React.ReactNode, titulo: string, paragrafo: string) => {
        return <div className="flex items-center gap-2 text-shadow-[1px_1px_2px_black]">
            <div className="w-14 h-14 rounded-lg border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-2xl">
                {icone}
            </div>
            <div>
                <h3 className="font-bold text-2xl">{titulo}</h3>
                <p className="line-clamp-1 capitalize">{paragrafo}</p>
            </div>
        </div>
    }

    function gerarCampoEstatistica(icone: React.ReactNode, titulo: string, valor: string | number) {
        return (
            <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xl justify-center text-laranja-impacto">
                    {icone}
                    <h3 className="line-clamp-1 text-white">{titulo}</h3>
                </div>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <p className="text-2xl font-bold text-laranja-impacto text-shadow-[1px_1px_2px_black] capitalize">{valor}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                {
                    gerarCampoEstatistica(<SiMaterialdesignicons />, 'Material mais utilizado', materialMaisUtilizado[0])
                }
                {
                    gerarCampoEstatistica(<GiGooeyImpact />, 'Maior Impacto', maiorForcaImpacto)
                }
                {
                    gerarCampoEstatistica(<MdOutlineIntegrationInstructions />, 'Melhor Integridade', materialMaisUtilizado[0])
                }
                {
                    gerarCampoEstatistica(<TbCircuitVoltmeter />, 'Maior Tensão Obtida', `${maiorTensao.toFixed(2)} MPa`)
                }
            </div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                <div className="bg-zinc-700 w-full h-full col-start-1 col-end-2 row-start-1 row-end-3 rounded-xl p-4">
                    <div className="bg-zinc-700 border border-zinc-700 rounded-xl p-4 flex flex-col h-full xl:row-start-1 xl:row-end-3">
                        <h3 className="text-3xl font-bold mb-4">
                            Simulações recentes
                        </h3>
                        <div className="overflow-x-auto scroll relative h-full">
                            {
                                simulacoesPaginadas.length > 0 ? (
                                    <table className="w-full min-w-[900px] h-full">
                                        <thead>
                                            <tr className="border-b border-zinc-600 text-zinc-400 text-sm uppercase grid grid-cols-[230px_130px_130px_130px_130px_130px_130px_130px]">
                                                <th className="text-left py-3">
                                                    Simulação
                                                </th>
                                                <th className="text-center py-3">
                                                    Material
                                                </th>
                                                <th className="text-center py-3">
                                                    Data
                                                </th>
                                                <th className="text-center py-3">
                                                    Status
                                                </th>
                                                <th className="text-center py-3">
                                                    Energia Cinética
                                                </th>
                                                <th className="text-center py-3">
                                                    Area Impacto
                                                </th>
                                                <th className="text-center py-3">
                                                    Tensão Mecânica
                                                </th>
                                                <th className="text-center py-3">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="grid grid-rows-5">
                                            {
                                                simulacoesPaginadas.map(sim => {
                                                    const material = materiais.find(material => material.id === sim.material)
                                                    return (
                                                        <tr
                                                            key={sim.id}
                                                            className="
                                                                    border-b border-zinc-700
                                                                    hover:bg-zinc-700/40
                                                                    transition-colors
                                                                    grid grid-cols-[230px_130px_130px_130px_130px_130px_130px_130px]
                                                                "
                                                        >
                                                            <td className="py-4">
                                                                <div className="flex gap-3 items-center">
                                                                    {
                                                                        material ? (
                                                                            <div className="relative w-16 h-10 bg-zinc-600 rounded-xl overflow-hidden border border-zinc-400">
                                                                                <Image alt={material.nome} src={material.imagem} fill className="object-cover" />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="relative w-16 h-10 bg-zinc-600 rounded-xl overflow-hidden border border-zinc-400"></div>
                                                                        )
                                                                    }

                                                                    <div>
                                                                        <p className="font-bold capitalize">
                                                                            {sim.material.replaceAll("-", " ")}
                                                                        </p>

                                                                        <p className="text-sm text-zinc-400">
                                                                            Força de Impacto: {forcaImpacto(sim.massa, sim.velocidade)} N
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="flex items-center justify-center text-center uppercase">
                                                                {sim.material.split("-")[0]}
                                                            </td>

                                                            <td className="flex items-center justify-center text-center">
                                                                <div>
                                                                    <p>
                                                                        {new Date(sim.createdAt).toLocaleDateString("pt-BR")}
                                                                    </p>

                                                                    <p className="text-zinc-400 text-sm">
                                                                        {new Date(sim.createdAt).toLocaleTimeString(
                                                                            "pt-BR",
                                                                            {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="flex items-center justify-center text-center">
                                                                <span
                                                                    className="
                                                                    px-3 py-1
                                                                    rounded-full
                                                                    text-sm
                                                                    bg-green-500/20
                                                                    text-green-400
                                                                    border border-green-500/40
                                                                "
                                                                >
                                                                    Concluída
                                                                </span>
                                                            </td>

                                                            <td className="flex items-center justify-center text-center uppercase">
                                                                {energiaCinetica(sim.massa, sim.velocidade)} J
                                                            </td>

                                                            <td className="flex items-center justify-center text-center uppercase">
                                                                {areaImpacto(sim.diametroProjetil).toFixed(2)} m²
                                                            </td>
                                                            <td className="flex items-center justify-center text-center uppercase">
                                                                {tensaoMecanica(forcaImpacto(sim.massa, sim.velocidade), areaImpacto(sim.diametroProjetil)).toFixed(2)} MPa
                                                            </td>

                                                            <td className="flex items-center justify-center text-center">
                                                                <button
                                                                    className="
                                                                    text-laranja-impacto
                                                                    hover:text-laranja-energia
                                                                    transition-colors
                                                                "
                                                                >
                                                                    Ver detalhes
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex flex-col gap-5 w-full h-full justify-center items-center">
                                        <h2 className="text-4xl">Nenhuma simulação Feita ainda </h2>
                                        <Link href={'/simulacao'} className="border border-laranja-impacto px-4 py-2 rounded-xl text-xl bg-laranja-impacto text-white text-shadow-[1px_1px_2px_black] flex items-center gap-1">
                                            <MdOutlineScience className="text-3xl" />
                                            <p>Faça uma nova simulação!</p>
                                        </Link>
                                    </div>
                                )
                            }
                        </div>
                        <div className="card mt-auto pt-2">
                            <Paginator
                                first={first}
                                rows={rows}
                                totalRecords={simulacoes.length}
                                onPageChange={onPageChange}
                                template="PrevPageLink PageLinks NextPageLink"
                                className="bg-transparent border-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-700 border border-zinc-700 rounded-xl p-4 flex flex-col 2xl:p-6">
                    <h3 className="text-3xl font-bold mb-4">
                        Materiais mais Utilizados
                    </h3>
                    {
                        simulacoes.length > 0 ? (
                            <div className="w-full h-full md:grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                <div className="w-full h-full mx-auto z-10 3xl:m-0">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <PieChart>
                                            <Pie
                                                data={dadosGraficoPizza}
                                                dataKey="quantidade"
                                                nameKey="material"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                            >
                                                {dadosGraficoPizza.map((_, index) => (
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
                                <div className="hidden flex-col gap-2 md:flex lg:hidden xl:flex">
                                    <h3 className="text-2xl font-bold text-shadow-[1px_1px_2px_black]">Legendas</h3>
                                    <ul>
                                        {
                                            dadosGraficoPizza.map((dado) => {
                                                return (
                                                    <li className="flex items-center gap-2">
                                                        <div className={`w-6 h-4`} style={{ backgroundColor: dado.cor }}></div>
                                                        <p className="capitalize">{dado.material} - {dado.quantidade}</p>
                                                    </li>
                                                )
                                            })
                                        }
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
                            <Link href={'/simulacao'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <FaPlus className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Nova Simulação</h4>
                                <span className="text-zinc-400 text-center leading-5">Criar uma nova simulação</span>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <LuImport className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Importar Dados</h4>
                                <span className="text-zinc-400 text-center leading-5">CSV ou Excel</span>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/materiais'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <IoCubeOutline className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Modelos</h4>
                                <span className="text-zinc-400 text-center leading-5">Usar modelos prontos</span>
                            </Link>
                        </div>
                        <div>
                            <Link href={'/'} className="flex flex-col justify-centere items-center border border-zinc-600 rounded-xl p-4 h-full">
                                <GrDocumentText className="text-laranja-impacto text-6xl" />
                                <h4 className="mt-2 text-xl">Relatórios</h4>
                                <span className="text-zinc-400 text-center leading-5">Gerar Relatório</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                {gerarCampoDados(<VscGraph />, 'Insights dos seus dados', 'Descubra padrões e tendências nas suas simulações')}
                {gerarCampoDados(<GiScreenImpact />, 'Material mais utilizado', `${materialMaisUtilizado[0]}`)}
                {gerarCampoDados(<GiMaterialsScience />, 'Total de simulações', `${simulacoes.length} simulações`)}
                {gerarCampoDados(<VscGraphLine />, 'Simulações no mês atual', `${simulacoesMesAtual.length} simulações`)}
            </div>
        </div>
    )
}