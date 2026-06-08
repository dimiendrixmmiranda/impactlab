'use client'
import { useUsuario } from "@/hooks/useUsuario";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaPencilAlt, FaRegBell } from "react-icons/fa";
import { GiNotebook, GiPadlock } from "react-icons/gi";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { IoIosCamera, IoIosColorPalette, IoMdArrowDropright } from "react-icons/io";
import { SiMubi } from "react-icons/si";
import { TbHexagonNumber1Filled, TbHexagonNumber5Filled } from "react-icons/tb";
import { TiWorld } from "react-icons/ti";
import { MdOutlineScience } from "react-icons/md";
import { IoCubeOutline, IoRocketOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";

export default function Perfil() {
    const { usuario } = useUsuario()

    const gerarCampoInformacaoDado = (icone: React.ReactNode, titulo: string, quantidade: string) => {
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
                                gerarCampoInformacaoDado(<MdOutlineScience />, 'Simulações Realizadas', '12')
                            }
                            {
                                gerarCampoInformacaoDado(<IoCubeOutline />, 'Materiais Testados', '12')
                            }
                            {
                                gerarCampoInformacaoDado(<SlEnergy />, 'Força Máxima', '12')
                            }
                            {
                                gerarCampoInformacaoDado(<IoRocketOutline />, 'Simulações Realizadas', '12')
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
                                    <select name="tema" id="tema" className="border border-laranja-impacto bg-laranja-energia px-2 py-[1px] w-[100px] text-shadow-[1px_1px_2px_black]">
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
                                    <select name="tema" id="tema" className="border border-laranja-impacto bg-laranja-energia px-2 py-[1px] w-[100px] text-shadow-[1px_1px_2px_black]">
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
                                    <select name="autenticacao-dois-fatores" id="autenticacao-dois-fatores" className="border border-laranja-impacto bg-laranja-energia px-2 py-[1px] w-[100px] text-shadow-[1px_1px_2px_black]">
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
}