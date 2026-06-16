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
    doc.addImage(
        materialImg,
        'PNG',
        x + 2,
        y + 4,
        6,
        6
    )
    doc.rect(x, y, 55, 180)

    doc.setFontSize(12)
    doc.text("Dados da Material", x + 10, y + 9)
    doc.text(material.nome, x + 12, y + 20)
}