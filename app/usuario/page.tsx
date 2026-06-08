'use client';

import Template from "@/components/template/Template";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCube, FaDatabase, FaEye, FaLightbulb, FaPencilAlt, FaPlus, FaRegBell, FaRegLightbulb, FaUser, FaUserAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosArrowForward, IoIosCamera, IoIosColorPalette, IoIosTv, IoMdArrowDropright, IoMdDownload } from "react-icons/io";
import { IoCubeOutline, IoDocumentText, IoDocumentTextOutline, IoLogOut, IoMailOutline, IoRocketOutline } from "react-icons/io5";
import { MdAutoGraph, MdMoreVert, MdOutlineDashboard, MdOutlinePlayCircle, MdOutlineScience } from "react-icons/md";
import { PiAtomBold, PiBellSimpleRingingFill, PiCubeBold, PiFlaskBold, PiLightningBold, PiRocketLaunchBold } from "react-icons/pi";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { signOut } from "next-auth/react";
import Simulacao from "@/components/simulacao/Simulacao";
import { GiGooeyImpact, GiNotebook, GiPadlock, GiShieldImpact } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";
import { useUsuario } from "@/hooks/useUsuario";
import { SlEnergy } from "react-icons/sl";
import { TiWorld } from "react-icons/ti";
import { TbHexagonNumber1Filled, TbHexagonNumber5Filled } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { SiMubi } from "react-icons/si";
import { BsFillSave2Fill, BsFillShieldLockFill } from "react-icons/bs";
import { materiais } from "@/constants/materiais";
import { useLarguraDaTela } from "@/hooks/useLarguraDaTela";
import DialogConfirmacao from "@/components/dialog/Dialog";
import Dialog from "@/components/dialog/Dialog";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { dicasImpactLab } from "@/constants/dicas";

type Menu =
    | 'dashboard'
    | 'simulacoes'
    | 'dados'
    | 'resultados'
    | 'relatorios'
    | 'perfil'
    | 'configuracoes'
    | 'sair';


