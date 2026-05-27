import Detalhes from "@/components/detalhes/Detalhes";
import Estatisticas from "@/components/estatisticas/Estatisticas";
import Home from "@/components/home/Home";
import Sobre from "@/components/sobre/Sobre";
import Template from "@/components/template/Template";

export default function Page() {
	return (
		<Template>
			<Home />
			<div className="bg-black w-full flex flex-col justify-center items-center gap-6 xl:py-10">
				<div className="flex flex-col justify-center bg-zinc-900 rounded-xl max-w-[1440px] m-4" id="detalhes">
					<Detalhes />
					<Estatisticas />
				</div>
				<div className="flex flex-col justify-center bg-zinc-900 rounded-xl max-w-[1440px] m-4">
					<Sobre/>
				</div>
			</div>
		</Template>
	)
}
