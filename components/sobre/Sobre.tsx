import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Sobre() {
    return (
        <section className="font-oswald p-4 flex flex-col gap-4 lg:gap-8">
            <div className="font-oswald p-4 flex flex-col gap-4 max-w-[1440px] w-full bg-zinc-800 rounded-xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="relative w-full h-[300px] border-r-2 border-zinc-900">
                    <Image alt="Projetil na parede" src={'/assets/bola-parede.png'} fill className="object-contain"/>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="uppercase text-laranja-impacto">Sobre o ImpactLab</span>
                        <h2 className="text-4xl">Ciência, tecnologia e engenharia em um só lugar</h2>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>
                            O ImpactLab foi desenvolvido para estudantes engenheiros e pesquisadores que buscam compreender melhor o comportamento dos materiais sob impacto.
                        </p>
                        <p>
                            Utilizamos princípios da física e mecânica para transformar colisões em dados, insights e conhecimento aplicável ao mundo real.
                        </p>
                    </div>
                    <Link href={'/'} className="flex items-center gap-2 bg-zinc-700 w-fit rounded-xl p-2 px-4 border border-zinc-900">
                        <p>Conheça o Projeto</p>
                        <FaArrowRightLong />
                    </Link>
                </div>
            </div>
        </section>
    )
}