export default function Page() {
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
                        <p className="text-sm mt-auto text-green-600 text-shadow-[1px_1px_2px_black]">+12 este mês</p>
                    </div>
                </div>
            </div>
        )
    }
    const larguraTela = useLarguraDaTela()
    const CORES = [
        "#f97316",
        "#fb923c",
        "#fdba74",
        "#ea580c",
        "#c2410c",
        "#9a3412",
        "#7c2d12",
    ];
    const [menuAtivo, setMenuAtivo] = useState<Menu>('dashboard')
    const [simulacoes, setSimulacoes] = useState<any[]>([])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);
    const [dialogoSairAberto, setDialogoSairAberto] = useState(false)

    const top7Resistencia = [...materiais]
        .sort((a, b) => b.resistencia - a.resistencia)
        .slice(0, 7)
    const maiorResistencia = Math.max(
        ...top7Resistencia.map(
            m => m.resistencia
        )
    );

    const { usuario } = useUsuario()

    useEffect(() => {
        if (larguraTela >= 1440) {
            setRows(7);
        } else if (larguraTela >= 1280) {
            setRows(6);
        } else {
            setRows(5);
        }
    }, [larguraTela])


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

    const dicaAleatoria = dicasImpactLab[Math.floor(Math.random() * dicasImpactLab.length)]

    console.log(simulacoes) //aqui tenho a lista feita de simulações que o usuario ja fez 
    const simulacoesPaginadas: any[] = simulacoes.length > 0 ? simulacoes.slice(
        first,
        first + rows
    ) : []

    const materiaisMaisUsados = Object.entries(
        simulacoes.length > 0 ? simulacoes.reduce(
            (acc, simulacao) => {
                const material = simulacao.material;

                acc[material] = (acc[material] || 0) + 1;

                return acc;
            },
            {} as Record<string, number>
        ) : []
    )

    const dadosGrafico = useMemo(() => {
        if (simulacoes.length === 0) {
            return [];
        }

        return Object.entries(
            simulacoes.reduce((acc, simulacao) => {
                acc[simulacao.material] =
                    (acc[simulacao.material] || 0) + 1;

                return acc;
            }, {} as Record<string, number>)
        )
            .map(([material, quantidade]) => ({
                material: material.replaceAll("-", " "),
                quantidade: Number(quantidade),
            }))
            .sort((a, b) => b.quantidade - a.quantidade);
    }, [simulacoes])

    function getMenuClass(menu: Menu) {
        return `
        flex items-center gap-1 text-xl w-full px-4 py-2
        transition-all duration-300
        cursor-pointer
        text-shadow-[1px_1px_2px_black]
        ${menuAtivo === menu
                ? 'bg-laranja-impacto text-white'
                : 'hover:bg-zinc-800'
            }
    `;
    }


    function identificarMenuAtivo() {
        switch (menuAtivo) {
            case 'dashboard':
                return (
                    <div className="flex flex-col gap-4 overflow-hidden p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-bold text-4xl">Dashboard</h2>
                                <p>Bem vindo de volta, Dimi! 👋</p>
                            </div>
                            <div className="flex items-center gap-1 bg-laranja-impacto rounded-xl p-2 text-shadow-[1px_1px_2px_black]">
                                <FaPlus />
                                <p>Nova Simulação</p>
                                <IoIosArrowForward />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {gerarCampo(
                                <PiFlaskBold />,
                                'Simulações Realizadas',
                                '24'
                            )}

                            {gerarCampo(
                                <PiCubeBold />,
                                'Materiais Disponíveis',
                                '15'
                            )}

                            {gerarCampo(
                                <PiLightningBold />,
                                'Força Máxima Calculada',
                                '28.4 kN'
                            )}

                            {gerarCampo(
                                <PiRocketLaunchBold />,
                                'Velocidade Máxima Simulada',
                                '130 m/s'
                            )}
                        </div>
                        <div className="xl:grid xl:grid-cols-[700px_1fr] xl:grid-rows-[340px_auto] xl:gap-6 2xl:grid-cols-[800px_auto] 2xl:grid-rows-[360px_auto] 3xl:grid-cols-[900px_1fr] 3xl:grid-rows-[360px_auto] 4xl:grid-cols-[950px_1fr]">
                            <div className="bg-zinc-700 border border-zinc-700 rounded-xl p-4 flex flex-col xl:row-start-1 xl:row-end-3">
                                <h3 className="text-3xl font-bold mb-4">
                                    Simulações recentes
                                </h3>
                                <div className="overflow-x-auto scroll">
                                    <table className="w-full min-w-[900px] 2xl:h-[600px] 3xl:h-[550px]">
                                        <thead>
                                            <tr className="border-b border-zinc-600 text-zinc-400 text-sm uppercase grid grid-cols-[230px_130px_130px_130px_130px_130px_130px]">
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
                                                    Força de Impacto
                                                </th>
                                                <th className="text-center py-3">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="grid grid-rows-5">
                                            {simulacoesPaginadas.length > 0 ? (
                                                simulacoesPaginadas.map((sim) => (
                                                    <tr
                                                        key={sim.id}
                                                        className="
                                                            border-b border-zinc-700
                                                            hover:bg-zinc-700/40
                                                            transition-colors
                                                            grid grid-cols-[230px_130px_130px_130px_130px_130px_130px]
                                                        "
                                                    >
                                                        <td className="py-4">
                                                            <div className="flex gap-3 items-center">
                                                                <div className="w-16 h-10 rounded bg-zinc-600" />

                                                                <div>
                                                                    <p className="font-bold capitalize">
                                                                        {sim.material.replaceAll("-", " ")}
                                                                    </p>

                                                                    <p className="text-sm text-zinc-400">
                                                                        Força: 1502 N
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
                                                            1000
                                                        </td>

                                                        <td className="flex items-center justify-center text-center uppercase">
                                                            1000
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
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan={7}
                                                        className="text-center py-10 text-zinc-400"
                                                    >
                                                        Nenhuma simulação encontrada
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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
                                                    outerRadius={larguraTela < 1600 ? 100 : 120}
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
                                            <li className="flex items-center gap-2">
                                                <div className="w-6 h-4 bg-red-500"></div>
                                                <p>Material</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
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
                                        <button className="flex text-nowrap items-center bg-zinc-950 p-2 rounded-xl text-center justify-center mt-auto">
                                            <p>Ver todas as dicas</p>
                                            <IoIosArrowForward className="pt-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'simulacoes':
                return (
                    <Simulacao formato="horizontal" />
                )
            case 'relatorios':
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
                                    gerarCampo(<GiGooeyImpact />, 'Força Máxima', '130kg')
                                }
                                {
                                    gerarCampo(<GiShieldImpact />, 'Maior Impacto', '450')
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
                                </div>
                                <div className="bg-zinc-700 rounded-xl p-4">
                                    <h3 className="text-3xl font-bold mb-4">
                                        Distribuição por Material
                                    </h3>
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
                                                    <button className="text-2xl"><IoMdDownload /></button>
                                                    <button className="text-2xl"><MdMoreVert /></button>
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
            case 'perfil':
                return (
                    <div className="flex flex-col gap-4 overflow-hidden p-4">
                        <div className="flex flex-col gap-4 w-full items-center justify-between">
                            <div className="w-full">
                                <h2 className="font-bold text-4xl">Meu Perfil</h2>
                                <p>Gerencie suas informações pessoais e acompanhe seu desempenho.</p>
                            </div>
                            <div className="w-full xl:grid xl:grid-cols-2 xl:gap-4">
                                <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-xl">Informações Pessoais</h3>
                                        <div className="flex items-center gap-2 border border-laranja-impacto px-2 py-1 text-laranja-impacto rounded-xl">
                                            <FaPencilAlt />
                                            <p>Editar Informações</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-3 justify-center items-center">
                                            <div className="relative w-[130px] h-[130px] rounded-full bg-zinc-950 3xl:w-[160px] 3xl:h-[160px]"></div>
                                            <button className="flex items-center justify-center gap-1 text-center border border-laranja-impacto rounded-xl text-laranja-impacto px-6 py-1">
                                                <p>Alterar foto</p>
                                                <IoIosCamera className="mt-1" />
                                            </button>
                                        </div>
                                        <div className="col-start-2 col-end-4 grid grid-cols-2 gap-2">
                                            <div>
                                                <span className="text-zinc-400 text-sm">Nome</span>
                                                <p className="line-clamp-1">{usuario?.nome}</p>
                                            </div>
                                            <div>
                                                <span className="text-zinc-400 text-sm">Email</span>
                                                <p className="line-clamp-1 truncate">{usuario?.email}</p>
                                            </div>
                                            <div>
                                                <span className="text-zinc-400 text-sm">Data de registro</span>
                                                <p className="line-clamp-1">
                                                    {usuario?.createdAt &&
                                                        new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-zinc-400 text-sm">Data de Nascimento</span>
                                                <p className="line-clamp-1">
                                                    {usuario?.createdAt &&
                                                        new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-zinc-400 text-sm">Instituição (opcional)</span>
                                                <p className="line-clamp-1">ImpactLab</p>
                                            </div>
                                            <div>
                                                <span className="text-zinc-400 text-sm">Localização (Brasil)</span>
                                                <p className="line-clamp-1">ImpactLab</p>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-zinc-400 text-sm">Bio</span>
                                                <p className="line-clamp-1">Uma bio bem legal com sabor real de alegria</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-xl">Resumo de Atividade</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {
                                            gerarCampo(<MdOutlineScience />, 'Simulações Realizadas', '12')
                                        }
                                        {
                                            gerarCampo(<IoCubeOutline />, 'Materiais Testados', '12')
                                        }
                                        {
                                            gerarCampo(<SlEnergy />, 'Força Máxima', '12')
                                        }
                                        {
                                            gerarCampo(<IoRocketOutline />, 'Simulações Realizadas', '12')
                                        }
                                    </div>
                                    <button className="flex items-center text-laranja-impacto border border-laranja-impacto p-2 rounded-xl text-center justify-center">
                                        <p>Ver todos os relatórios</p>
                                        <IoMdArrowDropright />
                                    </button>
                                </div>
                                <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-xl">Preferências</h3>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <FaRegBell />
                                            </div>
                                            <div>
                                                <h3>Notificações</h3>
                                                <p className="text-sm">Receba as atualizações sobre simulações e relatórios.</p>
                                            </div>
                                            <div className="ml-auto">
                                                <input type="checkbox" name="notificacoes" id="notificacoes" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <IoIosColorPalette />
                                            </div>
                                            <div>
                                                <h3>E-mails</h3>
                                                <p className="text-sm">Gerenciar preferências de comunicação por e-mail.</p>
                                            </div>
                                            <div className="ml-auto">
                                                <button className="text-laranja-impacto border border-laranja-impacto rounded-xl px-4 py-1 text-sm">Configurar</button>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <FaRegBell />
                                            </div>
                                            <div>
                                                <h3>Tema</h3>
                                                <p className="text-sm">Escolha entre o tema escuro ou claro.</p>
                                            </div>
                                            <div className="ml-auto">
                                                <select name="tema" id="tema" className="bg-zinc-500 px-2 py-1 w-[95px]">
                                                    <option value="">Selecione</option>
                                                    <option value="escuro">Escuro</option>
                                                    <option value="claro">Claro</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <TiWorld />
                                            </div>
                                            <div>
                                                <h3>Idioma</h3>
                                                <p className="text-sm">Escolha o idioma da plataforma.</p>
                                            </div>
                                            <div className="ml-auto">
                                                <select name="tema" id="tema" className="bg-zinc-500 px-2 py-1 w-[95px]">
                                                    <option value="">Selecione</option>
                                                    <option value="portugues">Português</option>
                                                    <option value="ingles">Inglês</option>
                                                    <option value="espanhol">Espanhol</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-xl">Conquistas</h3>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <TbHexagonNumber1Filled />
                                            </div>
                                            <div>
                                                <h3>Primeira Simulação</h3>
                                                <p className="text-sm">Realize sua primeira simulação</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p>0/1</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <SiMubi />
                                            </div>
                                            <div>
                                                <h3>10 Simulações</h3>
                                                <p className="text-sm">Complete 10 simulações.</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p>0/10</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <TbHexagonNumber5Filled />
                                            </div>
                                            <div>
                                                <h3>Explorador de Materiais</h3>
                                                <p className="text-sm">Teste 5 materiais diferentes.</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p>0/5</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <HiOutlineDocumentAdd />
                                            </div>
                                            <div>
                                                <h3>Analista de Impacto</h3>
                                                <p className="text-sm">Gere 5 relatórios</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p>0/5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4 col-span-2">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-xl">Segurança da Conta</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 bg-zinc-600 p-2 px-4 rounded-xl">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <GiPadlock />
                                            </div>
                                            <div>
                                                <h3>Primeira Simulação</h3>
                                                <p className="text-sm">Atualize sua senha periodicamente.</p>
                                            </div>
                                            <div className="flex items-center gap-2 border border-laranja-impacto px-2 py-1 text-laranja-impacto rounded-xl ml-auto">
                                                <GiNotebook />
                                                <p>Alterar</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-zinc-600 p-2 px-4 rounded-xl">
                                            <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                                <BsFillShieldLockFill />
                                            </div>
                                            <div>
                                                <h3>Autenticação de dois fatores</h3>
                                                <p className="text-sm">Adicione uma camada extra de segurança</p>
                                            </div>
                                            <div className="ml-auto">
                                                <select name="autenticacao-dois-fatores" id="autenticacao-dois-fatores" className="border border-laranja-impacto text-laranja-impacto">
                                                    <option value="ativado">Ativado</option>
                                                    <option value="ativado">Desativado</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'configuracoes':
                return (
                    <div className="flex flex-col gap-4 overflow-hidden p-4">
                        <div className="flex flex-col gap-4 w-full items-center justify-between">
                            <div className="flex flex-col gap-2 w-full">
                                <h2 className="font-bold text-4xl">Configurações do Sistema</h2>
                                <p>Personalize sua experiência no <b className="text-laranja-impacto">ImpactLab</b></p>
                            </div>
                            <div className="grid grid-cols-3 w-full gap-4">
                                <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                                    <div className="flex items-center gap-2 text-laranja-impacto text-shadow-[2px_2px_3px_black]">
                                        <IoIosTv className="text-4xl" />
                                        <h3 className="font-bold text-xl">Lista de Relatórios</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h4>Animações</h4>
                                            <select name="tema" id="tema" className="border border-laranja-impacto px-2 bg-zinc-500">
                                                <option value="escuro">Escuro</option>
                                                <option value="claro">Claro</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Tema</h4>
                                            <input type="checkbox" name="animacao" id="animacao" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Sons</h4>
                                            <input type="checkbox" name="som" id="som" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Efeitos de Fundo</h4>
                                            <input type="checkbox" name="efeitos-de-fundo" id="efeitos-de-fundo" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Blur da Interface</h4>
                                            <input type="checkbox" name="blur" id="blur" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Escala da Interface</h4>
                                            <select name="tema" id="tema" className="border border-laranja-impacto px-2 bg-zinc-500">
                                                <option value="100">100%</option>
                                                <option value="80">80%</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                                    <div className="flex items-center gap-2 text-laranja-impacto text-shadow-[2px_2px_3px_black]">
                                        <MdOutlineScience className="text-4xl" />
                                        <h3 className="font-bold text-xl">Configuração de Simulação</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h4>Tempo Padrao de Impacto</h4>
                                            <select name="tempo-padrao-impacto" id="tempo-padrao-impacto" className="border border-laranja-impacto px-2 bg-zinc-500">
                                                <option value="0.01">0.01</option>
                                                <option value="0.05">0.05</option>
                                                <option value="0.10">0.10</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Precisão dos cálculos</h4>
                                            <select name="tempo-padrao-impacto" id="tempo-padrao-impacto" className="border border-laranja-impacto px-2 bg-zinc-500">
                                                <option value="alta">Alta</option>
                                                <option value="media">Media</option>
                                                <option value="baixa">Baixa</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Auto Salvar Resultados</h4>
                                            <input type="checkbox" name="auto-salvar-resultados" id="auto-salvar-resultados" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Mostrar Fórmulas</h4>
                                            <input type="checkbox" name="mostrar-formulas" id="mostrar-formulas" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Exibir Animações</h4>
                                            <input type="checkbox" name="exibir-animacoes" id="exibir-animacoes" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Unidade de Medida</h4>
                                            <select name="unidade-de-medida" id="unidade-de-medida" className="border border-laranja-impacto px-2 bg-zinc-500">
                                                <option value="cm">cm</option>
                                                <option value="m">m</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                                    <div className="flex items-center gap-2 text-laranja-impacto text-shadow-[2px_2px_3px_black]">
                                        <FaUserAlt className="text-4xl" />
                                        <h3 className="font-bold text-xl">Conta</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h4>Nome</h4>
                                            <input type="text" name="nome" id="nome" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Email</h4>
                                            <input type="email" name="email" id="email" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Instituição</h4>
                                            <input type="text" name="instituicao" id="instituicao" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Alterar Senha</h4>
                                            <button className="border border-laranja-impacto px-4 text-laranja-impacto">
                                                <p>Alterar</p>
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Foto do Perfil</h4>
                                            <button className="border border-laranja-impacto px-4 text-laranja-impacto">
                                                <p>Alterar</p>
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Exportar Meus Dados</h4>
                                            <button className="border border-laranja-impacto px-4 text-laranja-impacto">
                                                <p>Exportar</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-full gap-4">
                                <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                                    <div className="flex items-center gap-2 text-laranja-impacto text-shadow-[2px_2px_3px_black]">
                                        <PiBellSimpleRingingFill className="text-4xl" />
                                        <h3 className="font-bold text-xl">Notificações</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h4>Novas simulações</h4>
                                            <input type="checkbox" name="novas-simulacoes" id="novas-simulacoes" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Relatórios Prontos</h4>
                                            <input type="checkbox" name="relatorios-prontos" id="relatorios-prontos" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Atualizações do Sistema</h4>
                                            <input type="checkbox" name="atualizacao-de-sistema" id="atualizacao-de-sistema" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Emails de Novidade</h4>
                                            <input type="checkbox" name="emails-de-novidades" id="emails-de-novidades" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Notificações pelo WhatsApp</h4>
                                            <input type="checkbox" name="notificacoes-pelo-whatsapp" id="notificacoes-pelo-whatsapp" />
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                                    <div className="flex items-center gap-2 text-laranja-impacto text-shadow-[2px_2px_3px_black]">
                                        <FaDatabase className="text-4xl" />
                                        <h3 className="font-bold text-xl">Dados do Sistema</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h4>Simulações Salvas</h4>
                                            <span>152</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Espaço utilizado</h4>
                                            <span>42.8 MB</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Último Acesso</h4>
                                            <span>Hoje, 14:32</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Limpar Histórico de Simulações</h4>
                                            <button className="border border-red-600 px-4 text-red-600">
                                                <p>Limpar</p>
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4>Exportar Todas as Simulações</h4>
                                            <button className="border border-laranja-impacto px-4 text-laranja-impacto">
                                                <p>Exportar</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full border border-laranja-impacto bg-laranja-impacto/50 rounded-xl flex justify-center items-center gap-2 py-2">
                                <div className="text-laranja-impacto text-5xl">
                                    <BsFillSave2Fill />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Salvar Alterações</h3>
                                    <span className="text-zinc-400">Aplicar todas as modificações</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <Template>
            <div className="min-h-screen font-oswald gap-4 xl:grid xl:grid-cols-[200px_1fr] 2xl:grid-cols-[280px_1fr]">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <h3 className="uppercase p-4">Menu Principal</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('dashboard')}
                                    className={getMenuClass('dashboard')}
                                >
                                    <MdOutlineDashboard className="mt-1" />
                                    <p>Dashboard</p>
                                </div>
                            </li>
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('simulacoes')}
                                    className={getMenuClass('simulacoes')}
                                >
                                    <MdOutlinePlayCircle className="mt-1" />
                                    <p>Simulações</p>
                                </div>
                            </li>
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('dados')}
                                    className={getMenuClass('dados')}
                                >
                                    <FaCube className="mt-1" />
                                    <p>Dados</p>
                                </div>
                            </li>
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('resultados')}
                                    className={getMenuClass('resultados')}
                                >
                                    <MdAutoGraph className="mt-1" />
                                    <p>Resultados</p>
                                </div>
                            </li>
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('relatorios')}
                                    className={getMenuClass('relatorios')}
                                >
                                    <IoDocumentTextOutline className="mt-1" />
                                    <p>Relatórios</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="uppercase p-4">Conta</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('perfil')}
                                    className={getMenuClass('perfil')}
                                >
                                    <FaUser className="mt-1" />
                                    <p>Perfil</p>
                                </div>
                            </li>
                            <li>
                                <div
                                    onClick={() => setMenuAtivo('configuracoes')}
                                    className={getMenuClass('configuracoes')}
                                >
                                    <FaGear className="mt-1" />
                                    <p>Configurações</p>
                                </div>
                            </li>
                            <>
                                <li>
                                    <button onClick={() => setDialogoSairAberto(true)} className={getMenuClass('sair')}>
                                        <IoLogOut className="mt-1" />
                                        <p>Sair</p>
                                    </button>
                                </li>
                                <Dialog
                                    aberto={dialogoSairAberto}
                                    titulo="Sair da conta"
                                    mensagem="Tem certeza que deseja encerrar sua sessão?"
                                    textoConfirmar="Sair"
                                    onCancelar={() => setDialogoSairAberto(false)}
                                    onConfirmar={async () => {
                                        await signOut({
                                            callbackUrl: "/login",
                                        });
                                    }}
                                />
                            </>
                        </ul>
                    </div>
                    <div className="border border-laranja-impacto m-2 p-2 rounded-xl flex flex-col gap-2 2xl:mt-6">
                        <div className="flex items-center gap-2 text-xl">
                            <FaRegLightbulb />
                            <h3>Resistência dos Materiais</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <ul className="flex flex-col gap-3">
                                {top7Resistencia.map((material, i) => {
                                    const porcentagem = (material.resistencia / maiorResistencia) * 100;
                                    return (
                                        <li
                                            key={i}
                                            className="
                                                grid
                                                grid-cols-[20px_auto_1fr_80px]
                                                gap-2
                                                items-center
                                            "
                                        >
                                            <div className="w-5 h-5 border border-zinc-600 rounded" />
                                            <h2>
                                                {material.nome}
                                            </h2>
                                            <div
                                                className="
                                                    w-full
                                                    h-2
                                                    bg-zinc-800
                                                    rounded-full
                                                    overflow-hidden
                                                "
                                            >
                                                <div
                                                    className="
                                                        h-full
                                                        bg-gradient-to-r
                                                        from-orange-500
                                                        to-orange-300
                                                        rounded-full
                                                        transition-all
                                                        duration-500
                                                    "
                                                    style={{
                                                        width: `${porcentagem}%`
                                                    }}
                                                />
                                            </div>
                                            <p className="text-right">
                                                {material.resistencia} MPa
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <span className="text-zinc-500 text-center">Baseado em simulações realizadas</span>
                        </div>
                    </div>
                </div>
                {
                    identificarMenuAtivo()
                }
            </div>
        </Template>
    )
}