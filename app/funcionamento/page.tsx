import Template from "@/components/template/Template";
import Image from "next/image";
import Link from "next/link";
import { BiSolidCube } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { FaArrowRight, FaCode, FaRegPlayCircle } from "react-icons/fa";
import { GiEmberShot, GiProcessor } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaAtomSolid } from "react-icons/lia";
import { PiGearBold } from "react-icons/pi";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiMaterialdesignicons } from "react-icons/si";
import { TbCubeSpark, TbHeartRateMonitor, TbPointFilled } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";

export default function Page() {

    const gerarCampo = (position: number, icone: React.ReactNode, titulo: string, descricacao: string) => {
        return (
            <div className="group flex flex-col gap-6 relative cursor-pointer">
                {/* Círculo */}
                <div
                    className="
                        w-14 h-14 rounded-full
                        border border-laranja-impacto
                        text-laranja-impacto
                        flex justify-center items-center
                        text-3xl mx-auto z-10
                        bg-zinc-900
                        transition-all duration-300
                        group-hover:bg-laranja-impacto
                        group-hover:text-black
                        group-hover:scale-110
                    "
                >
                    <p>{position}</p>
                </div>
                {
                    position < 5 ? (
                        <div
                            className="
                                absolute
                                top-7
                                left-[55%]
                                w-[90%]
                                h-[3px]
                                bg-zinc-700
                                overflow-hidden
                            "
                        >
                            <div
                                className="
                            h-full
                            bg-laranja-impacto
                            w-0
                            transition-all duration-500
                            group-hover:w-full
                        "
                            />
                        </div>
                    ) : ''
                }

                {/* Card */}
                <div
                    className="
                        grid
                        grid-rows-[60px_30px_auto]
                        gap-4
                        justify-center
                        items-center
                        p-4
                        border
                        border-zinc-500
                        rounded-xl
                        h-full
                        transition-all
                        duration-300
                        group-hover:border-laranja-impacto
                        group-hover:-translate-y-2
                        group-hover:shadow-[0_0_20px_rgba(255,123,0,0.25)]
                    "
                >
                    <div
                        className="
                            text-6xl mx-auto
                            transition-all duration-300
                            group-hover:text-laranja-impacto
                            group-hover:scale-110
                            "
                    >
                        {icone}
                    </div>

                    <h2 className="font-bold text-xl text-center leading-5">
                        {titulo}
                    </h2>

                    <div className="text-center mb-auto">
                        <span>
                            {descricacao}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Template>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 p-4 min-h-screen">
                <div className="bg-cinza-grafite rounded-xl lg:grid lg:grid-cols-2 lg:gap-8 bordaInterativa">
                    <div className="font-oswald p-4 flex flex-col gap-6 lg:p-8">
                        <div className="flex flex-col gap-2">
                            <p className="uppercase text-lg text-laranja-impacto">Como funciona?</p>
                            <div className="font-bold uppercase text-4xl flex flex-col gap-2">
                                <h2>Ciência, tecnologia e </h2>
                                <h2 className="text-laranja-impacto">Simulação!</h2>
                            </div>
                            <span>
                                O ImpactLab utiliza princípios da física e engenharia para simular impactos, calcular forças e analisar o comportamento dos materiais em diferentes cenários.
                            </span>
                            <div className="border border-zinc-500 rounded-xl p-2 grid grid-cols-4">
                                <div className="grid grid-rows-[40px_auto_auto] gap-1 border-r border-zinc-500 p-2">
                                    <div className="flex justify-center items-center">
                                        <LiaAtomSolid className="text-laranja-impacto text-5xl" />
                                    </div>
                                    <h4 className="uppercase font-bold text-center mt-2">Física</h4>
                                    <span className="text-sm leading-4 text-center">Princípios reais aplicados.</span>
                                </div>
                                <div className="grid grid-rows-[40px_auto_auto] gap-1 border-r border-zinc-500 p-2">
                                    <div className="flex justify-center items-center">
                                        <GiProcessor className="text-laranja-impacto text-5xl" />
                                    </div>
                                    <h4 className="uppercase font-bold text-center mt-2">Algoritmos</h4>
                                    <span className="text-sm leading-4 text-center">Calculos precisos e rápidos.</span>
                                </div>
                                <div className="grid grid-rows-[40px_auto_auto] gap-1 border-r border-zinc-500 p-2">
                                    <div className="flex justify-center items-center">
                                        <BiSolidCube className="text-laranja-impacto text-5xl" />
                                    </div>
                                    <h4 className="uppercase font-bold text-center mt-2">Simulação</h4>
                                    <span className="text-sm leading-4 text-center">Ambiente visual interativo.</span>
                                </div>
                                <div className="flex flex-col justify-center items-center p-2">
                                    <div className="flex justify-center items-center">
                                        <VscGraphLine className="text-laranja-impacto text-5xl" />
                                    </div>
                                    <h4 className="uppercase font-bold text-center mt-2">Análise</h4>
                                    <span className="text-sm leading-4 text-center">Resultados claros e confiáveis.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="relative w-full my-auto h-[350px] xl:h-[400px]">
                            <Image alt="Bola batendo nas paredes" src={'/assets/bola-parede-2.png'} fill className="object-contain" />
                        </div>
                    </div>
                </div>
                <div className="bg-cinza-grafite flex flex-col gap-4 p-4 rounded-xl 2xl:p-8 bordaInterativa">
                    <div>
                        <p className="uppercase text-lg text-laranja-impacto">Como funciona?</p>
                        <div className="font-bold uppercase text-4xl flex flex-col gap-2">
                            <h2>Do cenário à análise em 5 etapas!</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        {gerarCampo(1, <TbCubeSpark />, 'Escolha o material', 'Selecione o material da biblioteca ou cadastre um novo material com suas propriedades.')}
                        {gerarCampo(2, <GiEmberShot />, 'Configure o Impacto', 'Defina massa, velocidade, dimensões e angulo do objeto que irá causar o impacto.')}
                        {gerarCampo(3, <FaRegPlayCircle />, 'Execute a simulação', 'O motor físico processa os dados, aplica as formulas e simula a colisão em tempo real.')}
                        {gerarCampo(4, <TbHeartRateMonitor />, 'Analise os resultados', 'Visualize gráficos, valores de força, deformação, tensão e energia gerados pela simulação.')}
                        {gerarCampo(5, <IoDocumentTextOutline />, 'Compare e aprenda', 'Compare cenários, salve suas simulações e gere relatórios físicos completos.')}
                    </div>
                </div>
                <div className="bg-cinza-grafite flex flex-col gap-4 p-4 rounded-xl 2xl:p-8 bordaInterativa">
                    <div>
                        <p className="uppercase text-lg text-laranja-impacto">Fundamentação Interdisciplinar</p>
                        <div className="font-bold uppercase text-4xl flex flex-col gap-2">
                            <h2>Integração de conhecimentos!</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="border border-zinc-500 rounded-xl p-2">
                            <div className="w-20 h-20 relative rounded-xl text-5xl flex justify-center items-center mx-auto text-center text-laranja-impacto">
                                <BsGraphUp />
                            </div>
                            <h2 className="font-bold text-xl text-center">Calculo</h2>
                            <div className="mt-2">
                                <ul>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Variação de velocidade</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Taxas de deformação</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Análise de forças</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Representação gráfica</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border border-zinc-500 rounded-xl p-2">
                            <div className="w-20 h-20 relative rounded-xl text-5xl flex justify-center items-center mx-auto text-center text-laranja-impacto">
                                <LiaAtomSolid />
                            </div>
                            <h2 className="font-bold text-xl text-center">Física</h2>
                            <div className="mt-2">
                                <ul>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Energia cinética</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Força de impacto</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Movimentação e aceleração</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Conservação de energia</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border border-zinc-500 rounded-xl p-2">
                            <div className="w-20 h-20 relative rounded-xl text-5xl flex justify-center items-center mx-auto text-center text-laranja-impacto">
                                <PiGearBold />
                            </div>
                            <h2 className="font-bold text-xl text-center">Mecânica</h2>
                            <div className="mt-2">
                                <ul>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Tensão mecânica</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Compreensão e deformação</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Resistência estrutural</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Análise de ruptura</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border border-zinc-500 rounded-xl p-2">
                            <div className="w-20 h-20 relative rounded-xl text-5xl flex justify-center items-center mx-auto text-center text-laranja-impacto">
                                <SiMaterialdesignicons />
                            </div>
                            <h2 className="font-bold text-xl text-center">Ciência dos Materiais</h2>
                            <div className="mt-2">
                                <ul>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Resistencia dos materiais</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Elasticidade</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Densidade</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Dureza e tenacidade</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border border-zinc-500 rounded-xl p-2">
                            <div className="w-20 h-20 relative rounded-xl text-5xl flex justify-center items-center mx-auto text-center text-laranja-impacto">
                                <FaCode />
                            </div>
                            <h2 className="font-bold text-xl text-center">Algoritmos</h2>
                            <div className="mt-2">
                                <ul>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Motor de cálculo físico</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Sistema de colisão</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Processamento de dados</p>
                                    </li>
                                    <li className="flex items-center gap-1">
                                        <div>
                                            <TbPointFilled />
                                        </div>
                                        <p className="line-clamp-1">Renderização dos resultados</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-cinza-grafite flex flex-col gap-4 p-4 rounded-xl lg:gap-8 2xl:p-8 bordaInterativa">
                    <div className="flex flex-col gap-1">
                        <p className="uppercase text-lg text-laranja-impacto">Conceitos físicos aplicados</p>
                        <div className="font-bold uppercase text-4xl flex flex-col gap-2">
                            <h2>Formulas que movem a simulação</h2>
                        </div>
                    </div>
                    <div>
                        <ul className="grid grid-cols-4 gap-4">
                            <li className="border border-zinc-500 p-4 rounded-xl grid grid-rows-[auto_1fr_auto] bg-zinc-900">
                                <h3 className="uppercase font-bold text-xl text-center">Energia Cinética</h3>
                                <div className="relative w-24 h-14 mx-auto my-auto">
                                    <Image alt="formula" src={'/assets/formulas/cinetica.png'} fill className="object-cover"/>
                                </div>
                                <p className="text-center">Energia associada ao movimento do objeto.</p>
                            </li>
                            <li className="border border-zinc-500 p-4 rounded-xl grid grid-rows-[auto_1fr_auto] bg-zinc-900">
                                <h3 className="uppercase font-bold text-xl text-center">Força</h3>
                                <div className="relative w-[100px] h-8 mx-auto my-auto">
                                    <Image alt="formula" src={'/assets/formulas/forca.png'} fill className="object-cover"/>
                                </div>
                                <p className="text-center">Força resultante aplicada ao material.</p>
                            </li>
                            <li className="border border-zinc-500 p-4 rounded-xl grid grid-rows-[auto_1fr_auto] bg-zinc-900">
                                <h3 className="uppercase font-bold text-xl text-center">Tensão Mecânica</h3>
                                <div className="relative w-24 h-16 mx-auto my-auto">
                                    <Image alt="formula" src={'/assets/formulas/tensao.png'} fill className="object-cover"/>
                                </div>
                                <p className="text-center">Relação entre força aplicada e área da seção.</p>
                            </li>
                            <li className="border border-zinc-500 p-4 rounded-xl grid grid-rows-[auto_1fr_auto] bg-zinc-900">
                                <h3 className="uppercase font-bold text-xl text-center">Deformação</h3>
                                <div className="relative w-24 h-14 mx-auto my-auto">
                                    <Image alt="formula" src={'/assets/formulas/deformacao.png'} fill className="object-cover"/>
                                </div>
                                <p className="text-center">Variação relativa do comprimento do material.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-cinza-grafite grid grid-cols-[500px_1fr] gap-4 rounded-xl relative h-fit 2xl:grid-cols-[600px_1fr] bordaInterativa">
                    <div className="flex flex-col gap-2 z-10 p-4 2xl:p-8">
                        <h3 className="uppercase font-bold text-4xl">Pronto para simular?</h3>
                        <p>Configure seus cenários, execute simulações e descubra como os materiais reagem ao impacto</p>
                        <Link href="/" className="flex items-center gap-1 bg-laranja-impacto rounded-xl p-2 px-4 text-lg font-bold w-fit" style={{textShadow: '1px 1px 2px black'}}>
                            <RiLoginBoxLine />
                            <p>Acessar Painel de Simulações</p>
                            <FaArrowRight />
                        </Link>
                    </div>
                    <div className="absolute top-[50%] right-0 2xl:top-[45%]" style={{transform: 'translate(0,-35%)'}}>
                        <div className="relative w-[500px] h-[140px] ml-auto 2xl:w-[700px] 2xl:h-[200px]">
                            <Image alt="bola" src={'/assets/bola-5.png'} fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}