import { HiMiniUsers } from "react-icons/hi2";
import { IoMdRocket } from "react-icons/io";
import { MdOutlineScience } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

export default function Estatisticas() {
    return (
        <section className="font-oswald p-4 flex flex-col gap-4 lg:gap-8">
            <div className="font-oswald p-4 flex flex-col gap-4 max-w-[1440px] w-full bg-zinc-800 rounded-xl mx-auto lg:grid lg:grid-cols-4 lg:gap-8">
                <div className="grid grid-cols-[60px_1fr] gap-2 border-r border-zinc-600 px-4 py-2">
                    <div className="w-full h-full flex justify-center items-center rounded-2xl p-1">
                        <MdOutlineScience className="text-6xl text-laranja-impacto" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-3xl font-bold text-laranja-impacto">+50</h4>
                        <p>Materiais Disponiveis</p>
                    </div>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-2 border-r border-zinc-600 px-4 py-2">
                    <div className="w-full h-full flex justify-center items-center rounded-2xl p-1">
                        <IoMdRocket className="text-6xl text-laranja-impacto" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-3xl font-bold text-laranja-impacto">+1000</h4>
                        <p>Simulações Realizadas</p>
                    </div>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-2 border-r border-zinc-600 px-4 py-2">
                    <div className="w-full h-full flex justify-center items-center rounded-2xl p-1">
                        <TbTargetArrow className="text-6xl text-laranja-impacto" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-3xl font-bold text-laranja-impacto">98.8%</h4>
                        <p>Precisão dos Cálculos</p>
                    </div>
                </div>
                <div className="grid grid-cols-[60px_1fr] gap-2 px-4 py-2">
                    <div className="w-full h-full flex justify-center items-center rounded-2xl p-1">
                        <HiMiniUsers className="text-6xl text-laranja-impacto" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h4 className="text-3xl font-bold text-laranja-impacto">+50</h4>
                        <p>Usuários Ativos</p>
                    </div>
                </div>
            </div>
        </section>
    )
}