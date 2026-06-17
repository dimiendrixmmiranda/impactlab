import { dicasImpactLab } from "@/constants/dicas";
import { areaImpacto, energiaCinetica, forcaImpacto, tensaoMecanica } from "@/constants/formulas";
import { materiais } from "@/constants/materiais";
import { useLarguraDaTela } from "@/hooks/useLarguraDaTela";
import Image from "next/image";
import Link from "next/link";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useEffect, useMemo, useState } from "react";
import { FaLightbulb, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdAlignHorizontalLeft, MdOutlineScience } from "react-icons/md";
import { PiCubeBold, PiFlaskBold, PiLightningBold, PiRocketLaunchBold } from "react-icons/pi";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const CORES = [
    "#CB2957",
    "#FF6A1C",
    "#112E81",
    "#FFD400",
    "#007979",
    "#4F252E",
    "#0A7C6E",
];

export default function Dashboard() {
    const [simulacoes, setSimulacoes] = useState<any[]>([])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);
    const larguraTela = useLarguraDaTela()
    const dicaAleatoria = dicasImpactLab[Math.floor(Math.random() * dicasImpactLab.length)]

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const simulacoesMesAtual = simulacoes.filter((simulacao) => {
        const data = new Date(simulacao.createdAt);

        return (
            data.getMonth() === mesAtual &&
            data.getFullYear() === anoAtual
        )
    })

    const maiorForcaImpacto = simulacoes.length > 0 ? Math.max(
        ...simulacoes.map((simulacao) =>
            forcaImpacto(
                simulacao.massa,
                simulacao.velocidade,
                simulacao.tempoImpacto
            )
        )
    ) : 0

    const maiorVelocidade = simulacoes.length > 0 ? Math.max(
        ...simulacoes.map((simulacao) => simulacao.velocidade)
    ) : 0

    useEffect(() => {
        async function carregarSimulacoes() {
            const response = await fetch("/api/simulacao");
            const data = await response.json();

            setSimulacoes(data);
        }

        carregarSimulacoes();
    }, []);

    useEffect(() => {
        if (larguraTela >= 1440) {
            setRows(7);
        } else if (larguraTela >= 1280) {
            setRows(6);
        } else {
            setRows(5);
        }
    }, [larguraTela])

    const simulacoesPaginadas: any[] = simulacoes.length > 0 ? simulacoes.slice(
        first,
        first + rows
    ) : []

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    }

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
            .map(([material, quantidade], i) => ({
                material: material.replaceAll("-", " "),
                quantidade: Number(quantidade),
                cor: CORES[i]
            }))
            .sort((a, b) => b.quantidade - a.quantidade);
    }, [simulacoes])

    console.log(dadosGrafico)

    const gerarCampo = (icone: React.ReactNode, titulo: string, quantidade: string, valorMensal?: string) => {
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
                        {
                            valorMensal ? (
                                <p className="text-sm mt-auto text-green-600 text-shadow-[1px_1px_2px_black]">+{valorMensal} este mês</p>
                            ) : ('')
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 overflow-hidden p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-4xl">Dashboard</h2>
                    <p>Bem vindo de volta, Dimi! 👋</p>
                </div>
                <Link href={'/simulacao'} className="flex items-center gap-1 bg-laranja-impacto rounded-xl p-2 text-shadow-[1px_1px_2px_black]">
                    <FaPlus />
                    <p>Nova Simulação</p>
                    <IoIosArrowForward />
                </Link>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {gerarCampo(
                    <PiFlaskBold />,
                    'Simulações Realizadas',
                    simulacoes.length.toString(),
                    simulacoesMesAtual.length.toString()
                )}

                {gerarCampo(
                    <PiCubeBold />,
                    'Materiais Disponíveis',
                    materiais.length.toString()
                )}

                {gerarCampo(
                    <PiLightningBold />,
                    'Maior Força de Impacto',
                    `${maiorForcaImpacto}N`
                )}

                {gerarCampo(
                    <PiRocketLaunchBold />,
                    'Velocidade Máxima Simulada',
                    `${maiorVelocidade} m/s`
                )}
            </div>
            <div className="xl:grid xl:grid-cols-[700px_1fr] xl:grid-rows-[340px_auto] xl:gap-6 2xl:grid-cols-[800px_auto] 2xl:grid-rows-[360px_auto] 3xl:grid-cols-[900px_1fr] 3xl:grid-rows-[360px_auto] 4xl:grid-cols-[950px_1fr]">
                <div className="bg-zinc-700 border border-zinc-700 rounded-xl p-4 flex flex-col xl:row-start-1 xl:row-end-3">
                    <h3 className="text-3xl font-bold mb-4">
                        Simulações recentes
                    </h3>
                    <div className="overflow-x-auto scroll relative h-full">
                        {
                            simulacoesPaginadas.length > 0 ? (
                                <table className="w-full min-w-[900px] 2xl:h-[600px] 3xl:h-[550px]">
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
                <div className="bg-zinc-700 border border-zinc-700 rounded-xl p-4 flex flex-col gap-3 2xl:p-6">
                    <h3 className="text-3xl font-bold mb-4">
                        Materiais mais Utilizados
                    </h3>
                    {
                        simulacoes.length > 0 ? (
                            <div className="w-full h-full 4xl:grid 4xl:grid-cols-2 3xl:gap-4">
                                <div className="w-full h-full mx-auto z-10 3xl:m-0">
                                    <ResponsiveContainer width="100%" className={`xl:h-[240px]`}>
                                        <PieChart>
                                            <Pie
                                                data={dadosGrafico}
                                                dataKey="quantidade"
                                                nameKey="material"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={larguraTela < 1600 ? 100 : 100}
                                                label={false}
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
                                        {
                                            dadosGrafico.map((dado, i) => {
                                                return (
                                                    <li className="flex items-center gap-2" key={i}>
                                                        <div className={`w-6 h-4`} style={{backgroundColor: dado.cor}}></div>
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
                <div className="bg-zinc-700 border border-zinc-700 rounded-xl flex flex-col gap-4 p-4 2xl:p-6">
                    <div className="flex items-center gap-2">
                        <FaLightbulb className="text-4xl text-amber-500" />
                        <h3 className="text-3xl font-bold">
                            Dicas Rápidas
                        </h3>
                    </div>
                    <div className="border border-zinc-700 flex flex-col p-4 rounded-xl gap-4 h-full">
                        <div className="flex flex-col gap-2 h-full">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-xl 3xl:text-2xl">
                                    {dicaAleatoria.titulo}
                                </h2>
                                <span className="line-clamp-4 4xl:text-xl">
                                    {dicaAleatoria.descricao}
                                </span>
                            </div>
                            <Link href={'/dicas'} className="flex text-nowrap items-center bg-zinc-950 p-2 rounded-xl text-center justify-center mt-auto">
                                <p>Ver todas as dicas</p>
                                <IoIosArrowForward className="pt-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}