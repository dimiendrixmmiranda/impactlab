
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';
import { FaCogs, FaCube, FaFlask, FaGithub, FaHome, FaRegPlayCircle, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineScience } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { TbTargetArrow } from 'react-icons/tb';
import { IoDocumentTextOutline, IoRocketOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { CiFacebook, CiLinkedin, CiMail } from 'react-icons/ci';
import { PiCubeFill } from 'react-icons/pi';
import { useUsuario } from '@/hooks/useUsuario';

export default function SidebarComponent() {
    const [visibleRight, setVisibleRight] = useState(false);
    const pathname = usePathname()
    const {usuario} = useUsuario()
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
        <div className="card md:hidden">
            <div className="flex gap-2 justify-center items-center">
                <Button onClick={() => setVisibleRight(true)}>
                    <GiHamburgerMenu className='text-3xl' />
                </Button>
            </div>

            <Sidebar
                visible={visibleRight}
                position="right"
                onHide={() => setVisibleRight(false)}
                header={
                    <div className='w-full relative p-4'>
                        <div className='w-[111%] h-[1px] bg-zinc-700 absolute left-0 bottom-0'></div>
                        <Link href={'/'}>
                            <div className="relative w-[100px] h-[50px]">
                                <Image alt="Logo da ImpactLab" src={'/logo/logo.png'} fill className="object-cover" />
                            </div>
                        </Link>
                    </div>
                }
            >
                <div className='font-oswald text-white flex flex-col h-full'>
                    <section className="flex p-4 border-b border-zinc-700">
                        <ul className="flex flex-col justify-center gap-4">
                            <li>
                                <Link href="/" className={getLinkClass('/')}>
                                    <FaHome />
                                    <p>Início</p>
                                </Link>
                            </li>

                            <li>
                                <Link href="/sobre" className={getLinkClass('/sobre')}>
                                    <FaFlask />
                                    <p>Sobre o Projeto</p>
                                </Link>
                            </li>

                            <li>
                                <Link href="/recursos" className={getLinkClass('/recursos')}>
                                    <FaCogs />
                                    <p>Recursos</p>
                                </Link>
                            </li>

                            <li>
                                <Link href="/materiais" className={getLinkClass('/materiais')}>
                                    <FaCube />
                                    <p>Materiais</p>
                                </Link>
                            </li>

                            <li>
                                <Link href="/funcionamento" className={getLinkClass('/funcionamento')}>
                                    <MdOutlineScience />
                                    <p>Como Funciona?</p>
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="flex flex-col p-4">
                        <h4 className='uppercase text-laranja-impacto'>Area do usuário</h4>
                        <ul className="flex flex-col justify-center gap-4">
                            <li>
                                <Link href="/dashboard" className={getLinkClass('/dashboard')}>
                                    <TbTargetArrow />
                                    <p>Dashboard</p>
                                </Link>
                            </li>

                            <li>
                                <Link href="/simulacoes" className={getLinkClass('/simulacoes')}>
                                    <FaRegPlayCircle />
                                    <p>Simulações</p>
                                </Link>
                            </li>

                            <li>
                                <Link href="/relatorios" className={getLinkClass('/relatorios')}>
                                    <IoDocumentTextOutline />
                                    <p>Relatorios</p>
                                </Link>
                            </li>
                            <li>
                                <Link href={`${usuario ? '/usuario' : '/login'}`} className='grid grid-cols-[60px_1fr_20px] border border-laranja-impacto rounded-xl p-2'>
                                    <IoRocketOutline className='mx-auto my-auto text-4xl text-laranja-impacto' />
                                    <div>
                                        <h3 className='font-bold'>Acessar minhas simulações</h3>
                                        <p className='text-sm'>Ir para o painel </p>
                                    </div>
                                    <IoIosArrowForward className='mx-auto my-auto' />
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="flex flex-col p-4">
                        <ul className='grid grid-cols-4 gap-4'>
                            <li className='flex justify-center items-center text-3xl p-2 rounded-xl border border-zinc-500'>
                                <Link href={'/'}>
                                    <FaGithub />
                                </Link>
                            </li>
                            <li className='flex justify-center items-center text-3xl p-2 rounded-xl border border-zinc-500'>
                                <Link href={'/'}>
                                    <CiLinkedin />
                                </Link>
                            </li>
                            <li className='flex justify-center items-center text-3xl p-2 rounded-xl border border-zinc-500'>
                                <Link href={'/'}>
                                    <CiMail />
                                </Link>
                            </li>
                            <li className='flex justify-center items-center text-3xl p-2 rounded-xl border border-zinc-500'>
                                <Link href={'/'}>
                                    <FaWhatsapp />
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <div className='p-4 border-t border-zinc-700 flex items-center mt-auto'>
                        <div>
                            <PiCubeFill />
                        </div>
                        <p>Versão 1.0.0</p>
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}
