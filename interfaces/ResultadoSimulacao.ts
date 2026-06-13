import { Material } from "./Material"

export default interface ResultadoSimulacao {
    material: Material
    energia: number
    momento: number
    impacto: number
    area: number
    tensao: number
    integridade: number
    status: string
    corStatus: string
}