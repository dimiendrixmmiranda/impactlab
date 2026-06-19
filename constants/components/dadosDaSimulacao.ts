import jsPDF from "jspdf"

interface CabecalhoProps {
    doc: jsPDF
    documento: string,
    peso: string,
    velocidade: string,
    diametro: string,
    parede: string,
    materialImg: string
    projetil: string
}

export function renderDadosDaSimulacao({
    doc,
    documento,
    peso,
    velocidade,
    diametro,
    parede,
    materialImg,
    projetil
}: CabecalhoProps) {

    doc.addImage(
        documento,
        'PNG',
        10,
        40,
        8,
        8
    )

    doc.setFontSize(20)
    doc.text("Dados da simulacao", 19, 47)


    // 1º parte
    doc.addImage(
        projetil,
        'PNG',
        10,
        66.5,
        14,
        14
    )
    doc.addImage(
        '/materiais/cobre.png',
        'PNG',
        45,
        55,
        8,
        40
    )


    // Dados
    doc.addImage(
        peso,
        'PNG',
        62,
        55,
        6,
        6
    )
    doc.setFontSize(12)
    doc.text("Massa do Projetil", 70, 60)
    doc.text("20kg", 138, 60, { align: 'right' })

    doc.addImage(
        velocidade,
        'PNG',
        62,
        64,
        6,
        6
    )
    doc.setFontSize(12)
    doc.text("Velocidade do Projetil", 70, 69)
    doc.text("80 m/s", 138, 69, { align: 'right' })

    doc.addImage(
        diametro,
        'PNG',
        62,
        72,
        6,
        6
    )
    doc.setFontSize(12)
    doc.text("Diâmetro do Projetil", 70, 76.5)
    doc.text("10cm", 138, 76.5, { align: 'right' })

    doc.addImage(
        parede,
        'PNG',
        62,
        80,
        6,
        6
    )
    doc.setFontSize(12)
    doc.text("Espessura da Parede", 70, 84.5)
    doc.text("10cm", 138, 84.5, { align: 'right' })

    doc.addImage(
        materialImg,
        'PNG',
        62,
        87.5,
        6,
        6
    )
    doc.setFontSize(12)
    doc.text("Material Selecionado", 70, 92)
    doc.text("Madeira", 138, 92, { align: 'right' })

}