import jsPDF from "jspdf"

interface CabecalhoProps {
    doc: jsPDF
    logo: string
    data: string
    calendario: string
    user: string
    codigoMaterial: string
    dataFormatada: string
}

export function renderCabecalho({
    doc,
    logo,
    data,
    calendario,
    user,
    codigoMaterial,
    dataFormatada
}: CabecalhoProps) {

    doc.addImage(
        logo,
        'PNG',
        10,
        10,
        40,
        20
    )

    doc.setFontSize(20)
    doc.text("Relatório de", 52, 18)

    doc.setFontSize(28)
    doc.setFont("helvetica", "bold")
    doc.text("Simulação de Impacto", 52, 29)

    doc.setFont("helvetica", "normal")

    doc.addImage(
        data,
        'PNG',
        162,
        11,
        7,
        7
    )

    doc.setFontSize(10)
    doc.text("Código do Material", 170, 14)

    doc.setFont("helvetica", "bold")
    doc.text(codigoMaterial, 170, 18)

    doc.setFont("helvetica", "normal")

    doc.addImage(
        calendario,
        'PNG',
        162,
        19,
        7,
        7
    )

    doc.text("Data", 170, 22)

    doc.setFont("helvetica", "bold")
    doc.text(dataFormatada, 170, 26)

    doc.setFont("helvetica", "normal")

    doc.addImage(
        user,
        'PNG',
        162,
        27,
        7,
        7
    )

    doc.text("Gerado por", 170, 30)

    doc.setFont("helvetica", "bold")
    doc.text("ImpactLab v1.0.0", 170, 34)
}