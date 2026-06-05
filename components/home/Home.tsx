import Image from "next/image";
import Link from "next/link";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { RiScrollToBottomFill } from "react-icons/ri";

export default function Home() {
    return (
        <>
            <section
                className="
                relative
                font-share-tech
                p-4 text-white
                bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4)),url('/assets/fundo.png')]
                bg-cover bg-center h-[80vh]
                lg:p-6
                xl:p-14
                xl:h-[70vh]
            "
            >
                <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none"></div>
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 max-w-[1000px] mx-auto xl:max-w-[1200px] ">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="uppercase text-laranja-impacto xl:text-xl">Simulação de impacto e resistência</span>
                            <h2 className="text-5xl uppercase xl:text-7xl">Transformando colisões em <b className="uppercase font-bold text-laranja-impacto">cálculos</b>!</h2>
                        </div>
                        <p className="xl:text-lg">
                            O ImpactLab é uma plataforma interativa que utiliza conceitos de física, mecânica e ciência dos materiais para simular impactos e analisar a resistência de diferentes estruturas
                        </p>
                        <div className="flex items-center lg:gap-4">
                            <Link href={'/simulacao'} className="flex items-center gap-1 bg-laranja-impacto border border-orange-700 p-2 px-4 text-lg rounded-xl text-shadow-[1px_1px_2px_black] lg:text-lg">
                                <p>Iniciar simulação</p>
                                <FaArrowRight />
                            </Link>
                            <Link href={'#sobre'} className="flex items-center gap-1 border border-zinc-600 p-2 px-4 text-lg rounded-xl text-shadow-[1px_1px_2px_black] lg:text-lg">
                                <p>Saiba Mais</p>
                                <FaArrowDown />
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="relative w-[400px] h-[300px] xl:w-[600px] xl:h-[400px]">
                            <Image alt="Bola impactando uma parede" src={'/assets/bola.png'} fill className="object-cover" />
                        </div>
                    </div>
                    <Link href={'#detalhes'} className="lg:col-span-2 z-20 flex flex-col justify-center items-center text-zinc-400 hover:text-laranja-impacto duration-300 transition-all hover:scale-105 cursor-pointer w-fit mx-auto xl:text-xl xl:pt-4">
                        <RiScrollToBottomFill />
                        <p className="">Role para baixo</p>
                    </Link>
                </div>
            </section>
        </>
    )
}