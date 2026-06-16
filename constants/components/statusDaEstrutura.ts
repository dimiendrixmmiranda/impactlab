export default function renderStatusEstrutura({
    doc,
    x,
    y,
    largura,
    integridade,
    iconePerigo
}: any) {

    let status = ''
    let percentual = 0

    if (integridade >= 70) {
        status = 'ESTÁVEL'
        percentual = 100
    }
    else if (integridade >= 30) {
        status = 'DANIFICADA'
        percentual = 50
    }
    else {
        status = 'CRÍTICA'
        percentual = 10
    }

    doc.rect(x, y, largura, 22)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")

    doc.text(
        "STATUS DA ESTRUTURA",
        x + 3,
        y + 5
    )

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text(
        status,
        x + 20,
        y + 12
    )
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7)
    doc.text(
        [
            "A tensão aplicada excedeu",
            "a resistência do material"
        ],
        x + 20,
        y + 16
    )
    doc.addImage(
        iconePerigo,
        'PNG',
        x + 2,
        y + 5,
        16,
        16
    )

    const inicioBarra = x + 50
    const larguraBarra = largura - 60

    // Barra vermelha
    doc.setFillColor(220, 53, 69)

    doc.rect(
        inicioBarra,
        y + 10,
        larguraBarra * 0.3,
        3,
        "F"
    )
    // Barra laranja
    doc.setFillColor(255, 193, 7)

    doc.rect(
        inicioBarra + larguraBarra * 0.3,
        y + 10,
        larguraBarra * 0.4,
        3,
        "F"
    )

    // Barra verde
    doc.setFillColor(40, 167, 69)

    doc.rect(
        inicioBarra + larguraBarra * 0.7,
        y + 10,
        larguraBarra * 0.3,
        3,
        "F"
    )
    // Marcador
    const marcadorX =
        inicioBarra +
        (larguraBarra * percentual) / 100

    doc.setDrawColor(0)
    doc.line(
        marcadorX,
        y + 8,
        marcadorX,
        y + 15
    )
}