import Template from "@/components/template/Template";
import { dicasImpactLab } from "@/constants/dicas";

export default function Page(){
    return (
        <Template>
            <div className="p-4 flex flex-col gap-8 max-w-[1440px] mx-auto">
                <h3 className="text-4xl font-oswald font-bold">Confira todas as dicas para a plataforma:</h3>
                <ul className="grid grid-cols-4 gap-4">
                    {
                        dicasImpactLab.map((dica, i) => {
                            return (
                                <li key={i} className="flex flex-col gap-2 border rounded-xl p-4 bg-laranja-impacto text-shadow-[1px_1px_2px_black]">
                                    <h4 className="font-bold text-xl leading-6">{dica.titulo}</h4>
                                    <p>{dica.descricao}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Template>
    )
}