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
    const gerarCampoDescricao = (
        icone: React.ReactNode,
        titulo: string,
        subtitulo: string,
        descricao: string,
        arrayDeTopicos: string[],
        imagem: string,
        posicaoDaImagem: string
    ) => {
        return (
            <div
                className="relative p-4 rounded-xl grid grid-cols-[260px_1fr] xl:grid-cols-[400px_1fr] 2xl:p-8 bordaInterativa overflow-hidden"
                style={{
                    ['--angulo-inicial' as any]: `${Math.random() * 360}deg`
                }}
            >
                <div className="flex flex-col gap-2 relative z-20">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl border border-laranja-impacto flex justify-center items-center xl:w-18 xl:h-18">
                            {icone}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold xl:text-3xl">
                                {titulo}
                            </h3>
                            <p className="text-laranja-impacto -mt-1 text-xs xl:text-lg">
                                {subtitulo}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm xl:text-lg xl:leading-6">
                            {descricao}
                        </p>

                        <ul>
                            {arrayDeTopicos.map((topico, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 text-sm xl:text-lg"
                                >
                                    <FaCheck className="text-laranja-impacto" />
                                    <p>{topico}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`absolute pointer-events-none top-0 ${posicaoDaImagem}`}>
                    <div className="w-[300px] h-[200px] xl:w-[400px] xl:h-[300px]">
                        <Image
                            alt="imagem do campo"
                            src={imagem}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        )
    }

    const gerarCampoQualidades = (icone: React.ReactNode, titulo: string, descricao: string, borda: boolean = true) => {
        return (
            <div className={`flex items-center gap-2 px-2 ${borda ? 'border-r border-zinc-500' : ''}`}>
                <div className="text-4xl text-laranja-impacto xl:text-5xl">
                    {icone}
                </div>
                <div>
                    <h3 className="font-bold text-xl">{titulo}</h3>
                    <p className="leading-5 line-clamp-2">{descricao}</p>
                </div>
            </div>
        )
    }
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
                            <Link href={'/simulacao'} className="flex items-center gap-1 bg-laranja-impacto p-2 rounded-xl w-fit px-6 text-shadow-[1px_1px_2px_black] hover:scale-105 duration-300">
                                <MdOutlineScience className="text-xl drop-shadow-[1px_1px_2px_black]" />
                                <p className="text-lg">Iniciar Simulação</p>
                                <FaArrowRight className="text-xl drop-shadow-[1px_1px_2px_black]" />
                            </Link>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-[300px] h-[200px] lg:w-full lg:h-[380px]">
                                <Image alt="bola na parede" src={'/assets/parede-2.png'} fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-xl">
                        {
                            gerarCampoDescricao(
                                <TbTargetArrow className="text-3xl text-laranja-impacto xl:text-5xl" />,
                                '1.Simulação de Impacto',
                                'Simulação Física em Tempo Real',
                                'Configure massa, velocidade e material para analisar o comportamento de colisões em diferentes cenários.',
                                ['Energia Cinética', 'Animação em 2D interativa', 'Parâmetros ajustáveis', 'Resultados instantâneos'],
                                '/assets/parede-2.png',
                                '2xl:-left-44'
                            )
                        }
                        {
                            gerarCampoDescricao(
                                <FaCalculator className="text-3xl text-laranja-impacto xl:text-5xl" />,
                                '2.Calculos Físicos',
                                'Precisão em cada fórmula',
                                'Motor de cálculo baseado em princípios físicos e mecânicos para fornecer métricas confiáveis e precisas.',
                                ['Colisões entre objetos e estruturas', 'Força de Impacto', 'Tensão Mecânica', 'Deformação'],
                                '/assets/calculadora.png',
                                '2xl:-left-32'
                            )
                        }
                        {
                            gerarCampoDescricao(
                                <IoLibrary className="text-3xl text-laranja-impacto xl:text-5xl" />,
                                '3.Biblioteca de Materiais',
                                'Propriedades reias, análises precisas',
                                'Selecione entre diversos materiais estruturais e compare suas propriedades físicas e mecânicas',
                                ['Materiais metálicos, polímeros e compósitos', 'Propriedades: densidade, elasticidade, dureza e resistência', 'Comparação entre materiais', 'Banco de dados expandivel'],
                                '/assets/cubos.png',
                                '2xl:-left-32'
                            )
                        }
                        {
                            gerarCampoDescricao(
                                <VscGraphLine className="text-3xl text-laranja-impacto xl:text-5xl" />,
                                '4.Análise e Resultados',
                                'Visualize. Entenda. Aprimore.',
                                'Gráficos interativos e relatórios detalhados para interpretar o comportamento estrutural e os efeitos do impacto.',
                                ['Gráficos de força, energia e deformação', 'Mapa de deformação visual', 'Relatórios exportaveis', 'Histórico de simulações'],
                                '/assets/cubos.png',
                                '2xl:-left-32'
                            )
                        }
                    </div>
                    <div className="p-2 rounded-xl lg:grid lg:grid-cols-4 lg:gap-4 xl:p-4 bordaInterativa" style={{
                        ['--angulo-inicial' as any]:
                            `${Math.random() * 360}deg`
                    }}>
                        {
                            gerarCampoQualidades(<LuBrain />, 'Interdisciplinar', 'Integra conceitos de Física, Cálculo, Mecânica e Ciência dos Materiais.')
                        }
                        {
                            gerarCampoQualidades(<TbTargetArrow />, 'Precisão Ciêntifica', 'Baseado em fórmulas e princípios físicos aplicados ao mundo real.')
                        }
                        {
                            gerarCampoQualidades(<PiLightningBold />, 'Resultados Instantâneos', 'Simule, analise e visualize impactos em tempo real com alta performance.')
                        }
                        {
                            gerarCampoQualidades(<IoShieldCheckmarkOutline />, 'Educativo e Profissional', 'Uma ferramenta poderosa para aprendizado, pesquisa e desenvolvimento.')
                        }
                    </div>
                    <div className="p-2 rounded-xl lg:grid lg:grid-cols-[auto_1fr_150px] lg:gap-2 xl:p-4 xl:grid-cols-[auto_1fr_200px] bordaInterativa" style={{
                        ['--angulo-inicial' as any]:
                            `${Math.random() * 360}deg`
                    }}>
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
                                <FaArrowRight className="mt-[1px]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}