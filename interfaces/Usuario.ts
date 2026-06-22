export default interface Usuario{
    createdAt: Date
    email: string
    id: string
    imagem: string | null
    qtdeRelatorios: number
    nome: string
    sexo: string
    dataNascimento: Date
    instituicao: string
    localizacao: string
    bio: string
}