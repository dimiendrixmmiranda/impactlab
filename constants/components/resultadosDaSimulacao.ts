import jsPDF from "jspdf"

interface ResultadosDaSimulacaoProps {
    doc: jsPDF
    formulaCinetica: string,
    formulaDeformacao: string
    formulaForca: string
    formulaTensao: string
    iconeRaio: string
}

export function renderResultadosDaSimulacao({
    doc,
    formulaCinetica,
    formulaDeformacao,
    formulaForca,
    formulaTensao,
    iconeRaio
}: ResultadosDaSimulacaoProps) {

    doc.addImage(
        formulaCinetica,
        'PNG',
        10,
        102.5,
        8,
        8
    )
    doc.setFontSize(20)
    doc.text("Resultados da Simulação", 19, 110)

    renderCardMetrica({
        doc,
        x: 10,
        y: 120,
        largura: 40,
        altura: 30,
        titulo: "Energia Cinética (Ec)",
        formula: formulaCinetica,
        valor: "32.000,00",
        unidade: "J",
        icone: iconeRaio
    })
    renderCardMetrica({
        doc,
        x: 55,
        y: 120,
        largura: 40,
        altura: 30,
        titulo: "Momento Linear (p)",
        formula: formulaCinetica,
        valor: "32.000,00",
        unidade: "J",
        icone: iconeRaio
    })
    renderCardMetrica({
        doc,
        x: 100,
        y: 120,
        largura: 40,
        altura: 30,
        titulo: "Força de Impacto (F)",
        formula: formulaForca,
        valor: "32.000,00",
        unidade: "J",
        icone: iconeRaio
    })
    renderCardMetrica({
        doc,
        x: 10,
        y: 155,
        largura: 40,
        altura: 30,
        titulo: "Area de Impacto (A)",
        formula: formulaCinetica,
        valor: "32.000,00",
        unidade: "J",
        icone: iconeRaio
    })
    renderCardMetrica({
        doc,
        x: 55,
        y: 155,
        largura: 40,
        altura: 30,
        titulo: "Tensão Mecânica (o)",
        formula: formulaCinetica,
        valor: "32.000,00",
        unidade: "J",
        icone: iconeRaio
    })
    renderCardMetrica({
        doc,
        x: 100,
        y: 155,
        largura: 40,
        altura: 30,
        titulo: "Integridade Estrutural",
        formula: formulaCinetica,
        valor: "32.000,00",
        unidade: "J",
        icone: iconeRaio
    })
}


function renderCardMetrica({
    doc,
    x,
    y,
    largura,
    altura,
    titulo,
    valor,
    unidade,
    formula,
    icone
}: any) {

    // Borda
    doc.rect(x, y, largura, altura)

    // Centro horizontal do card
    const centroX = x + largura / 2

    // Título
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")

    doc.text(
        titulo,
        centroX,
        y + 6,
        { align: "center" }
    )

    const larguraFormula = 18
    const alturaFormula = 10

    const posicaoXFormula =
        x + (largura - larguraFormula) / 2

    doc.addImage(
        formula,
        "PNG",
        posicaoXFormula,
        y + 8,
        larguraFormula,
        alturaFormula
    )
    // Valor
    doc.setFontSize(12)
    doc.text(
        `${valor} ${unidade}`,
        x + 22,
        y + altura - 6.5,
        { align: "center" }
    )

    doc.addImage(
        icone,
        "PNG",
        x + 4,
        y + 19,
        6,
        6
    )
}