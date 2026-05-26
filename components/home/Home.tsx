import Image from "next/image";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { RiScrollToBottomFill } from "react-icons/ri";

export default function Home() {
    return (
        <section
            className="
                font-share-tech
                p-4 text-white
                bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4)),url('/assets/fundo.png')]
                bg-cover bg-center h-screen
                lg:p-6
            "
        >
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="flex flex-col gap-2">
                    <span className="uppercase text-laranja-impacto">Simulação de impacto e resistência</span>
                    <h2 className="text-5xl">Transformando colisões em <b className="uppercase font-bold text-laranja-impacto">cálculos</b>!</h2>
                    <p>
                        O ImpactLab é uma plataforma interativa que utiliza conceitos de física, mecânica e ciência dos materiais para simular impactos e analisar a resistência de diferentes estruturas
                    </p>
                    <div className="flex items-center lg:gap-4">
                        <button className="flex items-center gap-1 bg-laranja-impacto border border-orange-700 p-2 px-4 text-lg rounded-xl text-shadow-[1px_1px_2px_black]">
                            <p>Iniciar simulação</p>
                            <FaArrowRight />
                        </button>
                        <button className="flex items-center gap-1 border border-zinc-600 p-2 px-4 text-lg rounded-xl text-shadow-[1px_1px_2px_black]">
                            <p>Saiba Mais</p>
                            <FaArrowDown />
                        </button>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="relative w-[400px] h-[300px]">
                        <Image alt="Bola impactando uma parede" src={'/assets/bola.png'} fill className="object-cover"/>
                    </div>
                </div>
                <div className="lg:col-span-2 flex flex-col justify-center items-center text-zinc-400 hover:text-laranja-impacto duration-300 transition-all cursor-pointer w-fit mx-auto">
                    <RiScrollToBottomFill />
                    <p className="">Role para baixo</p>
                </div>
            </div>
        </section>
    )
}