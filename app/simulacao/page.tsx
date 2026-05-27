'use client'
import Template from "@/components/template/Template";
import { materiais } from "@/constants/materiais";
import { useEffect, useState } from "react";

export default function Page() {
    const [espessura, setEspessura] = useState<number>(0)
    const [massa, setMassa] = useState<number>(0)
    const [velocidade, setVelocidade] = useState<number>(0)
    const [material, setMaterial] = useState('')
    console.log(massa)
    console.log(velocidade)

    const energiaCinetica = (massa: number, velocidade: number) => {
        const resultado = massa * (Math.pow(velocidade, 2)) / 2
        return (resultado)
    }
    const momentoLinear = (massa: number, velocidade: number) => {
        const resultado = massa * velocidade
        return (resultado)
    }
    const forcaDeImpacto = (massa: number, velocidade: number, t: number = 0.01) => {
        const ml = momentoLinear(massa, velocidade)
        const resultado = ml / t
        return (resultado)
    }

    return (
        <Template>
            <section className="min-h-screen bg-black text-white overflow-hidden relative">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.12),transparent_45%)]" />

                {/* GRID */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,107,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* CONTENT */}
                <div className="relative z-10 flex h-screen">

                    {/* SIDEBAR */}
                    <aside className="w-[360px] border-r border-orange-500/10 bg-[#0D0D0D]/90 backdrop-blur-xl p-6 flex flex-col gap-6">

                        {/* HEADER */}
                        <div>
                            <h1 className="text-4xl font-bold leading-tight font-oswald">
                                Painel de
                                <span className="text-orange-500"> Simulação</span>
                            </h1>
                        </div>

                        {/* WALL */}
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-5 space-y-4">

                            <h2 className="text-orange-500 text-lg font-semibold">
                                Parede
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Material
                                </label>

                                <select className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none" value={material} onChange={(e) => setMaterial(e.target.value)}>
                                    {
                                        materiais.map((material) => {
                                            return (
                                                <option value={material.id}>{material.nome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Espessura (cm)
                                </label>

                                <input
                                    type="number"
                                    placeholder="5 cm"
                                    value={espessura}
                                    onChange={(e) => setEspessura(parseFloat(e.target.value))}
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                />
                            </div>

                        </div>

                        {/* OBJECT */}
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-5 space-y-4">

                            <h2 className="text-orange-500 text-lg font-semibold">
                                Objeto
                            </h2>

                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Massa
                                </label>

                                <input
                                    type="number"
                                    placeholder="10 kg"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                    value={massa}
                                    onChange={(e) => setMassa(parseFloat(e.target.value))}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Velocidade
                                </label>

                                <input
                                    type="number"
                                    placeholder="80 m/s"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                    value={velocidade}
                                    onChange={(e) => setVelocidade(parseFloat(e.target.value))}
                                />
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button className="bg-orange-500 hover:bg-orange-400 transition-all duration-300 rounded-2xl p-4 font-bold text-lg shadow-[0_0_35px_rgba(255,107,0,0.35)]">
                            Iniciar Simulação
                        </button>

                    </aside>

                    {/* SIMULATION AREA */}
                    <section className="flex-1 relative flex items-center justify-center">

                        {/* CENTER GLOW */}
                        <div className="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full" />

                        {/* SIMULATION */}
                        <div className="relative w-[900px] h-[500px] border border-orange-500/10 rounded-[40px] bg-[#111]/60 backdrop-blur-md overflow-hidden">

                            {/* LABEL */}
                            <div className="absolute top-6 left-6">
                                <p className="text-orange-500 uppercase tracking-[0.3em] text-xs">
                                    Área de Simulação
                                </p>
                            </div>

                            {/* BALL */}
                            <div className="absolute left-20 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 shadow-[0_0_50px_rgba(255,255,255,0.25)]" />

                            {/* TRAIL */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[2px] bg-gradient-to-r from-transparent to-orange-500 opacity-70" />

                            {/* WALL */}
                            {
                                espessura <= 0 || isNaN(espessura) ? (
                                    <div className="absolute right-24 top-1/2 -translate-y-1/2">
                                        <div className={`
                                        w-[200px] h-[340px] border border-orange-500/40 bg-gradient-to-b from-orange-500/10 to-transparent backdrop-blur-md rounded-md relative overflow-hidden p-4 flex justify-center items-center
                                    `}>
                                            <p className="font-share-tech text-3xl text-center">Determine a espessura da parede</p>
                                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,107,0,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.4)_1px,transparent_1px)] bg-[size:25px_25px]" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute right-24 top-1/2 -translate-y-1/2">
                                        <div className={`
                                                h-[340px] border border-orange-500/40 bg-gradient-to-b from-orange-500/10 to-transparent backdrop-blur-md rounded-md relative overflow-hidden
                                            `}
                                            style={{ width: `${espessura}px` }}
                                        >
                                            {/* GRID */}
                                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,107,0,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.4)_1px,transparent_1px)] bg-[size:25px_25px]" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        {/* STATS */}
                        <div className="absolute bottom-8 right-8 w-[340px] bg-[#111]/90 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex flex-col gap-4">
                            <p className="text-orange-500 uppercase tracking-[0.3em] text-xs">

                                Dados em Tempo Real
                            </p>

                            <div>
                                <p>Dados utilizados:</p>
                                <ul className="flex gap-2 text-sm">
                                    <li>
                                        <p><b>m</b>: {massa}</p>
                                    </li>
                                    <li>
                                        <p><b>v</b>: {massa}</p>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">

                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">
                                        Energia Cinética
                                    </span>

                                    <span className="font-bold text-xl">
                                        {energiaCinetica(massa, velocidade)} J
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">
                                        Momento Linear
                                    </span>

                                    <span className="font-bold text-xl">
                                        {momentoLinear(massa, velocidade)} kg*m/s
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">
                                        Força de Impacto
                                    </span>

                                    <span className="font-bold text-xl">
                                        {forcaDeImpacto(massa, velocidade)} N
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">
                                        Dano Estrutural
                                    </span>

                                    <span className="font-bold text-xl text-red-500">
                                        72%
                                    </span>
                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </section>
        </Template>
    );
}