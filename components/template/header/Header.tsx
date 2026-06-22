'use client'
import Image from "next/image";
import Link from "next/link";
import { FaCogs, FaCube, FaFlask, FaHome } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { MdOutlineScience, MdWavingHand } from "react-icons/md";
import { usePathname } from 'next/navigation';
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import { useUsuario } from "@/hooks/useUsuario";


export default function Header() {
    const { usuario } = useUsuario();

    const pathname = usePathname()

    console.log(usuario)

    function getLinkClass(path: string) {
        const ativo = pathname === path;

        return `
        flex items-center gap-2 text-base p-2
        transition-all duration-500
        border-laranja-impacto
        text-shadow-[1px_1px_2px_black]
        xl:text-lg
        ${ativo
                ? 'scale-105 border-b border-laranja-impacto text-laranja-impacto'
                : 'hover:scale-105 hover:border-b hover:border-laranja-impacto'
            }
    `;
    }

    return (
        <header className="bg-stone-950 font-oswald p-2 items-center grid grid-cols-[1fr_40px] gap-4 md:grid-cols-[auto_1fr_50px] lg:px-6 lg:grid-cols-[auto_1fr_200px]">
            <Link href={'/'}>
                <div className="relative w-[100px] h-[50px]">
                    <Image alt="Logo da ImpactLab" src={'/logo/logo.png'} fill className="object-cover" />
                </div>
            </Link>
            <SidebarComponent />
            <section className="flex-1 justify-center hidden md:flex">
                <ul className="flex items-center gap-4">
                    <li>
                        <Link href="/" className={getLinkClass('/')}>
                            <FaHome />
                            <p>Início</p>
                        </Link>
                    </li>

                    <li>
                        <Link href="/menu/sobre" className={getLinkClass('/menu/sobre')}>
                            <FaFlask />
                            <p>Sobre</p>
                        </Link>
                    </li>

                    <li>
                        <Link href="/menu/recursos" className={getLinkClass('/menu/recursos')}>
                            <FaCogs />
                            <p>Recursos</p>
                        </Link>
                    </li>

                    <li>
                        <Link href="/menu/materiais" className={getLinkClass('/menu/materiais')}>
                            <FaCube />
                            <p>Materiais</p>
                        </Link>
                    </li>

                    <li>
                        <Link href="/menu/funcionamento" className={getLinkClass('/menu/funcionamento')}>
                            <MdOutlineScience />
                            <p>Como Funciona?</p>
                        </Link>
                    </li>
                </ul>
            </section>
            {
                usuario ? (
                    <Link href={'/usuario'} className="items-center gap-2 hidden md:flex mx-auto">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800">
                            <Image alt="Imagem do usuário" src={usuario?.imagem || '/logo/logo.png'} fill unoptimized className="object-cover" />
                        </div>
                        <h2 className="hidden lg:block">Bem vindo, {usuario.nome?.split(' ')[0]}</h2>
                        <div className="text-lg text-yellow-500 hidden lg:block">
                            <MdWavingHand />
                        </div>
                    </Link >
                ) : (
                    <div className="ml-auto md:flex w-full h-full mx-auto my-auto justify-center items-center hidden md:flex mx-auto    ">
                        <Link href={'/login'} className="flex justify-center items-center bg-laranja-impacto p-2 rounded-xl">
                            <IoLogIn className="text-xl mx-auto my-auto" />
                            <p className="hidden lg:flex flex-nowrap" style={{ textShadow: '1px 1px 2px black' }}>Acessar minhas simulações</p>
                        </Link>
                    </div>
                )
            }
        </header >
    )
}