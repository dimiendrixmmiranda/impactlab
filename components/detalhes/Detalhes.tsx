import { BsGraphUpArrow } from "react-icons/bs"
import { IoCubeOutline, IoDocumentTextOutline, IoShieldCheckmark } from "react-icons/io5"
import { RxCrosshair2 } from "react-icons/rx"

export default function Detalhes() {

    const gerarDetalhe = (icone: React.ReactNode, titulo: string, descricao: string) => {
        return (
            <div className="group p-2 bg-zinc-800 rounded-xl border border-zinc-500 flex flex-col gap-4 cursor-pointer lg:p-4 hover:bg-laranja-impacto duration-500 hover:scale-105 hover:text-shadow-[1px_1px_2px_black]">
                <div className="text-6xl flex justify-center items-center text-laranja-impacto group-hover:text-white duration-500 group-hover:drop-shadow-[1px_1px_2px_black]">
                    {icone}
                </div>
                <div className="flex flex-col text-center gap-1">
                    <h3 className="uppercase text-lg">{titulo}</h3>
                    <p>{descricao}</p>
                </div>
                <div className="w-[40px] h-1 bg-laranja-impacto mx-auto mt-auto"></div>
            </div>
        )
    }

    return (
        <section className="relative font-oswald p-4 flex flex-col gap-4 lg:gap-8">
            <div className="font-oswald p-4 flex flex-col gap-4 max-w-[1440px] w-full mx-auto lg:gap-8 ">
                <div className="flex flex-col justify-center items-center">
                    <p className="uppercase text-laranja-impacto">Recursos principas</p>
                    <h3 className="text-4xl max-w-[400px] text-center">
                        Tudo que você precisa para simulações precisas
                    </h3>
                </div>
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:gap-4">
                    {
                        gerarDetalhe(<IoCubeOutline />, 'Simulações Realistas', 'Motor físico avançado que simula colisões e impactos com alto nivel de precisão.')
                    }
                    {
                        gerarDetalhe(<IoShieldCheckmark />, 'Materiais Diversificados', 'Biblioteca completa com propriedades reais e diversos materiais estruturais.')
                    }
                    {
                        gerarDetalhe(<BsGraphUpArrow />, 'Análises Detalhadas', 'Resultados completos com gráficos, métricas e relatórios de desempenho estrutural.')
                    }
                    {
                        gerarDetalhe(<RxCrosshair2 />, 'Visualização Interativa', 'Animações em tempo real e representações visuais do dano e deformação.')
                    }
                    {
                        gerarDetalhe(<IoDocumentTextOutline />, 'Relatórios Exportáveis', 'Gere relatórios completos das simulações em PDF para estudos e projetos.')
                    }
                </div>
            </div>
        </section>
    )
}