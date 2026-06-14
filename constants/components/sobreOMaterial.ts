import jsPDF from "jspdf"

interface SobreOMaterialProps {
    doc: jsPDF
    descricao: string
    lampada: string
}

export function renderSobreOMaterial({
    doc,
    descricao,
    lampada
}: SobreOMaterialProps) {

    const x = 150
    const y = 240
    const largura = 50
    const altura = 50

    doc.rect(
        x,
        y,
        largura,
        altura
    )

    doc.addImage(
        lampada,
        'PNG',
        152,
        242,
        5,
        5
    )
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")

    doc.text(
        "Sobre o Material",
        x + 8,
        y + 6
    )

    const textoQuebrado = doc.splitTextToSize(
        descricao,
        largura - 1
    )

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")

    doc.text(
        textoQuebrado,
        x + 2,
        y + 12
    )
}