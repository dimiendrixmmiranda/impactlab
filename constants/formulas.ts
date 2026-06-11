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