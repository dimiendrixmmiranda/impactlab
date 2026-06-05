'use client'

import Template from "@/components/template/Template";
import { materiais } from "@/constants/materiais";
import { useUsuario } from "@/hooks/useUsuario";
import ResultadoSimulacao from "@/interfaces/ResultadoSimulacao";
import { useMemo, useState } from "react";

export default function Page() {
    const { usuario } = useUsuario();
    const [material, setMaterial] = useState('')

    const [massa, setMassa] = useState('')
    const [velocidade, setVelocidade] = useState('')
    const [diametroProjetil, setDiametroProjetil] = useState('')
    const [espessura, setEspessura] = useState('')


    const [resultado, setResultado] =
        useState<ResultadoSimulacao | null>(null)


    const materialSelecionado = useMemo(() => {
        return materiais.find(
            (m) => m.id === material
        )
    }, [material])

    console.log(usuario)

    /*
    ========================================
    FÍSICA
    ========================================
    */

    // Ec = mv² / 2
    const energiaCinetica = (
        massa: number,
        velocidade: number
    ) => {

        return (
            massa * Math.pow(velocidade, 2)
        ) / 2
    }

    // p = mv
    const momentoLinear = (
        massa: number,
        velocidade: number
    ) => {

        return massa * velocidade
    }

    // F = Δp / Δt
    const forcaImpacto = (
        massa: number,
        velocidade: number,
        tempoImpacto: number = 0.01
    ) => {

        const deltaP =
            momentoLinear(
                massa,
                velocidade
            )

        return deltaP / tempoImpacto
    }

    // A = πr²
    const areaImpacto = (
        diametro: number
    ) => {

        const raio = diametro / 2

        return (
            Math.PI *
            Math.pow(raio, 2)
        )
    }

    // σ = F / A
    const tensaoMecanica = (
        forca: number,
        area: number
    ) => {

        if (area <= 0) return 0

        return forca / area
    }

    /*
    ========================================
    CÁLCULOS
    ========================================
    */

    const energia =
        energiaCinetica(
            parseFloat(massa),
            parseFloat(velocidade)
        )

    const momento =
        momentoLinear(
            parseFloat(massa),
            parseFloat(velocidade)
        )

    const impacto =
        forcaImpacto(
            parseFloat(massa),
            parseFloat(velocidade)
        )

    const area =
        areaImpacto(
            parseFloat(diametroProjetil)
        )

    const tensao =
        tensaoMecanica(
            impacto,
            area
        )

    /*
    ========================================
    RESISTÊNCIA DA PAREDE
    ========================================
    */

    const resistenciaMaterial =
        materialSelecionado?.resistencia || 0

    const resistenciaParede =
        resistenciaMaterial * parseFloat(espessura)

    /*
    ========================================
    INTEGRIDADE
    ========================================
    */

    let integridade = 100

    if (resistenciaParede > 0) {

        integridade =
            (
                (resistenciaParede - tensao)
                / resistenciaParede
            ) * 100
    }

    /*
    ========================================
    STATUS
    ========================================
    */

    let status = 'Estável'
    let corStatus = 'text-green-500'

    if (integridade <= 0) {

        status = 'Destruída'
        corStatus = 'text-red-600'
    }

    else if (integridade < 30) {

        status = 'Crítica'
        corStatus = 'text-orange-500'
    }

    else if (integridade < 70) {

        status = 'Danificada'
        corStatus = 'text-yellow-500'
    }

    const iniciarSimulacao = async () => {
        if (massa === '' || velocidade === '' || diametroProjetil === '' || espessura === '') {
            alert('Insira dados')
            return
        }

        const energia =
            energiaCinetica(
                Number(massa),
                Number(velocidade)
            )
        const momento =
            momentoLinear(
                Number(massa),
                Number(velocidade)
            )
        const impacto =
            forcaImpacto(
                Number(massa),
                Number(velocidade)
            )
        const area =
            areaImpacto(
                Number(diametroProjetil)
            )
        const tensao =
            tensaoMecanica(
                impacto,
                area
            )
        const resistenciaMaterial =
            materialSelecionado?.resistencia || 0
        const resistenciaParede =
            resistenciaMaterial *
            Number(espessura)
        let integridade = 100
        if (resistenciaParede > 0) {
            integridade =
                (
                    (resistenciaParede - tensao)
                    / resistenciaParede
                ) * 100
        }
        let status = "Estável"
        let corStatus = "text-green-500"
        if (integridade <= 0) {
            status = "Destruída"
            corStatus = "text-red-500"
        }
        else if (integridade < 30) {
            status = "Crítica"
            corStatus = "text-orange-500"
        }
        else if (integridade < 70) {
            status = "Danificada"
            corStatus = "text-yellow-500"
        }

        const resultadoCalculado = {
            material,
            energia,
            momento,
            impacto,
            area,
            tensao,
            integridade,
            status,
            corStatus
        }

        setResultado(resultadoCalculado)

        if (usuario) {
            await fetch("/api/simulacao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(resultadoCalculado)
            })
        }

        alert("simulação salva no banco de dados")
    }

    return (
        <Template>
            <section className="bg-black text-white relative overflow-hidden">
                {/* BACKGROUND */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.12),transparent_45%)]" />

                {/* GRID */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,107,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

                <div className="relative z-10 grid grid-cols-[350px_1fr] gap-8 h-full">
                    <aside className="w-full h-full border-r border-orange-500/10 bg-[#0D0D0D]/90 backdrop-blur-xl p-6 flex flex-col gap-6">
                        <div>
                            <h1 className="text-4xl font-bold font-oswald leading-tight">
                                Painel de <b className="text-laranja-impacto">Simulação</b>
                            </h1>
                        </div>
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-5 space-y-4">
                            <h2 className="text-orange-500 text-lg font-semibold">
                                Projétil
                            </h2>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Massa (kg)
                                </label>
                                <input
                                    type="text"
                                    value={massa}
                                    onChange={(e) =>
                                        setMassa(e.target.value)
                                    }
                                    placeholder="10"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Velocidade (m/s)
                                </label>
                                <input
                                    type="text"
                                    value={velocidade}
                                    onChange={(e) =>
                                        setVelocidade(e.target.value)
                                    }
                                    placeholder="80"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Diâmetro (cm)
                                </label>
                                <input
                                    type="text"
                                    value={diametroProjetil}
                                    onChange={(e) =>
                                        setDiametroProjetil(e.target.value)
                                    }
                                    placeholder="10"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                />
                            </div>
                        </div>
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-5 space-y-4">
                            <h2 className="text-orange-500 text-lg font-semibold">
                                Parede
                            </h2>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Material
                                </label>
                                <select
                                    value={material}
                                    onChange={(e) =>
                                        setMaterial(e.target.value)
                                    }
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                >
                                    <option value="">Selecione</option>
                                    {
                                        materiais.map((material) => (
                                            <option
                                                key={material.id}
                                                value={material.id}
                                            >
                                                {material.nome}
                                            </option>
                                        ))
                                    }

                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">
                                    Espessura (cm)
                                </label>
                                <input
                                    type="text"
                                    value={espessura}
                                    onChange={(e) =>
                                        setEspessura(e.target.value)
                                    }
                                    placeholder="20"
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none"
                                />
                            </div>
                        </div>
                        <button onClick={iniciarSimulacao} className="bg-laranja-impacto font-bold uppercase py-2 text-xl rounded-xl" style={{ textShadow: '1px 1px 2px black' }}>Iniciar Simulação</button>
                    </aside>
                    <section className="flex-1 relative flex items-center justify-center pr-8 lg:grid lg:grid-rows-[auto_1fr] lg:grid-cols-1 lg:my-8 lg:gap-8">
                        {/* <div className="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full" /> */}
                        <div className="relative w-full h-[500px] border border-orange-500/10 rounded-[40px] bg-[#111]/60 backdrop-blur-md overflow-hidden">
                            <div className="absolute top-6 left-6">
                                <p className="text-orange-500 uppercase tracking-[0.3em] text-xs">
                                    Área de Simulação
                                </p>
                            </div>

                            {/* PROJÉTIL */}
                            <div
                                className="absolute left-10 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-700 shadow-[0_0_50px_rgba(255,255,255,0.25)]"
                                style={{
                                    width: `${diametroProjetil || 80}px`,
                                    height: `${diametroProjetil || 80}px`,
                                }}
                            />

                            {/* TRAIL */}
                            {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[2px] bg-gradient-to-r from-transparent to-orange-500 opacity-70" /> */}

                            {/* PAREDE */}
                            <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                <div
                                    className="h-[340px] border border-orange-500/40 bg-gradient-to-b from-orange-500/10 to-transparent backdrop-blur-md rounded-md relative overflow-hidden"
                                    style={{
                                        width: `${espessura || 120}px`
                                    }}
                                >

                                    {/* GRID */}
                                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,107,0,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.4)_1px,transparent_1px)] bg-[size:25px_25px]" />

                                </div>

                            </div>

                        </div>
                        <div className="relative w-full h-full border border-orange-500/10 rounded-[40px] bg-[#111]/60 backdrop-blur-md overflow-hidden p-8 flex flex-col gap-4">
                            <div>
                                <p className="text-orange-500 uppercase tracking-[0.3em] text-xs">
                                    Dados
                                </p>
                            </div>
                            {
                                energia && momento && impacto && area && tensao ? (
                                    <div>
                                        <div className="grid grid-cols-2 gap-6 xl:grid-cols-3">
                                            <div className="flex items-center justify-between pb-3">
                                                <div>
                                                    <p className="text-zinc-400">
                                                        Energia Cinética
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        Ec = mv² / 2
                                                    </p>
                                                </div>
                                                <span className="font-bold text-xl text-orange-500">
                                                    {energia.toFixed(2)} J
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-3">
                                                <div>
                                                    <p className="text-zinc-400">
                                                        Momento Linear
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        p = mv
                                                    </p>
                                                </div>
                                                <span className="font-bold text-xl">
                                                    {momento.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-3">
                                                <div>
                                                    <p className="text-zinc-400">
                                                        Força de Impacto
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        F = Δp / Δt
                                                    </p>
                                                </div>
                                                <span className="font-bold text-xl text-red-500">
                                                    {impacto.toFixed(2)} N
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-3">
                                                <div>
                                                    <p className="text-zinc-400">
                                                        Área de Impacto
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        A = πr²
                                                    </p>
                                                </div>
                                                <span className="font-bold text-xl text-cyan-500">
                                                    {area.toFixed(2)} cm²
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pb-3">
                                                <div>
                                                    <p className="text-zinc-400">
                                                        Tensão Mecânica
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        σ = F / A
                                                    </p>
                                                </div>
                                                <span className="font-bold text-xl text-purple-400">
                                                    {tensao.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-zinc-400">
                                                        Status Estrutural
                                                    </p>
                                                    <p className="text-xs text-zinc-600">
                                                        Integridade da parede
                                                    </p>
                                                </div>
                                                <span className={`font-bold text-xl ${corStatus}`}>
                                                    {status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <h2 className="text-2xl font-bold">Insira dados para visualizar o resultado da simulação...</h2>
                                    </div>
                                )
                            }

                        </div>
                    </section>
                </div>
            </section>
        </Template>
    );
}