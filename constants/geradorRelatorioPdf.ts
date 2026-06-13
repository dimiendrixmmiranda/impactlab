import jsPDF from "jspdf"
import { materiais } from "./materiais"

export async function gerarRelatorioPdf(
    simulacao: any
) {

    // Começo Imagem
    const response = await fetch('/logo/logo.png')
    const blob = await response.blob()

    const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader()

        reader.onloadend = () => {
            resolve(reader.result as string)
        }

        reader.readAsDataURL(blob)
    })

    const material = materiais.find(
        material => material.id === simulacao.material
    )
    // Fim Imagem

    const doc = new jsPDF()

    doc.addImage(
        base64,
        'PNG',
        10, // x
        10, // y
        40, // largura
        20  // altura
    )

    doc.setFontSize(20)
    doc.text("Relatório de", 52, 16)
    
    doc.setFontSize(35)
    doc.text("Simulação de Impacto", 52, 29)
    
    doc.setFontSize(12)
    doc.text(
        `Material: ${material?.nome ?? simulacao.material}`,
        10,
        40
    )

    doc.save("impactlab.pdf")
}