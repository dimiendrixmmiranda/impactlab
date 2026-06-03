import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="p-4 lg:grid lg:grid-cols-4 lg:gap-x-5 max-w-[1400px] mx-auto lg:pt-8">
            <div className="flex w-full h-full justify-center items-center lg:my-auto">
                <Link href={'/'} className="flex flex-col justify-centere items-center gap-2    ">
                    <div className="relative w-[160px] h-[80px]">
                        <Image alt="Logo da ImpactLab" src={'/logo/logo.png'} fill className="object-cover" />
                    </div>
                    <h3 className="text-zinc-400 text-center leading-5 text-sm">Transformando colisões em cálculos.</h3>
                </Link>
            </div>
            <div className="text-zinc-400 flex flex-col gap-2">
                <h4 className="uppercase text-white">Navegação</h4>
                <ul>
                    <li>
                        <Link href={'/'}>Início</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Sobre o Projeto</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Recursos</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Materiais</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Como funciona?</Link>
                    </li>
                </ul>
            </div>
            <div className="text-zinc-400 flex flex-col gap-2">
                <h4 className="uppercase text-white">Suporte</h4>
                <ul>
                    <li>
                        <Link href={'/'}>Documentação</Link>
                    </li>
                    <li>
                        <Link href={'/'}>FAQ</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Dúvidas Frequentes</Link>
                    </li>
                    <li>
                        <Link href={'/'}>Contato</Link>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="uppercase">Conecte-se</h4>
                <ul className="w-fit grid grid-cols-4 gap-2 text-xl">
                    <li>
                        <Link href={'/'}>
                            <div className="p-2 rounded-xl bg-zinc-600">
                                <FaGithub />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/'}>
                            <div className="p-2 rounded-xl bg-zinc-600">
                                <FaLinkedinIn />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/'}>
                            <div className="p-2 rounded-xl bg-zinc-600">
                                <IoIosMail />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/'}>
                            <div className="p-2 rounded-xl bg-zinc-600">
                                <FaWhatsapp />
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="col-span-4 flex justify-between text-zinc-400 mt-6">
                <div className="text-white">
                    <span>© 2024 ImpactLab. Todos os direitos reservados.</span>
                </div>
                <div>
                    <span>Desenvolvido com ❤️ para engenharia!</span>
                </div>
            </div>
        </footer>
    )
}