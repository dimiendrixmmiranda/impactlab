import { Material } from "@/interfaces/Material"

export const momentoLinear = (
    massa: number,
    velocidade: number
) => {

    return massa * velocidade
}


// Ec = mv² / 2
export const energiaCinetica = (
    massa: number,
    velocidade: number
) => {

    return (
        massa * Math.pow(velocidade, 2)
    ) / 2
}

export const forcaImpacto = (
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

export const areaImpacto = (
    diametro: number
) => {

    const raio = diametro / 2

    return (
        Math.PI *
        Math.pow(raio, 2)
    )
}

export const tensaoMecanica = (
    forca: number,
    area: number
) => {

    if (area <= 0) return 0

    return forca / area
}


export const tenacidade = (limiteRuptura: number, alongamento: number) => {
    const t = limiteRuptura * (alongamento / 100)
    return t
}

export const fragilidade = (alongamento: number) => {
    const frag = 100 - alongamento
    return frag
}
export const absorcaoEnergia = (limiteRuptura: number, alongamento: number) => {
    const abs = limiteRuptura * alongamento;
    return abs
}


export const porcentagem = (
    valor: number,
    maximo: number
) => {
    return Math.min(
        (valor / maximo) * 100,
        100
    );
}

export const deformacaoParede = (
    energiaCinetica: number,
    resistenciaMaterial: number,
    espessura: number
) => {
    return energiaCinetica /
        (resistenciaMaterial * espessura)
}

export function calcularResultado(massa: number, velocidade: number, diametroProjetil: number, material: Material, espessura: number) {
        const energia =
            energiaCinetica(
                Number(massa),
                Number(velocidade)
            );

        const momento =
            momentoLinear(
                Number(massa),
                Number(velocidade)
            );

        const impacto =
            forcaImpacto(
                Number(massa),
                Number(velocidade)
            );

        const area =
            areaImpacto(
                Number(diametroProjetil)
            );

        const tensao =
            tensaoMecanica(
                impacto,
                area
            );

        const resistenciaMaterial =
            material?.resistencia || 0;

        const resistenciaParede =
            resistenciaMaterial *
            Number(espessura);

        let integridade = 100;

        if (resistenciaParede > 0) {
            integridade =
                (
                    (resistenciaParede - tensao)
                    / resistenciaParede
                ) * 100;
        }

        const deformParede = deformacaoParede(
            energia,
            resistenciaMaterial,
            espessura
        )

        let status = "Estável";
        let corStatus = "text-green-500";

        if (integridade <= 0) {
            status = "Destruída";
            corStatus = "text-red-500";
        } else if (integridade < 30) {
            status = "Crítica";
            corStatus = "text-orange-500";
        } else if (integridade < 70) {
            status = "Danificada";
            corStatus = "text-yellow-500";
        }

        return {
            material: material!,
            energia,
            momento,
            impacto,
            area,
            tensao,
            integridade,
            deformParede,
            status,
            corStatus
        };
    }