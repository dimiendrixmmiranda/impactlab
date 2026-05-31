'use client'
import Template from "@/components/template/Template";
import { materiais } from "@/constants/materiais";
import Image from "next/image";
import { useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { FaArrowRight, FaCube, FaCubes } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { GoShieldCheck } from "react-icons/go";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineScience } from "react-icons/md";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

export default function Page() {
    const [buscaMaterial, setBuscaMaterial] = useState('')

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(8);

    const onPageChange = (event: PaginatorPageChangeEvent): void => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const materiaisPaginados = materiais.slice(
        first,
        first + rows
    )

    function cardMaterial(material: string, tipo: string, imagem: string, resistencia: number, densidade: number, dureza: number, elasticidade: number) {
        return (
            <div className="bg-zinc-700 p-2 rounded-xl border border-zinc-500 w-full max-w-[320px] mx-auto flex flex-col gap-3 lg:p-4">
                <div>
                    <h2 className="text-xl font-bold">{material}</h2>
                    <p className="text-laranja-impacto">{tipo}</p>
                </div>
                <div className="relative w-[240px] h-[240px] mx-auto">
                    <Image alt="img" src={imagem} fill className="object-cover" />
                </div>
                <div>
                    <div className="flex justify-between">
                        <p>Resistência (MPa)</p>
                        <span>{resistencia}</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Densidade (g/cm²)</p>
                        <span>{densidade}</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Dureza (HB)</p>
                        <span>{dureza}</span>
                    </div>
                    <div className="flex justify-between">
                        <p>Elasticidade (GPa)</p>
                        <span>{elasticidade}</span>
                    </div>
                </div>
                <button className="border border-laranja-impacto text-laranja-impacto rounded-xl flex gap-2 items-center p-2 px-4 cursor-pointer w-full justify-between">
                    <p>Ver Detalhes</p>
                    <FaArrowRight />
                </button>
            </div>
        )
    }

    return (
        <Template>
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8 p-4">
                <div className="bg-zinc-800 rounded-xl lg:grid lg:grid-cols-2 lg:gap-8">
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
                <div className="bg-zinc-800 lg:grid lg:grid-cols-4 lg:gap-4 p-4 rounded-xl">
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
                <div className="bg-zinc-800 rounded-xl">
                    <div className="flex flex-col gap-2 p-4 xl:p-6 xl:px-10">
                        <p className="uppercase text-lg text-laranja-impacto">Catálogo de materiais</p>
                        <div className="flex items-center gap-4">
                            <h2 className="font-bold uppercase text-3xl">Explore os materiais disponíveis:</h2>
                            <div className="flex items-center gap-4 ml-auto">
                                <input className="p-2 rounded-xl border border-zinc-500 h-[40px] w-[240px]" type="text" name="buscaMaterial" id="buscaMaterial" placeholder="Buscar Material..." />
                                <select className="p-2 rounded-xl border border-zinc-500 h-[40px] w-[240px]" name="categoria" id="categoria">
                                    <option value="">Selecione</option>
                                </select>
                            </div>
                        </div>
                        <div className="lg:grid lg:gap-6 lg:grid-cols-3 lg:mt-4 xl:grid-cols-4">
                            {
                                materiaisPaginados.map((material) => {
                                    return cardMaterial(
                                        material.nome,
                                        material.categoria,
                                        material.imagem,
                                        material.resistencia,
                                        material.densidade,
                                        material.dureza,
                                        material.elasticidade
                                    )
                                })
                            }
                        </div>
                        <div className="card mt-4">
                            <Paginator
                                first={first}
                                rows={rows}
                                totalRecords={materiais.length}
                                onPageChange={onPageChange}
                                template="PrevPageLink PageLinks NextPageLink"
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 lg:grid lg:grid-cols-[600px_1fr_150px] lg:gap-6 2xl:grid-cols-[600px_1fr_250px]">
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