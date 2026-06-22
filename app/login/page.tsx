'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Template from "@/components/template/Template";
import Link from "next/link";
import { useState } from "react";
import { CgMicrosoft } from "react-icons/cg";
import { FaGithub, FaGoogle, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { GiPadlock } from "react-icons/gi";
import { GoShieldCheck } from "react-icons/go";
import { IoIosCreate } from "react-icons/io";
import { IoLogIn, IoMailOutline } from "react-icons/io5";
import { TbCubeSpark, TbTargetArrow } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

export default function Page() {
    const [active, setActive] = useState<'login' | 'create'>('login')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [sexo, setSexo] = useState('')
    const [dataDeNascimento, setDataDeNascimento] = useState('')

    const router = useRouter();

    const cadastrar = async () => {

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem");
            return;
        }

        const response =
            await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    sexo,
                    imagem: sexo == 'masculino' ? '/users/usuario-masculino.png' : '/users/usuario-feminino.png',
                    dataNascimento: dataDeNascimento,
                    instituicao: '',
                    localizacao: '',
                    bio: ''
                })
            });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        alert("Conta criada com sucesso!");
        router.push("/usuario");

        setActive("login");

        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
        setSexo("");
    }

    const fazerLogin = async () => {
        const result =
            await signIn("credentials", {
                email,
                password: senha,
                redirect: false
            });

        if (result?.error) {
            alert("Email ou senha inválidos");
            return;
        }

        router.push("/usuario");
    }

    return (
        <Template>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 p-4 font-oswald xl:py-10 2xl:p-16">
                <div className="bg-cinza-grafite rounded-xl overflow-hidden lg:grid lg:grid-cols-2 border border-zinc-500">
                    <div
                        className="flex flex-col gap-5 p-4 border-r border-zinc-500 lg:p-8"
                        style={{
                            backgroundColor: '#1b1b1b',
                            backgroundImage: "url('/assets/bola-parede-3.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div>
                            <p className="uppercase text-lg text-laranja-impacto">Bem vindo ao</p>
                            <div className="font-bold uppercase text-4xl flex flex-col gap-2">
                                <h2 className="uppercas font-bold text-4xl font-oswald">Impact<b className="text-laranja-impacto">Lab</b></h2>
                            </div>
                            <span>Simulador inteligente de impacto e resistência de materiais.</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <ul className="flex flex-col gap-4">
                                <li className="flex gap-2">
                                    <div className="relative w-16 h-16 rounded-xl border border-laranja-impacto text-4xl text-laranja-impacto flex justify-center items-center">
                                        <TbTargetArrow />
                                    </div>
                                    <div>
                                        <h2 className="uppercase font-bold text-2xl">Simulações realistas</h2>
                                        <p>Modele impactos e analise o comportamento de diferentes materiais.</p>
                                    </div>
                                </li>
                                <li className="flex gap-2">
                                    <div className="relative w-16 h-16 rounded-xl border border-laranja-impacto text-4xl text-laranja-impacto flex justify-center items-center">
                                        <VscGraph />
                                    </div>
                                    <div>
                                        <h2 className="uppercase font-bold text-2xl">Resultados precisos</h2>
                                        <p>Cálculos avançados baseados em princípios da física e engenharia.</p>
                                    </div>
                                </li>
                                <li className="flex gap-2">
                                    <div className="relative w-16 h-16 rounded-xl border border-laranja-impacto text-4xl text-laranja-impacto flex justify-center items-center">
                                        <GoShieldCheck />
                                    </div>
                                    <div>
                                        <h2 className="uppercase font-bold text-2xl">Segurança e privacidade</h2>
                                        <p>Seus dados e simulações protegidos com total segurança</p>
                                    </div>
                                </li>
                                <li className="flex gap-2">
                                    <div className="relative w-16 h-16 rounded-xl border border-laranja-impacto text-4xl text-laranja-impacto flex justify-center items-center">
                                        <TbCubeSpark />
                                    </div>
                                    <div>
                                        <h2 className="uppercase font-bold text-2xl">Acesse em qualquer lugar</h2>
                                        <p>Sua conta, suas simulações disponíveis sempre que precisar.</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="grid grid-cols-[40px_1fr_40PX] w-fit gap-4 max-w-[500px] p-4 rounded-xl border border-zinc-500 mx-auto mt-4">
                                <FaQuoteLeft className="text-4xl text-laranja-impacto" />
                                <p>Transformamos conceitos acadêmicos em simulações reais que ajudam a entender, visualizar e prever o comportamento dos materiais.</p>
                                <FaQuoteRight className="text-4xl text-laranja-impacto" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-900 lg:p-8">
                        <div className="border border-zinc-500 rounded-xl bg-zinc-900">
                            <div className="w-full grid grid-cols-2 gap-4 bg-zinc-800 rounded-t-xl border-t border-zinc-500 lg:px-6">
                                <button onClick={() => setActive('login')} className={`cursor-pointer flex items-center justify-center gap-2 text-2xl px-4 py-2  z-10 ${active === 'login' ? 'border-b border-laranja-impacto' : ''}`}>
                                    <IoLogIn />
                                    <p>Entrar</p>
                                </button>
                                <button onClick={() => setActive('create')} className={`cursor-pointer flex items-center justify-center gap-2 text-2xl px-4 py-2  z-10 ${active === 'create' ? 'border-b border-laranja-impacto' : ''}`}>
                                    <IoIosCreate />
                                    <p>Criar conta</p>
                                </button>
                            </div>
                            <div className="p-4">
                                {
                                    active === 'login' ? (
                                        <div className="flex flex-col gap-4">
                                            <h3 className="text-4xl font-bold">Acesse sua conta</h3>
                                            <p className="text-lg">Entre para continuar suas simulações.</p>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-lg" htmlFor="email">Email</label>
                                                    <div className="relative">
                                                        <IoMailOutline className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                        <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-lg" htmlFor="senha">Senha</label>
                                                    <div className="relative">
                                                        <GiPadlock className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                        <input type="password" name="senha" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-1">
                                                        <label htmlFor="lembrar">Lembrar de mim</label>
                                                        <input type="checkbox" name="lembrar" id="lembrar" />
                                                    </div>
                                                    <div>
                                                        <p className="text-laranja-impacto">Esqueci minha senha</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <button className="w-full h-full flex justify-center items-center bg-laranja-impacto text-xl rounded-xl py-2" onClick={fazerLogin}
                                                    >Entrar</button>
                                                </div>
                                                <div className="relative w-full flex justify-center items-center">
                                                    <div className="absolute top-[60%] left-0 w-[30%] h-[2px] bg-zinc-500" style={{ transform: 'translate(0,-50%)' }} />
                                                    <p className="text-zinc-500">ou continue com </p>
                                                    <div className="absolute top-[60%] right-0 w-[30%] h-[2px] bg-zinc-500" style={{ transform: 'translate(0,-50%)' }} />
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <button className="flex items-center justify-center gap-2 border p-2 rounded-xl border-zinc-500">
                                                        <FaGoogle />
                                                        <p>Google</p>
                                                    </button>
                                                    <button className="flex items-center justify-center gap-2 border p-2 rounded-xl border-zinc-500">
                                                        <FaGithub />
                                                        <p>Github</p>
                                                    </button>
                                                    <button className="flex items-center justify-center gap-2 border p-2 rounded-xl border-zinc-500">
                                                        <CgMicrosoft />
                                                        <p>Microsoft</p>
                                                    </button>
                                                </div>
                                                <button onClick={() => setActive('create')} className="text-center mx-auto w-full flex justify-center items-center gap-1">Ainda não tem uma conta? <b className="text-laranja-impacto">Criar conta</b></button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <label className="text-lg" htmlFor="nome">Nome</label>
                                                <div className="relative">
                                                    <IoMailOutline className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                    <input type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="text-lg" htmlFor="email">Email</label>
                                                <div className="relative">
                                                    <IoMailOutline className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                    <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                </div>
                                            </div>
                                            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-lg" htmlFor="senha">Senha</label>
                                                    <div className="relative">
                                                        <GiPadlock className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                        <input type="password" name="senha" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                    </div>
                                                </div><div className="flex flex-col gap-1">
                                                    <label className="text-lg" htmlFor="confirmarSenha">Confirmar senha</label>
                                                    <div className="relative">
                                                        <GiPadlock className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                        <input type="password" name="confirmarSenha" id="confirmarSenha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-lg" htmlFor="dataDeNascimento">Data de Nascimento</label>
                                                    <div className="relative">
                                                        <GiPadlock className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                        <input type="date" name="dataDeNascimento" id="dataDeNascimento" value={dataDeNascimento} onChange={(e) => setDataDeNascimento(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8" />
                                                    </div>
                                                </div><div className="flex flex-col gap-1">
                                                    <label className="text-lg" htmlFor="sexo">Sexo</label>
                                                    <div className="relative">
                                                        <GiPadlock className="absolute top-[50%] left-2" style={{ transform: 'translate(0,-50%)' }} />
                                                        <select name="sexo" id="sexo" onChange={(e) => setSexo(e.target.value)} className="border border-zinc-500 w-full rounded-xl h-[45px] pl-8 text-zinc-600">
                                                            <option value="">Selecione</option>
                                                            <option value="masculino">Masculino</option>
                                                            <option value="feminino">Feminino</option>
                                                            <option value="nao-definido">Não definido</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input type="checkbox" name="termos" id="termos" />
                                                <label htmlFor="termos">Li e Concordo com os termos de uso</label>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={cadastrar}
                                                    className="font-bold text-xl bg-laranja-impacto w-full py-2 rounded-xl cursor-pointer"
                                                >
                                                    Cadastrar
                                                </button>
                                            </div>
                                            <button onClick={() => setActive('login')} className="text-center mx-auto w-full flex justify-center items-center gap-1">Ja tem uma conta? <b className="text-laranja-impacto">Faça login agora mesmo!</b></button>
                                        </div>
                                    )
                                }
                                <h2></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}