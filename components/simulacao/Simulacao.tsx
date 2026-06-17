import Template from "@/components/template/Template";
import { materiais } from "@/constants/materiais";
import { useUsuario } from "@/hooks/useUsuario";
import ResultadoSimulacao from "@/interfaces/ResultadoSimulacao";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gerarRelatorioPdf } from "@/constants/geradorRelatorioPdf";
import { areaImpacto, calcularResultado, energiaCinetica, forcaImpacto, momentoLinear, tensaoMecanica } from "@/constants/formulas";

interface SimulacaoProps {
    formato: 'horizontal' | 'vertical'
}

export default function Simulacao({ formato }: SimulacaoProps) {
    const { usuario } = useUsuario();
    const [material, setMaterial] = useState('')

    const [massa, setMassa] = useState('')
    const [velocidade, setVelocidade] = useState('')
    const [diametroProjetil, setDiametroProjetil] = useState('')
    const [espessura, setEspessura] = useState('')

    const [simulando, setSimulando] = useState(false);
    const [impactou, setImpactou] = useState(false);
    const [etapa, setEtapa] = useState("");

    const [resultado, setResultado] =
        useState<ResultadoSimulacao | null>(null)
    const [sim, setSim] = useState<any>()
    const materialSelecionado = useMemo(() => {
        return materiais.find(
            (m) => m.id === material
        )
    }, [material])


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

    // function calcularResultado() {
    //     const energia =
    //         energiaCinetica(
    //             Number(massa),
    //             Number(velocidade)
    //         );

    //     const momento =
    //         momentoLinear(
    //             Number(massa),
    //             Number(velocidade)
    //         );

    //     const impacto =
    //         forcaImpacto(
    //             Number(massa),
    //             Number(velocidade)
    //         );

    //     const area =
    //         areaImpacto(
    //             Number(diametroProjetil)
    //         );

    //     const tensao =
    //         tensaoMecanica(
    //             impacto,
    //             area
    //         );

    //     const resistenciaMaterial =
    //         materialSelecionado?.resistencia || 0;

    //     const resistenciaParede =
    //         resistenciaMaterial *
    //         Number(espessura);

    //     let integridade = 100;

    //     if (resistenciaParede > 0) {
    //         integridade =
    //             (
    //                 (resistenciaParede - tensao)
    //                 / resistenciaParede
    //             ) * 100;
    //     }

    //     let status = "Estável";
    //     let corStatus = "text-green-500";

    //     if (integridade <= 0) {
    //         status = "Destruída";
    //         corStatus = "text-red-500";
    //     } else if (integridade < 30) {
    //         status = "Crítica";
    //         corStatus = "text-orange-500";
    //     } else if (integridade < 70) {
    //         status = "Danificada";
    //         corStatus = "text-yellow-500";
    //     }

    //     return {
    //         material: materialSelecionado!,
    //         energia,
    //         momento,
    //         impacto,
    //         area,
    //         tensao,
    //         integridade,
    //         status,
    //         corStatus
    //     };
    // }

    const iniciarSimulacao = async () => {
        if (
            massa === '' ||
            velocidade === '' ||
            diametroProjetil === '' ||
            espessura === '' ||
            material === ''
        ) {
            alert('Insira todos os dados');
            return;
        }

        setResultado(null);
        setImpactou(false);
        setSimulando(true);

        setEtapa("Preparando simulação...");

        setTimeout(() => {
            setEtapa("Calculando trajetória...");
        }, 500);

        setTimeout(() => {
            setEtapa("Impacto detectado...");
            setImpactou(true);
        }, 1500);

        setTimeout(() => {
            setEtapa("Analisando estrutura...");
        }, 2200);

        setTimeout(() => {
            setEtapa("Gerando relatório...");
        }, 3000);

        setTimeout(async () => {
            try {
                const resultadoCalculado =
                    calcularResultado(parseFloat(massa), parseFloat(velocidade), parseFloat(diametroProjetil), materialSelecionado!, parseFloat(espessura))

                setResultado(resultadoCalculado);

                const dadosParaSalvar = {
                    massa: Number(massa),
                    velocidade: Number(velocidade),
                    diametroProjetil: Number(diametroProjetil),
                    espessura: Number(espessura),
                    material
                }

                console.log(
                    "Dados enviados:",
                    dadosParaSalvar
                );

                const response = await fetch(
                    "/api/simulacao",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dadosParaSalvar),
                    }
                );

                const data =
                    await response.json();

                setSim(data)

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                        "Erro ao salvar simulação"
                    );
                }

                console.log(
                    "Simulação salva com sucesso"
                );
            } catch (error) {
                console.error(
                    "Erro ao salvar:",
                    error
                );
            } finally {
                setSimulando(false);
                setEtapa("");
            }
        }, 4000);
    }

    console.log(resultado)

    const areaRef = useRef<HTMLDivElement>(null);
    const projetilRef = useRef<HTMLDivElement>(null);
    const paredeRef = useRef<HTMLDivElement>(null);

    const [distanciaImpacto, setDistanciaImpacto] = useState(0);

    useEffect(() => {
        if (
            !projetilRef.current ||
            !paredeRef.current
        ) return;

        const projetil =
            projetilRef.current.getBoundingClientRect();

        const parede =
            paredeRef.current.getBoundingClientRect();

        const distancia =
            parede.left -
            projetil.left -
            projetil.width;

        setDistanciaImpacto(distancia);
    }, [
        diametroProjetil,
        espessura
    ])


    return (
        <section className="bg-[#0D0D0D]/90 text-white relative overflow-hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.12),transparent_45%)]" />

            {/* GRID */}
            <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,107,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className={`relative z-10 grid ${formato === 'vertical' ? 'grid-cols-[350px_1fr]' : 'grid-rows-[auto_1fr]'} gap-8 h-full`}>
                <aside className="w-full h-full border-r border-orange-500/10 backdrop-blur-xl p-6 flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-bold font-oswald leading-tight">
                            Painel de <b className="text-laranja-impacto">Simulação</b>
                        </h1>
                    </div>
                    <div className={`gap-6 ${formato === 'vertical' ? 'flex flex-col ' : 'grid grid-cols-2'}`}>
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
                    </div>
                    <button onClick={iniciarSimulacao} className="bg-laranja-impacto font-bold uppercase py-2 text-xl rounded-xl" style={{ textShadow: '1px 1px 2px black' }}>Iniciar Simulação</button>
                </aside>
                <section className="flex-1 relative flex items-center justify-center pr-8 p-8 lg:grid lg:grid-rows-[auto_1fr] lg:grid-cols-1 lg:gap-8">
                    {/* <div className="absolute w-[600px] h-[600px] bg-orange-500/10 blur-[150px] rounded-full" /> */}
                    <div className="relative w-full h-[500px] border border-orange-500/10 rounded-[40px] bg-[#111]/60 backdrop-blur-md overflow-hidden">
                        <div className="flex flex-col items-center w-full p-4">
                            <p className="text-orange-500 uppercase tracking-[0.3em] text-xl mb-4">
                                Área de Simulação
                            </p>
                            <div
                                ref={areaRef}
                                className="
                                relative
                                w-full
                                h-[400px]
                                rounded-lg
                                overflow-hidden
                            "
                            >
                                {/* PROJÉTIL */}
                                <motion.div
                                    ref={projetilRef}
                                    animate={{
                                        x: simulando ? distanciaImpacto : 0
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeInOut"
                                    }}
                                    className="
                                        absolute
                                        left-10
                                        top-1/2
                                        -translate-y-1/2
                                        rounded-full
                                        bg-gradient-to-br
                                        from-zinc-300
                                        to-zinc-700
                                        shadow-[0_0_50px_rgba(255,255,255,0.25)]
                                    "
                                    style={{
                                        width: `${diametroProjetil || 80}px`,
                                        height: `${diametroProjetil || 80}px`,
                                    }}
                                />

                                {/* PAREDE */}
                                <div
                                    ref={paredeRef}
                                    className="
                                        absolute
                                        right-20
                                        top-1/2
                                        -translate-y-1/2
                                    "
                                >
                                    <div
                                        className="
                                            h-[340px]
                                            border
                                            border-orange-500/40
                                            bg-gradient-to-b
                                            from-orange-500/10
                                            to-transparent
                                            backdrop-blur-md
                                            rounded-md
                                            relative
                                            overflow-hidden
                                        "
                                        style={{
                                            width: `${espessura || 120}px`
                                        }}
                                    >
                                        {impactou && (
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                    opacity: 1
                                                }}
                                                animate={{
                                                    scale: 3,
                                                    opacity: 0
                                                }}
                                                transition={{
                                                    duration: 0.6
                                                }}
                                                className="
                                                    absolute
                                                    left-2
                                                    top-1/2
                                                    w-10
                                                    h-10
                                                    rounded-full
                                                    bg-orange-500
                                                "
                                            />
                                        )}

                                        {impactou && (
                                            <div
                                                className="
                                                    absolute
                                                    left-4
                                                    top-1/2
                                                    w-24
                                                    h-[2px]
                                                    bg-red-500
                                                    rotate-45
                                                "
                                            />
                                        )}

                                        <div className="
                                            absolute
                                            inset-0
                                            opacity-20
                                            bg-[linear-gradient(rgba(255,107,0,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.4)_1px,transparent_1px)]
                                            bg-[size:25px_25px]
                                        " />
                                    </div>
                                </div>
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
                            resultado ? (
                                <div className="absolute top-4 right-8">
                                    <button
                                        onClick={async () => {
                                            await gerarRelatorioPdf(sim)
                                            console.log(sim)
                                            await fetch('/api/user/relatorio', {
                                                method: 'POST'
                                            })
                                        }}
                                    >
                                        <p>Baixar Relatório</p>
                                    </button>
                                </div>
                            ) : (
                                ''
                            )
                        }
                        <div className="flex w-full h-full justify-center items-center text-2xl">
                            <p>
                                {etapa}
                            </p>
                        </div>
                        {
                            resultado ? (
                                <div>
                                    <div className="relative grid grid-cols-2 gap-6 xl:grid-cols-3">

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
                                <>
                                    {
                                        etapa ? ('') : (
                                            <div className="flex justify-center items-center h-full">
                                                <h2 className="text-2xl font-bold">
                                                    Insira dados para visualizar o resultado da simulação...
                                                </h2>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                </section>
            </div>
        </section>
    );
}
