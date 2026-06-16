// import jsPDF from "jspdf"
// import { materiais } from "./materiais"

// export async function gerarRelatorioPdf(
//     simulacao: any
// ) {
//     async function carregarImagem(caminho: string) {
//         const response = await fetch(caminho)

//         if (!response.ok) {
//             throw new Error(`Erro ao carregar ${caminho}`)
//         }

//         const blob = await response.blob()

//         return new Promise<string>((resolve) => {
//             const reader = new FileReader()

//             reader.onloadend = () => {
//                 resolve(reader.result as string)
//             }

//             reader.readAsDataURL(blob)
//         })
//     }
//     const material = materiais.find(
//         material => material.id === simulacao.material
//     )
//     const [
//         logo,
//         data,
//         calendario,
//         user
//     ] = await Promise.all([
//         carregarImagem('/logo/logo.png'),
//         carregarImagem('/pdf/data.png'),
//         carregarImagem('/pdf/calendario.png'),
//         carregarImagem('/pdf/user.png'),
//     ])

//     const dataFormatada = new Date(
//         simulacao.createdAt
//     ).toLocaleString('pt-BR', {
//         day: '2-digit',
//         month: '2-digit',
//         year: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit'
//     })

//     const doc = new jsPDF()
//     doc.addImage(
//         logo,
//         'PNG',
//         10,
//         10,
//         40,
//         20
//     )
//     doc.setFontSize(20)
//     doc.text("Relatório de", 52, 18)

//     doc.setFontSize(28)
//     doc.setFont("helvetica", "bold")
//     doc.text("Simulação de Impacto", 52, 29)

//     doc.setFont("helvetica", "normal")
//     doc.addImage(
//         data,
//         'PNG',
//         162,
//         11,
//         7,
//         7
//     )
//     doc.setFontSize(8)
//     doc.text("Código do Material", 170, 14)
//     doc.setFont("helvetica", "bold")
//     doc.setFontSize(8)
//     doc.text(material?.codigo!, 170, 18)

//     doc.setFont("helvetica", "normal")
//     doc.addImage(
//         calendario,
//         'PNG',
//         162,
//         19,
//         7,
//         7
//     )
//     doc.setFontSize(8)
//     doc.text("Data", 170, 22)
//     doc.setFont("helvetica", "bold")
//     doc.setFontSize(8)
//     doc.text(dataFormatada, 170, 26)
//     doc.setFontSize(8)

//     doc.setFont("helvetica", "normal")
//     doc.addImage(
//         user,
//         'PNG',
//         162,
//         27,
//         7,
//         7
//     )
//     doc.text("Gerado por", 170, 30)
//     doc.setFontSize(8)
//     doc.setFont("helvetica", "bold")
//     doc.text("ImpactLab v1.0.0", 170, 34)

//     doc.setFontSize(12)
//     doc.text(
//         `Material: ${material?.nome ?? simulacao.material}`,
//         10,
//         40
//     )

//     const pdfBlob = doc.output('blob')

//     const url = URL.createObjectURL(pdfBlob)

//     window.open(url, '_blank')
//     // doc.save("impactlab.pdf")
// }

import jsPDF from "jspdf"
import { materiais } from "./materiais"
import { renderCabecalho } from "./components/cabecalho"
import { renderDadosDaSimulacao } from "./components/dadosDaSimulacao"
import { renderResultadosDaSimulacao } from "./components/resultadosDaSimulacao"
import { renderSobreOMaterial } from "./components/sobreOMaterial"
import { renderConclusao } from "./components/conclusao"
import renderStatusEstrutura from "./components/statusDaEstrutura"
import { renderDadosDoMaterial } from "./components/dadosDoMaterial"

export async function gerarRelatorioPdf(
    simulacao: any
) {
    const material = materiais.find(
        material => material.id === simulacao.material
    )
    async function carregarImagem(caminho: string) {
        const response = await fetch(caminho)

        if (!response.ok) {
            throw new Error(`Erro ao carregar ${caminho}`)
        }

        const blob = await response.blob()

        return new Promise<string>((resolve) => {
            const reader = new FileReader()

            reader.onloadend = () => {
                resolve(reader.result as string)
            }

            reader.readAsDataURL(blob)
        })
    }
    const [
        logo,
        data,
        calendario,
        user,
        documento,
        peso,
        velocidade,
        diametro,
        parede,
        materialImg,
        grafico,
        lampada,
        alvo,
        formulaCinetica,
        formulaDeformacao,
        formulaForca,
        formulaTensao,
        iconeRaio,
        iconePerigo
    ] = await Promise.all([
        carregarImagem('/logo/logo.png'),
        carregarImagem('/pdf/data.png'),
        carregarImagem('/pdf/calendario.png'),
        carregarImagem('/pdf/user.png'),
        carregarImagem('/pdf/documento.png'),
        carregarImagem('/pdf/peso.png'),
        carregarImagem('/pdf/velocidade.png'),
        carregarImagem('/pdf/diametro.png'),
        carregarImagem('/pdf/parede.png'),
        carregarImagem('/pdf/material.png'),
        carregarImagem('/pdf/grafico.png'),
        carregarImagem('/pdf/lampada.png'),
        carregarImagem('/pdf/alvo.png'),
        carregarImagem('/pdf/cinetica.png'),
        carregarImagem('/pdf/deformacao.png'),
        carregarImagem('/pdf/forca.png'),
        carregarImagem('/pdf/tensao.png'),
        carregarImagem('/pdf/raio.png'),
        carregarImagem('/pdf/perigo.png'),
    ])

    const dataFormatada = new Date(
        simulacao.createdAt
    ).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })

    const doc = new jsPDF()

    renderCabecalho({
        doc,
        logo,
        data,
        calendario,
        user,
        codigoMaterial: material?.codigo ?? "-",
        dataFormatada
    })

    renderDadosDaSimulacao({
        doc,
        documento,
        peso,
        velocidade,
        diametro,
        parede,
        materialImg
    })
    renderResultadosDaSimulacao({
        doc,
        formulaCinetica,
        formulaDeformacao,
        formulaForca,
        formulaTensao,
        iconeRaio
    })
    renderDadosDoMaterial({
        doc,
        materialImg,
        material: material!
    })
    renderStatusEstrutura({
        doc,
        x: 10,
        y: 190,
        largura: 130,
        integridade: 20,
        iconePerigo: iconePerigo
    })
    renderConclusao({
        doc,
        conclusao: 'A tensão gerada pelo impacto (101,86MPa) ultrapassou significativamente a resistencia do material (40MPa), resultando em falha estrutural completa da parede de madeira (pinho)',
        alvo
    })
    renderSobreOMaterial({
        doc,
        descricao: material?.descricao!,
        lampada
    })


    const pdfBlob = doc.output('blob')
    const url = URL.createObjectURL(pdfBlob)
    window.open(url, '_blank')
}