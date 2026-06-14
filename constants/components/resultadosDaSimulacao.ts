import jsPDF from "jspdf"

interface ResultadosDaSimulacaoProps {
    doc: jsPDF
    grafico: string
}

export function renderResultadosDaSimulacao({
    doc,
    grafico
}: ResultadosDaSimulacaoProps) {

    doc.addImage(
        grafico,
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
        formula: "Ec = 1/2 mv²",
        valor: "32.000,00",
        unidade: "J",
        icone: grafico
    })
    renderCardMetrica({
        doc,
        x: 55,
        y: 120,
        largura: 40,
        altura: 30,
        titulo: "Energia Cinética (Ec)",
        formula: "Ec = 1/2 mv²",
        valor: "32.000,00",
        unidade: "J",
        icone: grafico
    })
    renderCardMetrica({
        doc,
        x: 100,
        y: 120,
        largura: 40,
        altura: 30,
        titulo: "Energia Cinética (Ec)",
        formula: "Ec = 1/2 mv²",
        valor: "32.000,00",
        unidade: "J",
        icone: grafico
    })
    renderCardMetrica({
        doc,
        x: 10,
        y: 155,
        largura: 40,
        altura: 30,
        titulo: "Energia Cinética (Ec)",
        formula: "Ec = 1/2 mv²",
        valor: "32.000,00",
        unidade: "J",
        icone: grafico
    })
    renderCardMetrica({
        doc,
        x: 55,
        y: 155,
        largura: 40,
        altura: 30,
        titulo: "Energia Cinética (Ec)",
        formula: "Ec = 1/2 mv²",
        valor: "32.000,00",
        unidade: "J",
        icone: grafico
    })
    renderCardMetrica({
        doc,
        x: 100,
        y: 155,
        largura: 40,
        altura: 30,
        titulo: "Energia Cinética (Ec)",
        formula: "Ec = 1/2 mv²",
        valor: "32.000,00",
        unidade: "J",
        icone: grafico
    })
}



function renderCardMetrica({
    doc,
    x,
    y,
    largura,
    altura,
    titulo,
    formula,
    valor,
    unidade,
    icone
}: any) {

    // Borda
    doc.rect(x, y, largura, altura)

    // Centro horizontal do card
    const centroX = x + largura / 2

    // Título
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")

    doc.text(
        titulo,
        centroX,
        y + 12,
        { align: "center" }
    )

    // Fórmula
    doc.setFontSize(18)

    doc.text(
        formula,
        centroX,
        y + 28,
        { align: "center" }
    )

    // Ícone
    doc.addImage(
        icone,
        "PNG",
        x + 8,
        y + altura - 25,
        18,
        18
    )

    // Valor
    doc.setFontSize(20)

    doc.text(
        `${valor} ${unidade}`,
        centroX + 15,
        y + altura - 10,
        { align: "center" }
    )
}