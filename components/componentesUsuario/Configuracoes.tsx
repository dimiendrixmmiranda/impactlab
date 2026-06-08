'use client'

import { dicasImpactLab } from "@/constants/dicas";
import { useState } from "react";
import { BsFillSave2Fill } from "react-icons/bs";
import { FaDatabase, FaUserAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosTv } from "react-icons/io";
import { MdOutlineScience } from "react-icons/md";
import { PiBellSimpleRingingFill } from "react-icons/pi";

export default function Configuracoes() {
    const [blurInterface, setBlurInterface] = useState(false)
    const [animacoes, setAnimacoes] = useState(false)
    const [sons, setSons] = useState(false)
    const [efeitosDeFundo, setEfeitosDeFundo] = useState(false)
    const [autoSalvarResultados, setAutoSalvarResultados] = useState(false)
    const [mostrarFormulas, setMostrarFormulas] = useState(false)
    const [exibirAnimacoes, setExibirAnimacoes] = useState(false)
    const [novasSimulacoes, setNovasSimulacoes] = useState(false)
    const [relatoriosProntos, setRelatoriosProntos] = useState(false)
    const [atualizacoesDeSistema, setAtualizacoesDeSistema] = useState(false)
    const [emailsDeNovidades, setEmailsDeNovidades] = useState(false)
    const [notificacoesPeloWhatsapp, setNotificacoesPeloWhatsapp] = useState(false)


    const [tema, setTema] = useState<'escuro' | 'claro'>('escuro')
    const [escalaDeInterface, setEscalaDeInterface] = useState<'100' | '80'>('100')
    const [tempoPadraoDeImpacto, setTempoPadraoDeImpacto] = useState<'1' | '5'>('1')
    const [precisaoDosCalculos, setPrecisaoDosCalculos] = useState<'alta' | 'media' | 'baixa'>('alta')
    const [unidadeDeMedida, setUnidadeDeMedida] = useState<'cm' | 'm'>('cm')

    const dicaAleatoria = dicasImpactLab[Math.floor(Math.random() * dicasImpactLab.length)]

    const gerarInputCheckBox = (titulo: string, valor: boolean, setValor: (valor: boolean) => void) => {
        return (
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h4>{titulo}</h4>
                </div>

                <label className="relative inline-flex cursor-pointer items-center">
                    <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={valor}
                        onChange={(e) => setValor(e.target.checked)}
                    />
                    <div
                        className="
                            h-7 w-14 rounded-full
                            bg-zinc-700
                            transition-all duration-300
                            border border-zinc-400
                            peer-checked:bg-orange-500
                            after:absolute
                            after:left-1
                            after:top-1
                            after:h-5
                            after:w-5
                            after:rounded-full
                            after:bg-white
                            after:transition-all
                            after:duration-300
                            peer-checked:after:translate-x-7
                        "
                    />
                </label>
            </div>
        )
    }

    const gerarSelect = (
        titulo: string,
        valor: string,
        setValor: (valor: any) => void,
        arrayDeOpt: {
            valor: string
            label: string
        }[]
    ) => {
        return (
            <div className="flex justify-between items-center">
                <h4>{titulo}</h4>

                <select
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="border border-laranja-impacto bg-laranja-energia px-2 py-[1px] w-[100px] text-shadow-[1px_1px_2px_black]"
                >
                    {arrayDeOpt.map((opt, i) => (
                        <option
                            key={i}
                            value={opt.valor}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    const gerarBotao = (titulo: string, labelBotao: string) => {
        return (
            <div className="flex justify-between items-center">
                <h4>{titulo}</h4>
                <button className="border border-laranja-impacto px-4 bg-laranja-energia w-[100px] py-[2px] text-shadow-[1px_1px_2px_black]">
                    <p>{labelBotao}</p>
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 overflow-hidden p-4">
            <div className="flex flex-col gap-4 w-full items-center justify-between">
                <div className="flex flex-col gap-2 w-full">
                    <h2 className="font-bold text-4xl">Configurações do Sistema</h2>
                    <p>Personalize sua experiência no <b className="text-laranja-impacto">ImpactLab</b></p>
                </div>
                <div className="grid grid-cols-3 w-full gap-4">
                    <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                        <div className="flex items-center gap-2 text-shadow-[2px_2px_3px_black]">
                            <IoIosTv className="text-4xl text-laranja-impacto" />
                            <h3 className="font-bold text-xl">Lista de Relatórios</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                gerarInputCheckBox(
                                    'Animações',
                                    animacoes,
                                    setAnimacoes
                                )
                            }
                            {
                                gerarSelect(
                                    "Tema",
                                    tema,
                                    setTema,
                                    [
                                        { valor: "escuro", label: "Escuro" },
                                        { valor: "claro", label: "Claro" }
                                    ]
                                )
                            }
                            {
                                gerarInputCheckBox(
                                    'Sons',
                                    sons,
                                    setSons
                                )
                            }
                            {
                                gerarInputCheckBox(
                                    'Efeitos de Fundo',
                                    efeitosDeFundo,
                                    setEfeitosDeFundo
                                )
                            }
                            {
                                gerarInputCheckBox('Blur da Interface', blurInterface, setBlurInterface)
                            }
                            {
                                gerarSelect(
                                    "Escala de Interface",
                                    escalaDeInterface,
                                    setEscalaDeInterface,
                                    [
                                        { valor: "100", label: "100" },
                                        { valor: "80", label: "80" }
                                    ]
                                )
                            }
                        </div>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                        <div className="flex items-center gap-2 text-shadow-[2px_2px_3px_black]">
                            <MdOutlineScience className="text-4xl text-laranja-impacto" />
                            <h3 className="font-bold text-xl">Configuração de Simulação</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                gerarSelect(
                                    "Tempo Padrao de Impacto",
                                    tempoPadraoDeImpacto,
                                    setTempoPadraoDeImpacto,
                                    [
                                        { valor: "1", label: "1" },
                                        { valor: "5", label: "5" }
                                    ]
                                )
                            }
                            {
                                gerarSelect(
                                    "Precisão dos Cálculos",
                                    precisaoDosCalculos,
                                    setPrecisaoDosCalculos,
                                    [
                                        { valor: "alta", label: "alta" },
                                        { valor: "media", label: "media" },
                                        { valor: "baixa", label: "baixa" },
                                    ]
                                )
                            }
                            {
                                gerarInputCheckBox('Auto Salvar Resultados', autoSalvarResultados, setAutoSalvarResultados)
                            }
                            {
                                gerarInputCheckBox('Mostrar Fórmulas', mostrarFormulas, setMostrarFormulas)
                            }
                            {
                                gerarInputCheckBox('Exibir Animações', exibirAnimacoes, setExibirAnimacoes)
                            }
                            {
                                gerarSelect(
                                    "Unidade de Medida",
                                    unidadeDeMedida,
                                    setUnidadeDeMedida,
                                    [
                                        { valor: "cm", label: "cm" },
                                        { valor: "m", label: "m" },
                                    ]
                                )
                            }
                        </div>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                        <div className="flex items-center gap-2 text-shadow-[2px_2px_3px_black]">
                            <FaUserAlt className="text-4xl text-laranja-impacto" />
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
                            {
                                gerarBotao('Alterar Senha', 'Alterar')
                            }
                            {
                                gerarBotao('Foto do Perfil', 'Alterar')
                            }
                            {
                                gerarBotao('Exportar Dados', 'Exportar')
                            }
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 w-full gap-4">
                    <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                        <div className="flex items-center gap-2 text-shadow-[2px_2px_3px_black]">
                            <PiBellSimpleRingingFill className="text-4xl text-laranja-impacto" />
                            <h3 className="font-bold text-xl">Notificações</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            {
                                gerarInputCheckBox(
                                    'Movas Simulacoes',
                                    novasSimulacoes,
                                    setNovasSimulacoes
                                )
                            }
                            {
                                gerarInputCheckBox(
                                    'Relatorios Prontos',
                                    relatoriosProntos,
                                    setRelatoriosProntos
                                )
                            }
                            {
                                gerarInputCheckBox(
                                    'Atualizações de Sistema',
                                    atualizacoesDeSistema,
                                    setAtualizacoesDeSistema
                                )
                            }
                            {
                                gerarInputCheckBox(
                                    'Emails de Novidade',
                                    emailsDeNovidades,
                                    setEmailsDeNovidades
                                )
                            }
                            {
                                gerarInputCheckBox(
                                    'Notificações pelo Whatsapp',
                                    notificacoesPeloWhatsapp,
                                    setNotificacoesPeloWhatsapp
                                )
                            }
                        </div>
                    </div>
                    <div className="rounded-xl p-4 flex flex-col gap-4 bg-zinc-700">
                        <div className="flex items-center gap-2 text-shadow-[2px_2px_3px_black]">
                            <FaDatabase className="text-4xl text-laranja-impacto" />
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
                                <button className="border border-red-700 px-4 bg-red-600 w-[100px] py-[2px] text-shadow-[1px_1px_2px_black]">
                                    <p>Limpar</p>
                                </button>
                            </div>
                            {
                                gerarBotao('Exportar Todas as Simulacoes', 'Exportar')
                            }
                        </div>
                    </div>
                </div>
                <div className="border border-zinc-700 bg-zinc-700 flex flex-col p-4 rounded-xl gap-4 h-full w-full">
                    <div className="flex flex-col gap-4 h-full">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-xl 3xl:text-2xl">
                                {dicaAleatoria.titulo}
                            </h2>
                            <span className="line-clamp-4 4xl:text-xl">
                                {dicaAleatoria.descricao}
                            </span>
                        </div>
                        <button className="flex text-nowrap items-center bg-laranja-impacto text-shadow-[1px_1px_2px_black] p-2 rounded-xl text-center justify-center mt-auto text-2xl">
                            <p>Ver todas as dicas</p>
                            <IoIosArrowForward className="pt-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}