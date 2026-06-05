'use client';

import Template from "@/components/template/Template";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCube, FaLightbulb, FaPlus, FaRegLightbulb, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoDocumentTextOutline, IoLogOut } from "react-icons/io5";
import { MdAutoGraph, MdOutlineDashboard, MdOutlinePlayCircle } from "react-icons/md";
import { PiAtomBold, PiCubeBold, PiFlaskBold, PiLightningBold, PiRocketLaunchBold } from "react-icons/pi";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { signOut } from "next-auth/react";

export default function Page() {

    const gerarCampo = (icone: React.ReactNode, titulo: string, quantidade: string) => {
        return (
            <div className="bg-zinc-700 p-4 rounded-xl flex items-center">
                <div className="text-6xl">
                    {icone}
                </div>
                <div>
                    <h3 className="">
                        {titulo}
                    </h3>
                    <div className="flex gap-2 leading-4">
                        <p className="text-2xl font-bold">
                            {quantidade}
                        </p>
                        <p className="text-sm mt-auto">+12 este mês</p>
                    </div>
                </div>
            </div>
        )
    }
    const [simulacoes, setSimulacoes] = useState<any[]>([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

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

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/"
        });
    };

    console.log(simulacoes)
    const simulacoesPaginadas = simulacoes.slice(
        first,
        first + rows
    )
    return (
        <Template>
            <div className="min-h-screen font-oswald gap-4 xl:grid xl:grid-cols-[200px_1fr] 2xl:grid-cols-[280px_1fr]">
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <h3 className="uppercase p-4">Menu Principal</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full bg-laranja-impacto px-4 py-2">
                                    <MdOutlineDashboard className="mt-1" />
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <MdOutlinePlayCircle className="mt-1" />
                                    <p>Simulações</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <FaCube className="mt-1" />
                                    <p>Dados</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <MdAutoGraph className="mt-1" />
                                    <p>Resultados</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <IoDocumentTextOutline className="mt-1" />
                                    <p>Relatórios</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="uppercase p-4">Conta</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <FaUser className="mt-1" />
                                    <p>Perfil</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <FaGear className="mt-1" />
                                    <p>Configurações</p>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => handleLogout()} className="flex items-center gap-1 text-xl w-full px-4 py-2">
                                    <IoLogOut className="mt-1" />
                                    <p>Sair</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="border border-laranja-impacto m-2 p-2 rounded-xl flex flex-col gap-2 2xl:mt-6">
                        <div className="flex items-center gap-2 text-xl">
                            <FaRegLightbulb />
                            <h3>Resistência dos Materiais</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <ul className="flex flex-col gap-3">
                                <li className="grid grid-cols-[20px_auto_1fr_40px] gap-1">
                                    <div className="w-5 h-5 relative my-auto bg-red-500"></div>
                                    <h2>Aço</h2>
                                    <div className="w-full h-2 border border-laranja-energia rounded-lg my-auto"></div>
                                    <p>35.6kN</p>
                                </li>
                                <li className="grid grid-cols-[20px_auto_1fr_40px] gap-1">
                                    <div className="w-5 h-5 relative my-auto bg-red-500"></div>
                                    <h2>Aço</h2>
                                    <div className="w-full h-2 border border-laranja-energia rounded-lg my-auto"></div>
                                    <p>35.6kN</p>
                                </li>
                                <li className="grid grid-cols-[20px_auto_1fr_40px] gap-1">
                                    <div className="w-5 h-5 relative my-auto bg-red-500"></div>
                                    <h2>Aço</h2>
                                    <div className="w-full h-2 border border-laranja-energia rounded-lg my-auto"></div>
                                    <p>35.6kN</p>
                                </li>
                                <li className="grid grid-cols-[20px_auto_1fr_40px] gap-1">
                                    <div className="w-5 h-5 relative my-auto bg-red-500"></div>
                                    <h2>Aço</h2>
                                    <div className="w-full h-2 border border-laranja-energia rounded-lg my-auto"></div>
                                    <p>35.6kN</p>
                                </li>
                                <li className="grid grid-cols-[20px_auto_1fr_40px] gap-1">
                                    <div className="w-5 h-5 relative my-auto bg-red-500"></div>
                                    <h2>Aço</h2>
                                    <div className="w-full h-2 border border-laranja-energia rounded-lg my-auto"></div>
                                    <p>35.6kN</p>
                                </li>
                                <li className="grid grid-cols-[20px_auto_1fr_40px] gap-1">
                                    <div className="w-5 h-5 relative my-auto bg-red-500"></div>
                                    <h2>Aço</h2>
                                    <div className="w-full h-2 border border-laranja-energia rounded-lg my-auto"></div>
                                    <p>35.6kN</p>
                                </li>
                            </ul>
                            <span className="text-zinc-500 text-center">Baseado em simulações realizadas</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 overflow-hidden p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-4xl">Dashboard</h2>
                            <p>Bem vindo de volta, Dimi! 👋</p>
                        </div>
                        <div className="flex items-center gap-1 bg-laranja-impacto rounded-xl p-2">
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
                            '120 m/s'
                        )}
                    </div>
                    <div className="xl:grid xl:grid-cols-[700px_1fr] xl:grid-rows-[360px_auto] xl:gap-6 2xl:grid-cols-[800px_auto] 3xl:grid-cols-[auto_1fr] 3xl:grid-rows-[340px_auto]">
                        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex flex-col xl:row-start-1 xl:row-end-3">
                            <h3 className="text-3xl font-bold mb-4">
                                Simulações recentes
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] 2xl:h-[600px] 3xl:h-[550px]">
                                    <thead>
                                        <tr className="border-b border-zinc-600 text-zinc-400 text-sm uppercase">
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
                                            transition-colors"
                                            >
                                                <td className="py-4">
                                                    <div className="flex gap-3 items-center">
                                                        <div className="w-16 h-10 rounded bg-zinc-600" />
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
                                                <td className="text-center uppercase">
                                                    {sim.material.split('-')[0]}
                                                </td>
                                                <td className="text-center">
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
                                                <td className="text-center">
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
                                                <td className="text-center">
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>
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
                        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex flex-col gap-3 2xl:p-6">
                            <h3 className="text-3xl font-bold mb-4">
                                Materiais mais utilizados
                            </h3>
                            <div className="w-full h-full 4xl:grid 4xl:grid-cols-2 3xl:gap-4">
                                <div className="w-full h-full bg-red-500 mx-auto 3xl:m-0"></div>
                            </div>
                        </div>
                        <div className="bg-zinc-800 border border-zinc-700 rounded-xl flex flex-col gap-4 p-4 2xl:p-6">
                            <div className="flex items-center gap-2">
                                <FaLightbulb className="text-4xl text-amber-500" />
                                <h3 className="text-3xl font-bold">
                                    Dicas Rápidas
                                </h3>
                            </div>
                            <div className="border border-zinc-700 flex flex-col p-4 rounded-xl gap-4 h-full">
                                <div className="flex flex-col gap-2 h-full">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="font-bold text-xl">Dica de hoje</h2>
                                        <span className="line-clamp-4 4xl:text-lg">
                                            Para resultados ainda mais precisos, certifique-se de inserir corretamente as propriedades do material e as condições de impacto.
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
            </div>
        </Template>
    )
}