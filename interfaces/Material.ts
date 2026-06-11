export interface Material {
    id: string
    codigo: string
    nome: string
    descricao: string
    categoria: string
    imagem: string
    disponivel: boolean

    resistencia: number
    densidade: number
    elasticidade: number
    dureza: number

    coeficientePoisson: number
    limiteEscoamento: number
    limiteRuptura: number
    alongamento: number

    aplicacoes: string[]

    cor: string
}