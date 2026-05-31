'use client'
import Template from "@/components/template/Template";
import Image from "next/image";
import { FaCube, FaLightbulb, FaQuoteLeft, FaQuoteRight, FaUsers } from "react-icons/fa";
import { FaGear, FaUserGroup } from "react-icons/fa6";
import { GiAtom, GiGooeyImpact } from "react-icons/gi";
import { IoIosRocket } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdScience } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

export default function Page() {
    return (
        <Template>
            <div className="max-w-[1400px] mx-auto">
                <div className="min-h-screen font-oswald p-4 flex flex-col gap-10 lg:p-8">
                    <div className="grid grid-cols-2 gap-4 bg-zinc-800 border border-zinc-500 rounded-xl">
                        <div className="p-4 rounded-xl flex flex-col gap-6 xl:p-8 xl:px-12">
                            <div>
                                <p className="text-laranja-impacto uppercase text-laranja-impacto">Sobre o Projeto</p>
                                <h2 className="font-bold uppercase mt-2 lg:text-6xl lg:leading-[65px]">Ciência, Fisíca, <b className="text-laranja-impacto">Impacto Real!</b></h2>
                            </div>
                            <p>
                                O <b className="text-laranja-impacto">ImpactLab</b> é uma plataforma interativa criada para simular impactos de projeteis em diferentes materiais e estruturas. Unimos a física, engenharia e tecnologia para tornar o aprendizado mais visual, dinâmico e proximo da realidade.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="grid grid-cols-[40px_1fr] gap-2 bg-zinc-900 p-2 rounded-xl">
                                    <div className="w-10 h-10 my-auto bg-zinc-700 rounded-full p-1 flex justify-center items-center">
                                        <GiGooeyImpact className="text-xl text-laranja-impacto" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-laranja-impacto">100+</h3>
                                        <p className="text-xs">Simulações Realizadas</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-2 bg-zinc-900 p-2 rounded-xl">
                                    <div className="w-10 h-10 my-auto bg-zinc-700 rounded-full p-1 flex justify-center items-center">
                                        <IoShieldCheckmarkOutline className="text-xl text-laranja-impacto" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-laranja-impacto">50+</h3>
                                        <p className="text-xs">Materiais Disponíveis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-[300px] h-[200px] lg:w-full lg:h-[380px]">
                                <Image alt="bola na parede" src={'/assets/bola-3.png'} fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-800 rounded-xl lg:grid lg:grid-cols-4 border border-zinc-500">
                        <div className="flex flex-col justify-center items-center gap-1 border-r border-zinc-500 p-4 xl:p-6">
                            <div className="relative w-[80px] h-[80px] rounded-full p-1 border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-5xl">
                                <GiAtom />
                            </div>
                            <h3 className="font-bold text-xl">Física Aplicada</h3>
                            <p className="text-center leading-5">
                                Utilizamos principios reais da física para calcular a energia, momento, força de impacto e tensão mecânica com precisão.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 border-r border-zinc-500 p-4 xl:p-6">
                            <div className="relative w-[80px] h-[80px] rounded-full p-1 border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-5xl">
                                <FaCube />
                            </div>
                            <h3 className="font-bold text-xl">Engenharia Estrutural</h3>
                            <p className="text-center leading-5">
                                Analisamos como diferentes materiais e espessuras reagem a impactos, observando deformações, danos e ruptura.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 border-r border-zinc-500 p-4 xl:p-6">
                            <div className="relative w-[80px] h-[80px] rounded-full p-1 border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-5xl">
                                <VscGraph />
                            </div>
                            <h3 className="font-bold text-xl">Aprendizado Interativo</h3>
                            <p className="text-center leading-5">
                                Transformamos cálculos complexos em visualizações intuitivas para facilitar a compreensão e o ensino de conceitos ciêntificos.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 p-4 xl:p-6">
                            <div className="relative w-[80px] h-[80px] rounded-full p-1 border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-5xl">
                                <FaUserGroup />
                            </div>
                            <h3 className="font-bold text-xl">Para Todos</h3>
                            <p className="text-center leading-5">
                                Voltado para estudantes, professores e curiosos que desejam explorar a física dos impactos de forma prática e envolvente.
                            </p>
                        </div>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-xl lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-[1fr_auto] border border-zinc-500">
                        <div className="grid grid-cols-[70px_1fr] gap-2">
                            <div className="text-4xl p-1 rounded-full border w-[70px] h-[70px] flex justify-center items-center border-laranja-impacto my-auto text-laranja-impactow">
                                <TbTargetArrow />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-laranja-impacto">Nossa Missão</h3>
                                <p>
                                    Tornar o estudo da física e da engenharia mais acessível, prático e inspirador, mostrando como a ciência esta presente em situações reais do dia a dia.
                                </p>
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-laranja-impacto grid grid-cols-[20px_1fr_20px] w-fit gap-2 p-4 rounded-xl">
                            <div className="flex justify-center items-center w-full h-full col-start-1 col-end-2 pb-4">
                                <FaQuoteLeft />
                            </div>
                            <h4 className="italic font-semibold col-start-2 col-end-3 mt-auto">Entender o Impacto é entender a força que molda o mundo!</h4>
                            <div className="flex justify-center items-center w-full h-full col-start-3 col-end-4 pb-4">
                                <FaQuoteRight />
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-4 xl:px-8 xl:py-6">
                        <div>
                            <h3 className="font-bold text-xl text-laranja-impacto">Nossa Missão</h3>
                        </div>
                        <div className="lg:grid lg:grid-cols-5 lg:gap-2 relative xl:gap-4">
                            <div className="grid grid-rows-[60px_auto_auto] text-center">
                                <div className="relative w-[60px] h-[60px] mx-auto rounded-full flex justify-center items-center p-2 border border-laranja-impacto text-3xl">
                                    <FaUsers />
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] left-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                </div>
                                <h4 className="font-bold text-xl mt-2">1. Ideia</h4>
                                <p>Identificamos a necessidade de uma ferramenta que unisse física, engenharia e visualização interativa.</p>
                            </div>
                            <div className="grid grid-rows-[60px_auto_auto] text-center">
                                <div className="relative w-[60px] h-[60px] mx-auto rounded-full flex justify-center items-center p-2 border border-laranja-impacto text-3xl">
                                    <FaLightbulb />
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] right-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] left-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                </div>
                                <h4 className="font-bold text-xl mt-2">2. Pesquisa</h4>
                                <p>Estudamos conceitos físicos, comportamento de materiais e modelos de impacto utilizados na engenharia.</p>
                            </div>
                            <div className="grid grid-rows-[60px_auto_auto] text-center">
                                <div className="relative w-[60px] h-[60px] mx-auto rounded-full flex justify-center items-center p-2 border border-laranja-impacto text-3xl">
                                    <FaGear />
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] right-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] left-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                </div>
                                <h4 className="font-bold text-xl mt-2">3. Desenvolvimento</h4>
                                <p>Construímos simulações realistas com cálculos precisos e uma interface intuitiva.</p>
                            </div>
                            <div className="grid grid-rows-[60px_auto_auto] text-center">
                                <div className="relative w-[60px] h-[60px] mx-auto rounded-full flex justify-center items-center p-2 border border-laranja-impacto text-3xl">
                                    <MdScience />
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] right-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] left-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                </div>
                                <h4 className="font-bold text-xl mt-2">4. Testes</h4>
                                <p>Validamos os modelos, aprimoramos métricas e garantimos resultados confiáveis.</p>
                            </div>
                            <div className="grid grid-rows-[60px_auto_auto] text-center">
                                <div className="relative w-[60px] h-[60px] mx-auto rounded-full flex justify-center items-center p-2 border border-laranja-impacto text-3xl">
                                    <IoIosRocket />
                                    <div className="w-[170%] xl:w-[240%] h-1 bg-laranja-impacto absolute top-[50%] right-[100%]" style={{transform: 'translate(0,-50%)'}}></div>
                                </div>
                                <h4 className="font-bold text-xl mt-2">5. Impacto</h4>
                                <p>Disponibilizamos o ImpactLab para transformar o aprendizado e inspirar novas descobertas.</p>
                            </div>
                            {/* <div className="absolute h-1 w-full bg-laranja-impacto top-[50%]"></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}