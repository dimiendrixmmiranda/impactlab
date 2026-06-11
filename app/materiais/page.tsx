'use client'
import Template from "@/components/template/Template";
import { materiais } from "@/constants/materiais";
import Image from "next/image";
import { useState } from "react";
import { BsCalendarDate, BsGraphUp } from "react-icons/bs";
import { FaArrowRight, FaCheckCircle, FaCube, FaCubes } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdAutoGraph, MdOutlineScience } from "react-icons/md";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosCodeDownload } from "react-icons/io";
import { VscGraph, VscGraphLine } from "react-icons/vsc";
import { TbActivityHeartbeat } from "react-icons/tb";
import { CgMenuOreos } from "react-icons/cg";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { LuShieldCheck } from "react-icons/lu";
import { Material } from "@/interfaces/Material";
import { GiCrackedShield, GiCubes, GiPoison } from "react-icons/gi";
import { SiElasticsearch } from "react-icons/si";
import { absorcaoEnergia, fragilidade, porcentagem, tenacidade } from "@/constants/formulas";

export default function Page() {
    const [buscaMaterial, setBuscaMaterial] = useState('')
    const [visible, setVisible] = useState(false);
    const [materialAtual, setMaterialAtual] = useState<Material | null>(null)
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(8);

    const valorTenacidade =
        materialAtual
            ? tenacidade(
                materialAtual.limiteRuptura,
                materialAtual.alongamento
            )
            : 0;

    const valorFragilidade =
        materialAtual
            ? fragilidade(materialAtual.alongamento)
            : 0;

    const valorAbsorcao =
        materialAtual
            ? absorcaoEnergia(
                materialAtual.limiteRuptura,
                materialAtual.alongamento
            )
            : 0;

    const maiorTenacidade = Math.max(
        ...materiais.map(m =>
            tenacidade(
                m.limiteRuptura,
                m.alongamento
            )
        )
    );

    const maiorFragilidade = Math.max(
        ...materiais.map(m =>
            fragilidade(m.alongamento)
        )
    );

    const maiorAbsorcao = Math.max(
        ...materiais.map(m =>
            absorcaoEnergia(
                m.limiteRuptura,
                m.alongamento
            )
        )
    );

    const pctTenacidade =
        porcentagem(
            valorTenacidade,
            maiorTenacidade
        );

    const pctFragilidade =
        porcentagem(
            valorFragilidade,
            maiorFragilidade
        );

    const pctAbsorcao =
        porcentagem(
            valorAbsorcao,
            maiorAbsorcao
        );

    const classificacao = (pct: number) => {
        if (pct >= 70) return "alta";
        if (pct >= 40) return "media";
        return "baixa";
    }


    const onPageChange = (event: PaginatorPageChangeEvent): void => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const materiaisFiltrados = materiais.filter((material) =>
        material.nome
            .toLowerCase()
            .includes(buscaMaterial.toLowerCase())
    );
    const materiaisPaginados = materiaisFiltrados.slice(
        first,
        first + rows
    )

    console.log(visible)

    function cardMaterial(material: Material) {
        return (
            <div key={material.id} className="bg-zinc-800 p-2 rounded-xl border border-zinc-500 w-full max-w-[320px] mx-auto flex flex-col gap-3 lg:p-4">
                <div>
                    <h2 className="text-xl font-bold">{material.nome}</h2>
                    <p className="text-laranja-impacto">{material.categoria}</p>
                </div>
                <div className="relative w-[240px] h-[240px] mx-auto">
                    <Image alt="img" src={material.imagem} fill className="object-cover" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <p>Resistência (MPa)</p>
                        <span>{material.resistencia}</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Densidade (g/cm²)</p>
                        <span>{material.densidade}</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Dureza (HB)</p>
                        <span>{material.dureza}</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Elasticidade (GPa)</p>
                        <span>{material.elasticidade}</span>
                    </div>
                </div>
                <button
                    className="border border-laranja-impacto text-laranja-impacto rounded-xl flex gap-2 items-center p-2 px-4 cursor-pointer w-full justify-between"
                    onClick={() => {
                        setVisible(true)
                        setMaterialAtual(material)
                    }}
                >
                    <p>Ver Detalhes</p>
                    <FaArrowRight />
                </button>
            </div>
        )
    }

    return (
        <Template>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 p-4">
                <div className="rounded-xl lg:grid lg:grid-cols-2 lg:gap-8 bordaInterativa">
                    <div className="font-oswald p-4 flex flex-col gap-6 lg:p-8">
                        <div className="flex flex-col gap-2">
                            <p className="uppercase text-lg text-laranja-impacto">Materiais</p>
                            <div className="font-bold uppercase text-4xl">
                                <h2>Diferentes materiais,</h2>
                                <h2 className="text-laranja-impacto">Diferentes Respostas.</h2>
                            </div>
                            <span>
                                Cada material possui características únicas que determinam sua resistência, durabilidade e comportamento diante de um impacto. Conheça os materiais disponíveis no <b>ImpactLab</b> e entenda como eles reagem em situações reais.
                            </span>
                        </div>
                        <div className="lg:grid lg:grid-cols-3 lg:gap-2">
                            <div className="grid grid-rows-[50px_auto_auto] justify-center items-center gap-1">
                                <div className="w-[50px] h-[50px] mx-auto rounded-full p-1 border border-laranja-impacto flex justify-center items-center text-3xl text-laranja-impacto">
                                    <FaCubes />
                                </div>
                                <h3 className="font-bold text-3xl mx-auto text-laranja-impacto">50+</h3>
                                <p className="text-center leading-5">Materiais disponíveis</p>
                            </div>
                            <div className="grid grid-rows-[50px_auto_auto] justify-center items-center gap-1">
                                <div className="w-[50px] h-[50px] mx-auto rounded-full p-1 border border-laranja-impacto flex justify-center items-center text-3xl text-laranja-impacto">
                                    <GoShieldCheck />
                                </div>
                                <h3 className="font-bold text-3xl mx-auto text-laranja-impacto">Dados</h3>
                                <p className="text-center leading-5">Baseados em propriedades reais</p>
                            </div>
                            <div className="grid grid-rows-[50px_auto_auto] justify-center items-center gap-1">
                                <div className="w-[50px] h-[50px] mx-auto rounded-full p-1 border border-laranja-impacto flex justify-center items-center text-3xl text-laranja-impacto">
                                    <MdOutlineScience />
                                </div>
                                <h3 className="font-bold text-3xl mx-auto text-laranja-impacto">Testados</h3>
                                <p className="text-center leading-5">Em simulações de impacto</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="relative w-full my-auto h-[350px] xl:h-[400px]">
                            <Image alt="Bola batendo nas paredes" src={'/assets/bola-4.png'} fill className="object-cover" />
                        </div>
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-4 lg:gap-4 p-4 rounded-xl bordaInterativa">
                    <div className="grid grid-cols-[50px_auto] gap-2 border-r border-zinc-500">
                        <div className="w-[50px] h-[50px] rounded-full border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-3xl">
                            <FaCube />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-lg">Propriedades reais</h2>
                            <span>
                                Utilizamos propriedades mecânicas reais de cada material para garantir simulações precisas.
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[50px_auto] gap-2 border-r border-zinc-500">
                        <div className="w-[50px] h-[50px] rounded-full border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-3xl">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-lg">Comparação Inteligente</h2>
                            <span>
                                Compare materiais entre si e descubra qual oferece maior resistencia para cada cenario de impacto.
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-[50px_auto] gap-2 border-r border-zinc-500">
                        <div className="w-[50px] h-[50px] rounded-full border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-3xl">
                            <BsGraphUp />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-lg">Desempenho Detalhado</h2>
                            <span>
                                Veja dados como resistência à tração, dureza, densidade e comportamento ao impacto.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-[50px_auto] gap-2">
                        <div className="w-[50px] h-[50px] rounded-full border border-laranja-impacto text-laranja-impacto flex justify-center items-center text-3xl">
                            <MdOutlineScience />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-lg">Diversidade de Materiais</h2>
                            <span>
                                Metais, polimeros, compositos, cerâmicas, madeiras e muito mais em um só lugar.
                            </span>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bordaInterativa">
                    <div className="flex flex-col gap-2 p-4 xl:p-6 xl:px-10">
                        <p className="uppercase text-lg text-laranja-impacto">Catálogo de materiais</p>
                        <div className="flex items-center gap-4">
                            <h2 className="font-bold uppercase text-3xl">Explore os materiais disponíveis:</h2>
                            <div className="flex items-center gap-4 ml-auto">
                                <input
                                    className="p-2 rounded-xl border border-zinc-500 h-[40px] w-[240px]"
                                    type="text"
                                    value={buscaMaterial}
                                    onChange={(e) => {
                                        setBuscaMaterial(e.target.value)
                                        setFirst(0)
                                    }}
                                    placeholder="Buscar Material..."
                                />
                            </div>
                        </div>
                        <div className="lg:grid lg:gap-6 lg:grid-cols-3 lg:mt-4 xl:grid-cols-4">
                            {
                                materiaisPaginados.length > 0 ? (
                                    materiaisPaginados.map((material) => {
                                        return cardMaterial(material)
                                    })
                                ) : (
                                    <div className="col-span-4">
                                        <h3 className="text-2xl font-bold text-center">Nenhum elemento encontrado!</h3>
                                    </div>
                                )
                            }
                        </div>
                        <div className="card mt-4">
                            <Paginator
                                first={first}
                                rows={rows}
                                totalRecords={materiaisFiltrados.length}
                                onPageChange={onPageChange}
                                template="PrevPageLink PageLinks NextPageLink"
                            />
                        </div>
                        <Dialog
                            visible={visible}
                            onHide={() => { if (!visible) return; setVisible(false); }}
                            className="w-full max-w-[1100px]"
                        >
                            <div className="grid grid-cols-[350px_1fr] p-4 gap-4 bg-cinza-grafite text-white">
                                <div className="flex flex-col gap-5 pr-4">
                                    <div className="px-4 pt-4 bg-cinza-grafite text-white absolute top-0 left-0">
                                        <h2 className="font-bold text-2xl">{materialAtual?.nome}</h2>
                                    </div>
                                    {/* descrição */}
                                    <p className="mt-2">
                                        {materialAtual?.descricao}
                                    </p>
                                    <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
                                        <Image alt={materialAtual?.nome!} src={materialAtual?.imagem!} fill className="object-cover" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="flex flex-col justify-center items-center">
                                            <FaCube className="text-laranja-impacto text-4xl" />
                                            <span className="text-sm">Código</span>
                                            <p className="text-sm">{materialAtual?.codigo}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <BiCategoryAlt className="text-laranja-impacto text-4xl" />
                                            <span className="text-sm">Categoria</span>
                                            <p className="text-sm">{materialAtual?.categoria}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <IoShieldCheckmarkOutline className="text-laranja-impacto text-4xl" />
                                            <span className="text-sm">Disponivel</span>
                                            <p className="text-sm">{materialAtual?.disponivel ? 'Disponível' : 'Não Disponível'}</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <BsCalendarDate className="text-laranja-impacto text-4xl" />
                                            <span className="text-sm whitespace-nowrap">Atualizado em</span>
                                            <p className="text-sm">25/02/2026</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="flex items-center gap-1 rounded-lg py-2 border border-zinc-500 text-sm text-center justify-center">
                                            <FaCube />
                                            <p>Baixar fixa Técnica</p>
                                        </button>
                                        <button className="flex items-center gap-1 rounded-lg py-2 border border-laranja-impacto text-sm text-center justify-center text-laranja-impacto!">
                                            <IoIosCodeDownload />
                                            <p>Usar em simulação</p>
                                        </button>
                                    </div>
                                </div>
                                <div className=" ">
                                    <div className="grid grid-cols-4">
                                        <button className="flex items-center gap-2">
                                            <VscGraph />
                                            <p className="font-share-tech font-bold text-xl">Propriedades</p>
                                        </button>
                                        <button className="flex items-center gap-2">
                                            <TbActivityHeartbeat />
                                            <p className="font-share-tech font-bold text-xl">Comportamento</p>
                                        </button>
                                        <button className="flex items-center gap-2">
                                            <CgMenuOreos />
                                            <p className="font-share-tech font-bold text-xl">Aplicações</p>
                                        </button>
                                        <button className="flex items-center gap-2">
                                            <HiOutlineDocumentText />
                                            <p className="font-share-tech font-bold text-xl">Observações</p>
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4 px-4 border-l border-zinc-500 mt-4">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2 text-xl font-bold">
                                                <VscGraph className="text-laranja-impacto" />
                                                <h3>
                                                    Propriedades Mecânicas
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-4 gap-4">
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <LuShieldCheck />
                                                        <p className="text-sm whitespace-nowrap">Resistência (MPa)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.resistencia}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <GiCubes />
                                                        <p className="text-sm whitespace-nowrap">Densidade (g/cm³)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.resistencia}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <GiCrackedShield />
                                                        <p className="text-sm whitespace-nowrap">Dureza (HB)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.dureza}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <SiElasticsearch />
                                                        <p className="text-sm whitespace-nowrap">Elasticidade (GPa)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.elasticidade}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <GiPoison />
                                                        <p className="text-sm whitespace-nowrap">Coef. Poisson</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.coeficientePoisson}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <VscGraphLine />
                                                        <p className="text-sm whitespace-nowrap">Escoamento (MPa)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.limiteEscoamento}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <LuShieldCheck />
                                                        <p className="text-sm whitespace-nowrap">Ruptura (MPa)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.limiteRuptura}</span>
                                                </div>
                                                <div className="flex flex-col bg-zinc-800 p-2 rounded-xl">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <MdAutoGraph />
                                                        <p className="text-sm whitespace-nowrap">Alongamento (%)</p>
                                                    </div>
                                                    <span className="font-bold text-xl text-center">{materialAtual?.alongamento}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2 text-xl font-bold">
                                                <TbActivityHeartbeat className="text-laranja-impacto" />
                                                <h3>
                                                    Comportamento em Impacto
                                                </h3>
                                            </div>
                                            <div className="bg-zinc-800 p-4 rounded-xl grid grid-cols-3 gap-4">
                                                <div className="flex flex-col gap-1 pr-4 border-r border-zinc-500">
                                                    <h4>Absorção de Energia</h4>
                                                    <span className="font-bold capitalize">
                                                        {classificacao(pctAbsorcao)}
                                                    </span>
                                                    <div className="w-full bg-zinc-300 rounded-lg overflow-hidden">
                                                        <div
                                                            className={`
                                                            h-2 ${classificacao(pctAbsorcao) === 'alta' ? 'bg-green-500' : ''}
                                                            ${classificacao(pctAbsorcao) === 'media' ? 'bg-yellow-600' : ''}
                                                            ${classificacao(pctAbsorcao) === 'baixa' ? 'bg-red-500' : ''}
                                                            `}
                                                            style={{
                                                                width: `${pctAbsorcao}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1 pr-4 border-r border-zinc-500">
                                                    <h4>Tenacidade</h4>
                                                    <span className="font-bold capitalize">
                                                        {classificacao(pctTenacidade)}
                                                    </span>
                                                    <div className="w-full bg-zinc-300 rounded-lg overflow-hidden">
                                                        <div
                                                            className={`
                                                            h-2 ${classificacao(pctTenacidade) === 'alta' ? 'bg-green-500' : ''}
                                                            ${classificacao(pctTenacidade) === 'media' ? 'bg-yellow-600' : ''}
                                                            ${classificacao(pctTenacidade) === 'baixa' ? 'bg-red-500' : ''}
                                                            `}
                                                            style={{
                                                                width: `${pctTenacidade}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h4>Fragilidade</h4>
                                                    <span className="font-bold capitalize">
                                                        {classificacao(pctFragilidade)}
                                                    </span>
                                                    <div className="w-full bg-zinc-300 rounded-lg overflow-hidden">
                                                        <div
                                                            className={`
                                                            h-2 ${classificacao(pctFragilidade) === 'alta' ? 'bg-green-500' : ''}
                                                            ${classificacao(pctFragilidade) === 'media' ? 'bg-yellow-600' : ''}
                                                            ${classificacao(pctFragilidade) === 'baixa' ? 'bg-red-500' : ''}
                                                            `}
                                                            style={{
                                                                width: `${pctFragilidade}%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[auto_1fr] gap-4">
                                            <div className="flex flex-col gap-4 bg-zinc-800 p-4 rounded-xl">
                                                <div className="flex items-center gap-2 text-xl font-bold">
                                                    <VscGraph className="text-laranja-impacto" />
                                                    <h3>
                                                        Aplicações Comuns
                                                    </h3>
                                                </div>
                                                <div>
                                                    <ul className="flex flex-col gap-2">
                                                        {
                                                            materialAtual?.aplicacoes.map(aplicacao => {
                                                                return (
                                                                    <li className="flex items-center gap-1 text-sm">
                                                                        <FaCheckCircle className="text-laranja-impacto" />
                                                                        <p>{aplicacao}</p>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4 bg-zinc-800 p-4 rounded-xl">
                                                <div className="flex items-center gap-2 text-xl font-bold">
                                                    <BsGraphUp className="text-laranja-impacto" />
                                                    <h3>
                                                        Gráfico Tensão x Deformação
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
                <div className="rounded-xl p-4 lg:grid lg:grid-cols-[600px_1fr_150px] lg:gap-6 2xl:grid-cols-[600px_1fr_250px] bordaInterativa">
                    <div className="flex items-center gap-4 border-r w-fit">
                        <div className="text-9xl text-laranja-impacto"><FiTarget /></div>
                        <div className="max-w-[420px] flex flex-col justify-between h-full xl:w-full">
                            <h3 className="font-bold text-xl">Por que os materiais reagem diferente?</h3>
                            <p className="text-lg">A estrutura interna, a composição química e as propriedades mecânicas de cada material determinam como ele absorve, distribui ou reflete a energia.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-xl">Fatores que influenciam</h3>
                        <div className="flex flex-wrap gap-2">
                            <div className="border border-laranja-impacto p-2 rounded-xl text-laranja-impacto w-fit">
                                <p>Resistência à tração</p>
                            </div>
                            <div className="border border-laranja-impacto p-2 rounded-xl text-laranja-impacto w-fit">
                                <p>Dureza</p>
                            </div>
                            <div className="border border-laranja-impacto p-2 rounded-xl text-laranja-impacto w-fit">
                                <p>Densidade</p>
                            </div>
                            <div className="border border-laranja-impacto p-2 rounded-xl text-laranja-impacto w-fit">
                                <p>Elasticidade</p>
                            </div>
                            <div className="border border-laranja-impacto p-2 rounded-xl text-laranja-impacto w-fit">
                                <p>Tenacidade</p>
                            </div>
                            <div className="border border-laranja-impacto p-2 rounded-xl text-laranja-impacto w-fit">
                                <p>Estrutura Interna</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-full hidden xl:block">
                        <Image alt="cubo" src={'/assets/cubo.png'} fill className="object-contain" />
                    </div>
                </div>
            </div>
        </Template>
    )
}