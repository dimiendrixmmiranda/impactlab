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
import { MdOutlineSave, MdOutlineScience } from "react-icons/md";
import { IoCubeOutline, IoLogOut, IoRocketOutline } from "react-icons/io5";
import { SlEnergy } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import { forcaImpacto } from "@/constants/formulas";
import { signOut } from "next-auth/react";
import { Dialog } from 'primereact/dialog';
import DialogPersonalizado from "../dialog/Dialog";

export default function Perfil() {
    const { usuario } = useUsuario()
    const [simulacoes, setSimulacoes] = useState<any[]>([])
    const inputRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState(false);

    // valores editar informações
    const [senha, setSenha] = useState<string>('')
    const [novaSenha, setNovaSenha] = useState<string>('')

    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [dataNascimento, setDataNascimento] = useState('')
    const [instituicao, setInstituicao] = useState<string>('')
    const [localizacao, setLocalizacao] = useState<string>('')
    const [bio, setBio] = useState<string>('')

    const [dialogoSairAberto, setDialogoSairAberto] = useState(false)

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome)
            setEmail(usuario.email)
            setDataNascimento(
                usuario.dataNascimento
                    ? new Date(usuario.dataNascimento)
                        .toISOString()
                        .split('T')[0]
                    : ''
            )
        }
    }, [usuario])

    const selecionarImagem = () => {
        inputRef.current?.click();
    }
    const [imagemPerfil, setImagemPerfil] =
        useState("");

    const materiaisTestados = new Set(
        simulacoes.map(simulacao => simulacao.material)
    )

    const quantidadeMateriaisTestados =
        materiaisTestados.size

    const maiorForcaImpacto =
        simulacoes.length > 0
            ? Math.max(
                ...simulacoes.map(simulacao =>
                    forcaImpacto(
                        simulacao.massa,
                        simulacao.velocidade
                    )
                )
            )
            : 0

    useEffect(() => {
        async function carregarSimulacoes() {
            const response = await fetch("/api/simulacao");
            const data = await response.json();

            setSimulacoes(data);
        }

        carregarSimulacoes();
    }, []);

    async function handleUpdateInformacoes() {
        const response = await fetch("/api/user/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                email,
                dataNascimento,
                instituicao,
                localizacao,
                bio,
                imagem: imagemPerfil,
                senha,
                novaSenha,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        alert("Informações atualizadas com sucesso!");
        setVisible(false);
    }

    const handleImagem = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
            "/api/upload",
            {
                method: "POST",
                body: formData,
            }
        );
        const usuario = await response.json();
        setImagemPerfil(usuario.imagem);
    }

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
                    <div className="flex jusce gap-2 leading-4">
                        <p className="text-3xl font-bold text-shadow-[2px_2px_3px_black] text-center">
                            {quantidade}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (!usuario) {
        return (
            <div className="bg-zinc-900 w-full min-h-screen flex justify-center items-center">
                <h3 className="text-4xl font-oswald text-shadow-[1px_1px_2px_black] xl:text-7xl">Carregando....</h3>
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
                <div className="w-full flex flex-col gap-6 xl:grid xl:grid-cols-2 xl:gap-4">
                    <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                            <h3 className="font-bold text-xl">Informações Pessoais</h3>
                            <button onClick={() => setVisible(true)} className="flex items-center gap-2 border border-laranja-impacto px-2 py-1 text-laranja-impacto rounded-xl">
                                <FaPencilAlt />
                                <p>Editar Informações</p>
                            </button>
                        </div>
                        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-3 justify-center items-center">
                                <div className="relative w-[130px] h-[130px] rounded-full bg-zinc-950 overflow-hidden 3xl:w-[160px] 3xl:h-[160px]">
                                    <img
                                        src={imagemPerfil || usuario?.imagem || ""}
                                        alt="Foto de perfil"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImagem}
                                />
                                <button
                                    type="button"
                                    onClick={selecionarImagem}
                                    className="flex items-center justify-center gap-1 border border-laranja-impacto rounded-xl text-laranja-impacto px-6 py-1"
                                >
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
                                    <p className="line-clamp-1">{usuario.instituicao || 'Nenhuma informação encontrada'}</p>
                                </div>
                                <div>
                                    <span className="text-zinc-400 text-sm">Localização (Brasil)</span>
                                    <p className="line-clamp-1">{usuario.localizacao || 'Nenhuma informação encontrada'}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="text-zinc-400 text-sm">Bio</span>
                                    <p className="line-clamp-1">{usuario.bio || 'Nenhuma informação encontrada'}</p>
                                </div>
                            </div>
                        </div>
                        <Dialog header={<div><h2 className="font-oswald text-2xl text-white pb-2">Informações</h2></div>} visible={visible} className="w-full max-w-[1000px] mx-4 p-4" onHide={() => { if (!visible) return; setVisible(false); }}>
                            <form className="bg-cinza-grafite text-white flex flex-col px-2 gap-4 md:grid md:grid-cols-2">
                                <div className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative w-[130px] h-[130px] rounded-full bg-zinc-950 overflow-hidden 3xl:w-[160px] 3xl:h-[160px]">
                                        <img
                                            src={imagemPerfil || usuario?.imagem || ""}
                                            alt="Foto de perfil"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImagem}
                                    />
                                    <button
                                        type="button"
                                        onClick={selecionarImagem}
                                        className="flex items-center justify-center gap-1 border border-laranja-impacto rounded-xl text-laranja-impacto px-6 py-1"
                                    >
                                        <p>Alterar foto</p>
                                        <IoIosCamera className="mt-1" />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="senha">Informe a Senha Atual</label>
                                        <input type="text" name="senha" id="senha" className="border border-zinc-400 p-2 rounded-xl" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="novaSenha">Informe a Nova Senha:</label>
                                        <input type="text" name="novaSenha" id="novaSenha" className="border border-zinc-400 p-2 rounded-xl" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="nome">Nome</label>
                                        <input type="text" name="nome" id="nome" className="border border-zinc-400 p-2 rounded-xl" value={nome} onChange={(e) => setNome(e.target.value)} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" className="border border-zinc-400 p-2 rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                                    <input type="date" name="dataNascimento" id="dataNascimento" className="border border-zinc-400 p-2 rounded-xl" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="instituicao">Instituição</label>
                                    <input type="text" name="instituicao" id="instituicao" className="border border-zinc-400 p-2 rounded-xl" value={instituicao} onChange={(e) => setInstituicao(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="localizacao">Localização</label>
                                    <input type="text" name="localizacao" id="localizacao" className="border border-zinc-400 p-2 rounded-xl" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
                                </div>
                                <div className="flex flex-col gap-1 md:col-span-2">
                                    <label htmlFor="text">Bio</label>
                                    <textarea name="bio" id="bio" className="border border-zinc-400 p-2 rounded-xl h-[100px]" value={bio} onChange={(e) => setBio(e.target.value)} />
                                </div>
                                <button className="flex items-center gap-2 text-center justify-center bg-laranja-impacto font-bold text-shadow-[1px_1px_2px_black] p-2 rounded-xl text-xl col-span-2" onClick={(e) => {
                                    e.preventDefault()
                                    handleUpdateInformacoes()
                                }}>
                                    <MdOutlineSave className="drop-shadow-[1px_1px_2px_black]" />
                                    <p>Salvar Alterações</p>
                                </button>
                            </form>
                        </Dialog>
                    </div>
                    <div className="bg-zinc-700 p-4 rounded-xl flex flex-col gap-4">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-xl">Resumo de Atividade</h3>
                        </div>
                        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                            {
                                gerarCampoInformacaoDado(<MdOutlineScience />, 'Simulações Realizadas', simulacoes.length.toString())
                            }
                            {
                                gerarCampoInformacaoDado(<IoCubeOutline />, 'Materiais Testados', quantidadeMateriaisTestados.toString())
                            }
                            {
                                gerarCampoInformacaoDado(<SlEnergy />, 'Força Máxima', `${maiorForcaImpacto}N`)
                            }
                            {
                                gerarCampoInformacaoDado(<IoRocketOutline />, 'Relatórios Gerados', '0')
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
                        <div className="grid grid-cols-2 gap-4 2xl:grid-cols-3">
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
                            <div className="flex items-center gap-2 bg-zinc-600 p-2 px-4 rounded-xl md:col-span-2 2xl:col-span-1">
                                <div className="relative w-10 h-10 rounded-xl flex justify-center items-center border border-zinc-500 text-lg">
                                    <IoLogOut />
                                </div>
                                <div>
                                    <h3>Sair</h3>
                                    <p className="text-sm">Encerrar sessão...</p>
                                </div>
                                <button onClick={() => setDialogoSairAberto(true)} className="flex items-center gap-2 border border-laranja-impacto px-2 py-1 text-laranja-impacto rounded-xl ml-auto">
                                    <GiNotebook />
                                    <p>Encerrar</p>
                                </button>
                            </div>
                            <DialogPersonalizado
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}