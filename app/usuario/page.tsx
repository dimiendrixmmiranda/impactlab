'use client';

import Template from "@/components/template/Template";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCube, FaDatabase, FaEye, FaLightbulb, FaPencilAlt, FaPlus, FaRegBell, FaRegLightbulb, FaUser, FaUserAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoCubeOutline, IoDocumentText, IoDocumentTextOutline, IoLogOut, IoMailOutline, IoRocketOutline } from "react-icons/io5";
import { MdAutoGraph, MdMoreVert, MdOutlineDashboard, MdOutlinePlayCircle, MdOutlineScience } from "react-icons/md";
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { signOut } from "next-auth/react";
import Simulacao from "@/components/simulacao/Simulacao";
import { useUsuario } from "@/hooks/useUsuario";
import { materiais } from "@/constants/materiais";
import { useLarguraDaTela } from "@/hooks/useLarguraDaTela";
import Dialog from "@/components/dialog/Dialog";
import { dicasImpactLab } from "@/constants/dicas";
import Configuracoes from "@/components/componentesUsuario/Configuracoes";
import Perfil from "@/components/componentesUsuario/Perfil";
import Image from "next/image";
import Dashboard from "@/components/componentesUsuario/Dashboard";
import Dados from "@/components/componentesUsuario/Dados";
import Relatorios from "@/components/componentesUsuario/Relatorios";
import { useEstatisticasUsuario } from "@/hooks/useEstatisticasUsuario";
import MenuMobile from "@/components/menuMobile/MenuMobile";
import { Menu } from "@/types/Menu";



export default function Page() {

    const larguraTela = useLarguraDaTela()
    const CORES = [
        "#CB2957",
        "#FF6A1C",
        "#112E81",
        "#FFD400",
        "#007979",
        "#4F252E",
        "#0A7C6E",
    ]
    const { simulacoes, qtdeSimulacoes, simulacoesMesAtual, maiorForcaImpacto, maiorVelocidadeUsada, qtdeMateriaisDisponiveis, dadosGraficoPizza } = useEstatisticasUsuario()
    console.log(maiorForcaImpacto)
    const [menuAtivo, setMenuAtivo] = useState<Menu>('dashboard')
    // const [simulacoes, setSimulacoes] = useState<any[]>([])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(6);
    const [dialogoSairAberto, setDialogoSairAberto] = useState(false)
    const { usuario } = useUsuario()


    const [blurInterface, setBlurInterface] = useState(false)

    const top7Resistencia = [...materiais]
        .sort((a, b) => b.resistencia - a.resistencia)
        .slice(0, 7)
    const maiorResistencia = Math.max(
        ...top7Resistencia.map(
            m => m.resistencia
        )
    );


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
    // useEffect(() => {
    //     async function carregarSimulacoes() {
    //         const response = await fetch("/api/simulacao");
    //         const data = await response.json();

    //         setSimulacoes(data);
    //     }

    //     carregarSimulacoes();
    // }, []);

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
                    <Dashboard simulacoes={simulacoes} simulacoesMesAtual={simulacoesMesAtual} maiorForcaImpacto={maiorForcaImpacto} maiorVelocidadeUsada={maiorVelocidadeUsada} qtdeMateriaisDisponiveis={qtdeMateriaisDisponiveis} qtdeSimulacoes={qtdeSimulacoes} dadosGraficoPizza={dadosGraficoPizza} />
                )
            case 'simulacoes':
                return (
                    <Simulacao formato="horizontal" />
                )
            case 'dados':
                return (
                    <Dados />
                )
            case 'relatorios':
                return (
                    <Relatorios />
                )
            case 'perfil':
                return (
                    <Perfil />
                )
            case 'configuracoes':
                return (
                    <Configuracoes />
                )
            default:
                break;
        }
    }

    if (!usuario) {
        return (
            <div className="bg-zinc-900 w-full min-h-screen flex justify-center items-center">
                <h3 className="text-4xl font-oswald text-shadow-[1px_1px_2px_black] xl:text-7xl">Carregando....</h3>
            </div>
        )
    }

    return (
        <Template>
            <div className="min-h-screen relative font-oswald gap-4 xl:grid xl:grid-cols-[200px_1fr] 2xl:grid-cols-[280px_1fr]">
                <div className="flex-col hidden xl:flex">
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
                    <div className="border border-laranja-impacto bg-laranja-impacto text-shadow-[1px_1px_2px_black] m-2 p-2 rounded-xl flex flex-col gap-2 2xl:mt-6">
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
                                                grid-cols-[20px_1fr_70px]
                                                gap-2
                                                items-center
                                            "
                                        >
                                            <div className="relative w-5 h-5 border border-zinc-600 rounded">
                                                <Image alt={material.nome} src={material.imagem} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <h2 className="line-clamp-1">
                                                    {material.nome}
                                                </h2>
                                                <div
                                                    className="
                                                            w-full
                                                            h-2
                                                            bg-zinc-800
                                                            rounded-full
                                                            overflow-hidden border border-zinc-950
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
                                            </div>
                                            <p className="text-right">
                                                {material.resistencia} MPa
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <span className="text-zinc-200 text-center">Baseado em simulações realizadas</span>
                        </div>
                    </div>
                </div>
                {
                    identificarMenuAtivo()
                }
                <MenuMobile menuAtivo={menuAtivo} setMenuAtivo={setMenuAtivo}/>
            </div>
        </Template>
    )
}