import Image from "next/image";
import Link from "next/link";
import { FaCogs, FaCube, FaFlask, FaHome } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { MdOutlineScience } from "react-icons/md";

export default function Header() {
    return (
        <header className="bg-stone-950 font-oswald p-2 flex items-center lg:px-6">
            <Link href={'/'}>
                <div className="relative w-[100px] h-[50px]">
                    <Image alt="Logo da ImpactLab" src={'/logo/logo.png'} fill className="object-cover" />
                </div>
            </Link>
            <section className="flex-1 justify-center hidden md:flex">
                <ul className="flex items-center gap-4">
                    <li>
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 text-base p-2 transition-all duration-500 border-laranja-impacto text-shadow-[1px_1px_2px_black] hover:scale-105 hover:border-b hover:border-laranja-impacto lg:text-lg"
                        >
                            <FaHome />
                            <p>Início</p>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 text-base p-2 transition-all duration-500 border-laranja-impacto text-shadow-[1px_1px_2px_black] hover:scale-105 hover:border-b hover:border-laranja-impacto lg:text-lg"
                        >
                            <FaFlask />
                            <p>Sobre o Projeto</p>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 text-base p-2 transition-all duration-500 border-laranja-impacto text-shadow-[1px_1px_2px_black] hover:scale-105 hover:border-b hover:border-laranja-impacto lg:text-lg"
                        >
                            <FaCogs />
                            <p>Recursos</p>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 text-base p-2 transition-all duration-500 border-laranja-impacto text-shadow-[1px_1px_2px_black] hover:scale-105 hover:border-b hover:border-laranja-impacto lg:text-lg"
                        >
                            <FaCube />
                            <p>Materiais</p>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={'/'}
                            className="flex items-center gap-2 text-base p-2 transition-all duration-500 border-laranja-impacto text-shadow-[1px_1px_2px_black] hover:scale-105 hover:border-b hover:border-laranja-impacto lg:text-lg"
                        >
                            <MdOutlineScience />
                            <p>Como Funciona?</p>
                        </Link>
                    </li>
                </ul>
            </section>
            <div className="ml-auto">
                <Link href={'/'} className="grid grid-cols-[30px_1fr] max-w-[145px] gap-1 leading-4.5 border bg-orange-400 border-orange-700 px-2 py-1 rounded-xl text-shadow-[1px_1px_2px_black]">
                    <IoLogIn className="text-2xl mx-auto my-auto"/>
                    <p className="hidden lg:block">Acessar minhas simulações</p>
                </Link>
            </div>
        </header>
    )
}