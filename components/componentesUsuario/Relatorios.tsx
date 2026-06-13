'use state'
import { areaImpacto, forcaImpacto, tensaoMecanica } from "@/constants/formulas"
import { gerarRelatorioPdf } from "@/constants/geradorRelatorioPdf"
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator"
import { useEffect, useMemo, useState } from "react"
import { BiSolidReport } from "react-icons/bi"
import { FaEye } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"
import { GiGooeyImpact, GiShieldImpact } from "react-icons/gi"
import { IoMdDownload } from "react-icons/io"
import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from 'recharts'

export default function Relatorios() {
    const CORES = [
        "#CB2957",
        "#FF6A1C",
        "#112E81",
        "#FFD400",
        "#007979",
        "#4F252E",
        "#0A7C6E",
    ]
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);
    const [simulacoes, setSimulacoes] = useState<any[]>([])

    const simulacoesPaginadas: any[] = simulacoes.length > 0 ? simulacoes.slice(
        first,
        first + rows
    ) : []

    const maiorForcaImpacto = simulacoes.length > 0 ? Math.max(
        ...simulacoes.map((simulacao) =>
            forcaImpacto(
                simulacao.massa,
                simulacao.velocidade,
                simulacao.tempoImpacto
            )
        )
    ) : 0

    const maiorTensao =
        simulacoes.length > 0
            ? Math.max(
                ...simulacoes.map(sim => {
                    const forca = forcaImpacto(
                        sim.massa,
                        sim.velocidade
                    )

                    const area = areaImpacto(
                        sim.diametroProjetil
                    )

                    return tensaoMecanica(
                        forca,
                        area
                    )
                })
            )
            : 0

    const dadosGraficoCirculo = useMemo(() => {
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

    const dadosGrafico = useMemo(() => {
        const agrupado: Record<string, any> = {}

        console.log(simulacoes)

        simulacoes.forEach(sim => {
            const data = new Date(sim.createdAt)
                .toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit'
                })

            if (!agrupado[data]) {
                agrupado[data] = {
                    data,
                    forca: 0,
                    velocidade: 0,
                    simulacoes: 0
                }
            }

            const forca = forcaImpacto(
                sim.massa,
                sim.velocidade
            )

            agrupado[data].forca += forca
            agrupado[data].velocidade += sim.velocidade
            agrupado[data].simulacoes += 1
        })

        return Object.values(agrupado)
    }, [simulacoes])

    console.log(dadosGrafico)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    useEffect(() => {
        async function carregarSimulacoes() {
            const response = await fetch("/api/simulacao");
            const data = await response.json();

            setSimulacoes(data);
        }

        carregarSimulacoes();
    }, []);

    const gerarCampo = (icone: React.ReactNode, titulo: string, quantidade: string) => {
        return (
            <div className="bg-zinc-700 p-4 rounded-xl flex gap-2 items-center">
                <div className="text-6xl text-laranja-impacto">
                    {icone}
                </div>
                <div>
                    <h3 className="text-laranja-impacto">
                        {titulo}
                    </h3>
                    <div className="flex gap-2 leading-4">
                        <p className="text-3xl font-bold text-shadow-[2px_2px_3px_black]">
                            {quantidade}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-4 overflow-hidden p-4">
            <div className="overflow-x-auto flex flex-col gap-4">
                <div>
                    <h2 className="font-bold text-4xl">Relatórios Recentes</h2>
                    <p>Acompanhe e analise seus resultados</p>
                </div>
                <div className="xl:grid xl:grid-cols-4 xl:gap-4">
                    {
                        gerarCampo(<IoDocumentText />, 'Total de Relatórios', '12')
                    }
                    {
                        gerarCampo(<GiGooeyImpact />, 'Força Máxima', `${maiorForcaImpacto} N`)
                    }
                    {
                        gerarCampo(<GiShieldImpact />, 'Maior Tensão', `${maiorTensao.toFixed(2)} MPa`)
                    }
                    {
                        gerarCampo(<BiSolidReport />, 'Relatórios Exportados', '10')
                    }
                </div>
                <div className="xl:grid xl:grid-cols-2 xl:gap-4">
                    <div className="bg-zinc-700 rounded-xl p-4">
                        <h3 className="text-3xl font-bold mb-4">
                            Visão Geral dos Relatórios
                        </h3>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer>
                                <LineChart data={dadosGrafico}>
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="data" />

                                    <YAxis
                                        yAxisId="left"
                                    />

                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                    />

                                    <Tooltip />

                                    <Legend />

                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="forca"
                                        stroke="#f97316"
                                        strokeWidth={3}
                                        name="Força Máxima (kN)"
                                    />

                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="velocidade"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        name="Velocidade (m/s)"
                                    />

                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="simulacoes"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        name="Simulações"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-zinc-700 rounded-xl p-4 h-fit">
                        <h3 className="text-3xl font-bold mb-4">
                            Distribuição por Material
                        </h3>
                        <div className="grid grid-cols-1 2xl:grid-cols-2">
                            <div className="relative h-[300px] w-full">

                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={dadosGraficoCirculo}
                                            dataKey="quantidade"
                                            innerRadius={70}
                                            outerRadius={110}
                                            paddingAngle={2}
                                        >
                                            {dadosGraficoCirculo.map((_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={CORES[index]}
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                <div className="
                                    absolute
                                    inset-0
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    pointer-events-none
                                ">
                                    <span className="text-4xl font-bold">
                                        {simulacoes.length}
                                    </span>

                                    <span className="text-sm text-zinc-400">
                                        Simulações
                                    </span>
                                </div>

                            </div>
                            <div className="flex items-center">
                                <ul className="flex flex-col gap-2">
                                    {
                                        dadosGraficoCirculo.map((dado, i) => {
                                            return (
                                                <li className="flex items-center gap-1 text-2xl">
                                                    <div className="rounded-full overflow-hidden w-4 h-4" style={{ backgroundColor: `${CORES[i]}` }}></div>
                                                    <p className="capitalize">{dado.material}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-fit">
                    <div className="flex">
                        <h3 className="font-bold text-3xl">Lista de Relatórios</h3>
                    </div>
                    {/* Vai ter um botao na hora da simulação para gerar relatorio, mas por enquanto, todas as simulações terao relatorios */}
                    <table className="w-fit min-w-[900px] 2xl:h-[600px] 3xl:h-[550px]">
                        <thead>
                            <tr className="border-b border-zinc-600 text-zinc-400 text-sm uppercase grid grid-cols-[250px_130px_130px_130px_130px_130px_130px_130px]">
                                <th className="text-left py-3">
                                    Relatório
                                </th>
                                <th className="text-center py-3">
                                    Material
                                </th>
                                <th className="text-center py-3">
                                    Data
                                </th>
                                <th className="text-center py-3">
                                    Força
                                </th>
                                <th className="text-center py-3">
                                    Tensão
                                </th>
                                <th className="text-center py-3">
                                    Deformação
                                </th>
                                <th className="text-center py-3">
                                    Status
                                </th>
                                <th className="text-center py-3">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {simulacoesPaginadas.map((sim) => (
                                <tr
                                    key={sim.id}
                                    className="border-b border-zinc-700
                                                    hover:bg-zinc-700/40
                                                    transition-colors
                                                    grid grid-cols-[250px_130px_130px_130px_130px_130px_130px_130px]
                                                    "
                                >
                                    <td className="flex items-center py-4">
                                        <div className="flex gap-3 items-center">
                                            <IoDocumentTextOutline className="text-3xl text-laranja-impacto" />
                                            <div>
                                                <p className="font-bold capitalize">
                                                    {sim.material.replaceAll('-', ' ')}
                                                </p>
                                                <p className="text-sm text-zinc-400">
                                                    Força: 1502 N
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-center text-center uppercase">
                                        {sim.material.split('-')[0]}
                                    </td>
                                    <td className="flex items-center justify-center text-center">
                                        <div>
                                            <p>
                                                {new Date(sim.createdAt).toLocaleDateString("pt-BR")}
                                            </p>
                                            <p className="text-zinc-400 text-sm">
                                                {new Date(sim.createdAt).toLocaleTimeString("pt-BR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-center text-center">
                                        <span>32kN</span>
                                    </td>
                                    <td className="flex items-center justify-center text-center">
                                        <span>32kN</span>
                                    </td>
                                    <td className="flex items-center justify-center text-center">
                                        <span>32kN</span>
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
                                    <td className="flex items-center justify-center text-center flex items-center justify-center w-full gap-2">
                                        <button className="text-2xl"><FaEye /></button>
                                        <button
                                            className="text-2xl"
                                            onClick={() => {
                                                console.log(sim)
                                                gerarRelatorioPdf(sim)
                                            }}
                                        >
                                            <IoMdDownload />
                                        </button>
                                        <button className="text-2xl" >
                                            <FaRegTrashCan />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="card mt-auto">
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
        </div>
    )
}