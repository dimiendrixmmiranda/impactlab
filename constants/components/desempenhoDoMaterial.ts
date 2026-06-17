import jsPDF from "jspdf";

interface DesempenhoDoMaterialProps {
    doc: jsPDF
    tensaoAplicada: number
    resistenciaMaterial: number
}

export function renderDesempenhoDoMaterial({
    doc,
    tensaoAplicada,
    resistenciaMaterial
}: DesempenhoDoMaterialProps) {

    const x = 10
    const y = 216
    const largura = 130
    const altura = 40

    // Container
    doc.rect(
        x,
        y,
        largura,
        altura
    )

    // Cabeçalho
    doc.setFillColor(120, 70, 20)

    doc.rect(
        x,
        y,
        largura,
        8,
        "F"
    )

    doc.setTextColor(255)

    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")

    doc.text(
        "DESEMPENHO DO MATERIAL",
        x + 4,
        y + 5.5
    )

    doc.setTextColor(0)

    // GRÁFICO
    const graficoX = x + 6
    const graficoY = y + 15

    const graficoLargura = 62
    const graficoAltura = 18

    doc.setFontSize(8)

    doc.text(
        "Comparativo: Tensão Aplicada vs. Resistência",
        graficoX,
        graficoY - 4
    )

    // Eixos

    doc.setDrawColor(180)

    doc.line(
        graficoX,
        graficoY,
        graficoX,
        graficoY + graficoAltura
    )

    doc.line(
        graficoX,
        graficoY + graficoAltura,
        graficoX + graficoLargura,
        graficoY + graficoAltura
    )

    const maxValor =
        Math.max(
            tensaoAplicada,
            resistenciaMaterial
        ) * 1.2

    const alturaTensao =
        (tensaoAplicada / maxValor) *
        graficoAltura

    const alturaResistencia =
        (resistenciaMaterial / maxValor) *
        graficoAltura

    // Barra tensão

    doc.setFillColor(
        220,
        53,
        69
    )

    doc.rect(
        graficoX + 10,
        graficoY +
        graficoAltura -
        alturaTensao,
        10,
        alturaTensao,
        "F"
    )

    // Barra resistência

    doc.setFillColor(
        120,
        70,
        20
    )

    doc.rect(
        graficoX + 35,
        graficoY +
        graficoAltura -
        alturaResistencia,
        10,
        alturaResistencia,
        "F"
    )

    // Valores

    doc.setFontSize(8)
    doc.setFont(
        "helvetica",
        "bold"
    )

    doc.setFontSize(5)

    doc.text(
        tensaoAplicada
            .toFixed(1)
            .replace(".", ","),
        graficoX + 15,
        graficoY +
        graficoAltura -
        alturaTensao -
        1,
        { align: "center" }
    )

    doc.text(
        resistenciaMaterial
            .toFixed(1)
            .replace(".", ","),
        graficoX + 40,
        graficoY +
        graficoAltura -
        alturaResistencia -
        1,
        { align: "center" }
    )

    // Linha limite

    const yLimite =
        graficoY +
        graficoAltura -
        alturaResistencia

    doc.setDrawColor(
        255,
        0,
        0
    )

    doc.setLineDashPattern(
        [1, 1],
        0
    )

    doc.line(
        graficoX,
        yLimite,
        graficoX +
        graficoLargura,
        yLimite
    )

    doc.setLineDashPattern([], 0)

    doc.setFontSize(7)

    doc.text(
        `Limite (${resistenciaMaterial.toFixed(0)} MPa)`,
        graficoX + graficoLargura + 3,
        yLimite + 1
    )

    // Legendas

    doc.setFontSize(4)

    doc.text(
        "Tensão",
        graficoX + 15,
        graficoY + graficoAltura + 3,
        { align: "center" }
    )

    doc.text(
        "Resist.",
        graficoX + 40,
        graficoY + graficoAltura + 3,
        { align: "center" }
    )

    // ==========================
    // INDICADOR CIRCULAR
    // ==========================

    const utilizacao =
        (tensaoAplicada /
            resistenciaMaterial) *
        100

    const centroX = x + 102
    const centroY = y + 21

    doc.setFontSize(8)

    doc.setFontSize(5)

    doc.text(
        "Utilização",
        centroX,
        y + 12,
        { align: "center" }
    )

    // círculo externo

    doc.setDrawColor(
        utilizacao > 100
            ? 220
            : 40,
        utilizacao > 100
            ? 53
            : 167,
        utilizacao > 100
            ? 69
            : 69
    )

    doc.setLineWidth(2)

    doc.circle(
        centroX,
        centroY,
        7
    )

    doc.setLineWidth(0.2)

    doc.setFontSize(12)
    doc.setFont(
        "helvetica",
        "bold"
    )

    doc.setFontSize(7)

    doc.text(
        `${utilizacao.toFixed(0)}%`,
        centroX,
        centroY + 1,
        { align: "center" }
    )

    doc.setFont(
        "helvetica",
        "normal"
    )

    const mensagem =
        utilizacao > 100
            ? "Tensão aplicada excede a resistência do material."
            : "Material opera dentro do limite seguro."

    const texto =
        doc.splitTextToSize(
            mensagem,
            38
        )

    doc.setFontSize(7)

    doc.text(
        texto,
        centroX - 10,
        centroY + 11
    )
}