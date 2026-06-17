import jsPDF from "jspdf"

interface ConclusaoProps {
    doc: jsPDF
    conclusao: string
    alvo: string
}

export function renderConclusao({
    doc,
    conclusao,
    alvo
}: ConclusaoProps) {

    const x = 10
    const y = 260
    const largura = 131
    const altura = 30
    doc.setDrawColor(0)

    doc.rect(
        x,
        y,
        largura,
        altura
    )

    doc.addImage(
        alvo,
        'PNG',
        x + 3,
        y + 3,
        25,
        25
    )
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")

    doc.text(
        "Conclusão",
        x + 30,
        y + 7
    )

    const textoQuebrado = doc.splitTextToSize(
        conclusao,
        largura - 1
    )

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")

    doc.text(
        textoQuebrado,
        x + 30,
        y + 12
    )
}