import { Material } from "@/interfaces/Material"
import jsPDF from "jspdf"

interface CabecalhoProps {
    doc: jsPDF
    materialImg: string
    material: Material
}


export function renderDadosDoMaterial({
    doc,
    materialImg,
    material
}: CabecalhoProps) {
    const x = 145
    const y = 40

    const metricas = [
        { nome: 'Resistência', valor: material.resistencia },
        { nome: 'Rigidez', valor: material.coeficientePoisson },
        { nome: 'Dureza', valor: material.dureza },
        { nome: 'Tenacidade', valor: material.resistencia },
        { nome: 'Estabilidade\nDimensional', valor: material.resistencia }
    ]

    doc.addImage(
        materialImg,
        'PNG',
        x + 2,
        y + 4,
        6,
        6
    )
    doc.rect(x, y, 55, 195)

    doc.setFontSize(12)
    doc.text("Dados da Material", x + 10, y + 9)
    doc.text(material.nome, x + 12, y + 20, { align: 'center' })

    doc.text(`Código: ${material.codigo}`, x + 10, y + 30)

    doc.setFontSize(10)
    doc.text(`Categoria:`, x + 4, y + 40)
    doc.text(`${material.categoria}`, x + 52, y + 40, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 53,
        x + 52,
        y + 53
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Resistência:`, x + 4, y + 50)
    doc.text(`${material.resistencia}`, x + 52, y + 50, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 63,
        x + 52,
        y + 63
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Densidade:`, x + 4, y + 60)
    doc.text(`${material.densidade}`, x + 52, y + 60, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 43,
        x + 52,
        y + 43
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Elasticidade:`, x + 4, y + 70)
    doc.text(`${material.elasticidade}`, x + 52, y + 70, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 73,
        x + 52,
        y + 73
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Dureza:`, x + 4, y + 80)
    doc.text(`${material.dureza}`, x + 52, y + 80, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 83,
        x + 52,
        y + 83
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Coef. Poisson:`, x + 4, y + 90)
    doc.text(`${material.coeficientePoisson}`, x + 52, y + 90, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 93,
        x + 52,
        y + 93
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Lim. de Escoamento:`, x + 4, y + 100)
    doc.text(`${material.limiteEscoamento}`, x + 52, y + 100, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 103,
        x + 52,
        y + 103
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Lim. de Ruptura:`, x + 4, y + 110)
    doc.text(`${material.limiteRuptura}`, x + 52, y + 110, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 113,
        x + 52,
        y + 113
    )
    doc.setDrawColor(0, 0, 0)

    doc.setFontSize(10)
    doc.text(`Alongamento:`, x + 4, y + 120)
    doc.text(`${material.limiteRuptura}`, x + 52, y + 120, { align: 'right' })
    doc.setDrawColor(137, 41, 81)
    doc.line(
        x + 4,
        y + 123,
        x + 52,
        y + 123
    )
    doc.setDrawColor(0, 0, 0)


    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)

    const desempenhoY = y + 135

    doc.text(
        'DESEMPENHO GERAL DO MATERIAL',
        x + 2,
        desempenhoY
    )

    doc.setDrawColor(180)
    doc.line(
        x + 2,
        desempenhoY + 2,
        x + 53,
        desempenhoY + 2
    )

    let linhaY = desempenhoY + 10

    metricas.forEach((metrica) => {

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8.5)

        doc.text(
            metrica.nome,
            x + 4,
            linhaY + 2
        )

        const barraX = x + 23
        const barraY = linhaY - 0.5

        const larguraBarra = 20
        const alturaBarra = 2.5

        // fundo
        doc.setFillColor(225, 225, 225)

        doc.rect(
            barraX,
            barraY,
            larguraBarra,
            alturaBarra,
            'F'
        )

        // preenchimento
        doc.setFillColor(137, 41, 81)

        doc.rect(
            barraX,
            barraY,
            larguraBarra * (metrica.valor / 100),
            alturaBarra,
            'F'
        )

        doc.text(
            `${Math.round(metrica.valor)}%`,
            x + 46,
            linhaY + 2
        )

        linhaY += 8
    })

}