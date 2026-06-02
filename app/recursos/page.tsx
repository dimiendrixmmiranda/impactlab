import Template from "@/components/template/Template";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalculator, FaCheck } from "react-icons/fa";
import { IoLibrary, IoShieldCheckmarkOutline } from "react-icons/io5";
import { LiaAtomSolid } from "react-icons/lia";
import { LuBrain } from "react-icons/lu";
import { MdOutlineScience } from "react-icons/md";
import { PiLightningBold } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";

export default function Page() {
    return (
        <Template>
            <div className="max-w-[1400px] mx-auto">
                <div className="min-h-screen font-oswald p-4 flex flex-col gap-10 lg:p-8">
                    <div className="grid grid-cols-2 gap-4 rounded-xl">
                        <div className="p-4 rounded-xl flex flex-col gap-6 xl:p-8 xl:px-12">
                            <div>
                                <p className="text-laranja-impacto uppercase text-laranja-impacto">Recursos do Impactlab</p>
                                <h2 className="font-bold uppercase mt-2 lg:text-6xl lg:leading-[65px]">
                                    Ferramentas para entender o <b className="text-laranja-impacto">Impacto</b> no mundo real!
                                </h2>
                            </div>
                            <p>
                                O <b className="text-laranja-impacto">ImpactLab</b> reúne cálculos, simulações e análises para transformar conceitos complexos em experimentos visuais e interativos
                            </p>
                            <button className="flex items-center gap-1 bg-laranja-impacto p-2 rounded-xl w-fit px-6">
                                <MdOutlineScience className="text-xl" />
                                <p className="text-lg">Iniciar Simulação</p>
                                <FaArrowRight className="text-xl" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-[300px] h-[200px] lg:w-full lg:h-[380px]">
                                <Image alt="bola na parede" src={'/assets/parede-2.png'} fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-xl">
                        <div className="p-4 rounded-xl grid grid-cols-[260px_1fr] xl:grid-cols-[400px_1fr] 2xl:p-8 bordaInterativa">
                            <div className="flex flex-col gap-2 z-10">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl border border-laranja-impacto flex justify-center items-center xl:w-18 xl:h-18">
                                        <TbTargetArrow className="text-3xl text-laranja-impacto xl:text-5xl" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold xl:text-3xl">1.Simulação de Impacto</h3>
                                        <p className="text-laranja-impacto -mt-1 text-xs xl:text-lg">Simulação Física em Tempo Real</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm xl:text-lg xl:leading-6">Configure massa, velocidade e material para analisar o comportamento de colisões em diferentes cenários.</p>
                                    <ul>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Colisões entre objetos e estruturas</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Animação em 2D interativa</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Parâmetros ajustáveis</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Resultados instantâneos</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="lg:absolute lg:top-[50%] lg:-right-2" style={{ transform: 'translate(0,-50%)' }}>
                                    <div className="relative w-[300px] h-[200px] xl:w-[400px] xl:h-[300px]">
                                        <Image alt="igm" src={'/assets/parede-2.png'} fill className="object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl grid grid-cols-[260px_1fr] xl:grid-cols-[400px_1fr] 2xl:p-8 bordaInterativa">
                            <div className="flex flex-col gap-2 z-10">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl border border-laranja-impacto flex justify-center items-center xl:w-18 xl:h-18">
                                        <FaCalculator className="text-3xl text-laranja-impacto xl:text-5xl" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold xl:text-3xl">2.Calculos Físicos</h3>
                                        <p className="text-laranja-impacto -mt-1 text-xs xl:text-lg">Precisão em cada fórmula</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm xl:text-lg xl:leading-6">Motor de cálculo baseado em princípios físicos e mecânicos para fornecer métricas confiáveis e precisas.</p>
                                    <ul>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Energia Cinética</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Força de Impacto</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Tensão Mecânica</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Deformação</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="relative">
                                {/* <div className="lg:absolute lg:top-[50%] lg:-right-2" style={{transform: 'translate(0,-50%)'}}>
                                    <div className="relative w-[300px] h-[200px] xl:w-[400px] xl:h-[300px]">
                                        <Image alt="igm" src={'/assets/parede-2.png'} fill className="object-contain" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="p-4 rounded-xl grid grid-cols-[260px_1fr] xl:grid-cols-[400px_1fr] 2xl:p-8 bordaInterativa">
                            <div className="flex flex-col gap-2 z-10">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl border border-laranja-impacto flex justify-center items-center xl:w-18 xl:h-18">
                                        <IoLibrary className="text-3xl text-laranja-impacto xl:text-5xl" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold xl:text-3xl">3.Biblioteca de Materiais</h3>
                                        <p className="text-laranja-impacto -mt-1 text-xs xl:text-lg">Propriedades reias, análises precisas</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm xl:text-lg xl:leading-6">Selecione entre diversos materiais estruturais e compare suas propriedades físicas e mecânicas</p>
                                    <ul>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Materiais metálicos, polímeros e compósitos</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Propriedades: densidade, elasticidade, dureza e resistência</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Comparação entre materiais</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Banco de dados expandivel</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="lg:absolute lg:top-[50%] lg:-right-2" style={{ transform: 'translate(0,-50%)' }}>
                                    <div className="relative w-[200px] h-[200px] xl:w-[250px] xl:h-[250px]">
                                        <Image alt="igm" src={'/assets/cubos.png'} fill className="object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl grid grid-cols-[260px_1fr] xl:grid-cols-[400px_1fr] 2xl:p-8 bordaInterativa">
                            <div className="flex flex-col gap-2 z-10">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl border border-laranja-impacto flex justify-center items-center xl:w-18 xl:h-18">
                                        <VscGraphLine className="text-3xl text-laranja-impacto xl:text-5xl" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl font-bold xl:text-3xl">4.Análise e Resultados</h3>
                                        <p className="text-laranja-impacto -mt-1 text-xs xl:text-lg">Visualize. Entenda. Aprimore.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm xl:text-lg xl:leading-6">Gráficos interativos e relatórios detalhados para interpretar o comportamento estrutural e os efeitos do impacto.</p>
                                    <ul>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Gráficos de força, energia e deformação</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Mapa de deformação visual</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Relatórios exportaveis</p>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm xl:text-lg">
                                            <FaCheck className="text-laranja-impacto" />
                                            <p>Histórico de simulações</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="relative">
                                {/* <div className="lg:absolute lg:top-[50%] lg:-right-2" style={{transform: 'translate(0,-50%)'}}>
                                    <div className="relative w-[300px] h-[200px] xl:w-[400px] xl:h-[300px]">
                                        <Image alt="igm" src={'/assets/parede-2.png'} fill className="object-contain" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 rounded-xl lg:grid lg:grid-cols-4 lg:gap-4 xl:p-4 bordaInterativa">
                        <div className="flex items-center gap-2 border-r border-zinc-500 px-2">
                            <div className="text-4xl text-laranja-impacto xl:text-5xl">
                                <LuBrain />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Interdisciplinar</h3>
                                <p className="leading-5 line-clamp-2">Integra conceitos de Física, Cálculo, Mecânica e Ciência dos Materiais.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-r border-zinc-500 px-2">
                            <div className="text-4xl text-laranja-impacto xl:text-5xl">
                                <TbTargetArrow />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Precisão Ciêntifica</h3>
                                <p className="leading-5 line-clamp-2">Baseado em fórmulas e princípios físicos aplicados ao mundo real.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 border-r border-zinc-500 px-2">
                            <div className="text-4xl text-laranja-impacto xl:text-5xl">
                                <PiLightningBold />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Resultados Instantâneos</h3>
                                <p className="leading-5 line-clamp-2">Simule, analise e visualize impactos em tempo real com alta performance.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-2">
                            <div className="text-4xl text-laranja-impacto xl:text-5xl">
                                <IoShieldCheckmarkOutline />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Educativo e Profissional</h3>
                                <p className="leading-5 line-clamp-2">Uma ferramenta poderosa para aprendizado, pesquisa e desenvolvimento.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 rounded-xl lg:grid lg:grid-cols-[auto_1fr_150px] lg:gap-2 xl:p-4 xl:grid-cols-[auto_1fr_200px] bordaInterativa">
                        <div className="text-6xl text-laranja-impacto">
                            <LiaAtomSolid />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl">Ciência, tecnologia e engenharia em um só lugar.</h3>
                            <p className="text-sm">ImpactLab transforma equações em impacto. Explore, experimente e descubra o poder da física.</p>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Link href={'/funcionamento'} className="flex items-center gap-2 p-2 rounded-xl border border-laranja-impacto text-laranja-impacto transition-all duration-300 xl:text-xl hover:bg-laranja-impacto hover:text-white">
                                <p>Ver como funciona</p>
                                <FaArrowRight  className="mt-[1px]"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}